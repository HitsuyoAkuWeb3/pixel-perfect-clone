import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const MAILCHIMP_API_KEY = Deno.env.get("MAILCHIMP_API_KEY") ?? "";
const MAILCHIMP_LIST_ID = Deno.env.get("MAILCHIMP_LIST_ID") ?? "";
const MAILCHIMP_SERVER_PREFIX = MAILCHIMP_API_KEY.split("-").pop() ?? "";

interface LeadPayload {
  name: string;
  email: string;
  variant: "audit" | "breakthrough";
}

const TAG_MAP: Record<string, string> = {
  audit: "Life Audit Lead",
  breakthrough: "Breakthrough Lead",
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
    console.error("[sync-lead-mailchimp] Missing MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID secrets");
    return new Response(
      JSON.stringify({ error: "Mailchimp not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { name, email, variant } = (await req.json()) as LeadPayload;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [firstName, ...lastParts] = (name ?? "").split(" ");
    const lastName = lastParts.join(" ");

    // Upsert subscriber to Mailchimp
    const subscriberHash = await md5Hash(email.toLowerCase().trim());
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: "PUT", // PUT = upsert (add or update)
      headers: {
        Authorization: `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: firstName || "",
          LNAME: lastName || "",
        },
        tags: [TAG_MAP[variant] ?? "Lead"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[sync-lead-mailchimp] Mailchimp API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Mailchimp sync failed", detail: errorData }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mailchimp PUT doesn't directly add tags — use tags endpoint
    const tagsUrl = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}/tags`;
    await fetch(tagsUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: [{ name: TAG_MAP[variant] ?? "Lead", status: "active" }],
      }),
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("[sync-lead-mailchimp] Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

/** MD5 hash for Mailchimp subscriber hash (email → hex digest) */
async function md5Hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
