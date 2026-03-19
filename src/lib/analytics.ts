/**
 * Funnel analytics tracker — persists events to Supabase.
 * All marketing-side visitors are anonymous (user_id = null).
 */

import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

type FunnelEvent =
  | "lead_captured"
  | "audit_started"
  | "audit_completed"
  | "cta_clicked"
  | "breakthrough_registered"
  | "b2b_waitlist_signup";

interface EventPayload {
  [key: string]: string | number | boolean | null | undefined;
}

const send = async (event: FunnelEvent, payload?: EventPayload) => {
  // Always log in development for debugging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, payload ?? "");
  }

  try {
    const { error } = await supabase.from("analytics_events").insert({
      user_id: null, // Marketing visitors are anonymous
      event_type: event,
      event_data: (payload ?? {}) as Json,
    });

    if (error) {
      console.error("[Analytics] Supabase insert failed:", error.message);
    }
  } catch (e) {
    // Fire-and-forget — never block the UI for analytics
    console.error("[Analytics] Persistence error:", e);
  }
};

export const analytics = {
  leadCaptured: (variant: string) =>
    send("lead_captured", { variant }),

  auditStarted: (leadId?: string | null) =>
    send("audit_started", { lead_id: leadId ?? undefined }),

  auditCompleted: (scores: Record<string, number>) =>
    send("audit_completed", scores),

  ctaClicked: (label: string, destination: string) =>
    send("cta_clicked", { label, destination }),

  breakthroughRegistered: () =>
    send("breakthrough_registered"),

  b2bWaitlistSignup: (company: string, role?: string) =>
    send("b2b_waitlist_signup", { company, role }),
};
