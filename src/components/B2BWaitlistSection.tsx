import { useState } from "react";
import { Building2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { analytics } from "@/lib/analytics";
import { toast } from "sonner";

const B2BWaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) {
      toast.error("Email and Company Name are required.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("b2b_waitlist").insert({
        email,
        company_name: company,
        role: role || null,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already on the waitlist!");
          setIsSubmitted(true);
          return;
        }
        throw error;
      }

      toast.success("You're on the list!");
      analytics.b2bWaitlistSignup(company, role);
      setIsSubmitted(true);
    } catch (err) {
      console.error("B2B waitlist error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display text-3xl mb-3">Priority Access Reserved</h3>
          <p className="font-body text-muted-foreground">
            Your organization is on the priority list. Our partnerships team
            will reach out to <span className="text-primary font-semibold">{company}</span> soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 py-20 md:py-28">
      {/* Subtle divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(330 100% 42% / 0.4), transparent)",
        }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-display text-sm tracking-[4px] text-gold-light mb-4">
            FOR ORGANIZATIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">
            Bring the Brickhouse{" "}
            <span className="text-gradient-pink">to Your Team</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            The 12 Bricks framework — scaled for executive retreats, team
            licensing, and organizational transformation. Join the waitlist for
            priority access.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wider">
                Corporate Waitlist
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Early access for teams of 10+
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="b2b-company"
                className="font-body text-sm text-foreground block mb-1.5"
              >
                Company / Organization{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="b2b-company"
                type="text"
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                maxLength={200}
                disabled={isLoading}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="b2b-email"
                  className="font-body text-sm text-foreground block mb-1.5"
                >
                  Work Email <span className="text-primary">*</span>
                </label>
                <input
                  id="b2b-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  disabled={isLoading}
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="b2b-role"
                  className="font-body text-sm text-foreground block mb-1.5"
                >
                  Your Role{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="b2b-role"
                  type="text"
                  placeholder="e.g. HR Director, CEO"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  maxLength={100}
                  disabled={isLoading}
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-pink font-body font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] text-foreground disabled:opacity-60 mt-2"
            >
              {isLoading ? "Submitting…" : "Secure Waitlist Position →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default B2BWaitlistSection;
