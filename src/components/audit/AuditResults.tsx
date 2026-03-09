import { useEffect, useRef } from "react";
import { areas, areaInsights, getLevel } from "@/data/auditContent";

interface AuditResultsProps {
  scores: number[];
}

const AuditResults = ({ scores }: AuditResultsProps) => {
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fillRefs.current.forEach((el, i) => {
        if (el) el.style.width = `${(scores[i] / 10) * 100}%`;
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [scores]);

  const drowning = areas.filter((_, i) => scores[i] <= 4);
  const surviving = areas.filter((_, i) => scores[i] >= 5 && scores[i] <= 7);
  const thriving = areas.filter((_, i) => scores[i] >= 8);

  // Good on Paper detection
  const highPurposeOrMoney = scores[2] >= 7 || scores[3] >= 7;
  const lowSelfOrJoy = scores[0] <= 5 || scores[4] <= 5;
  const showGoodOnPaper = highPurposeOrMoney && lowSelfOrJoy;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="max-w-[640px] w-full animate-fade-up">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-[clamp(38px,8vw,60px)] font-normal leading-tight tracking-wide mb-3">
            Here's where you{" "}
            <span className="text-accent italic">are right now.</span>
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            No judgment. No shame. Awareness is the first brick of building.
            What you just did takes courage — most women never stop long enough
            to look this honestly at their lives.
          </p>
        </div>

        {/* Chart */}
        <div className="mb-10">
          {areas.map((area, i) => {
            const isThriving = scores[i] >= 8;
            return (
              <div key={area.key} className="flex items-center gap-3.5 mb-[18px]">
                <div className="text-[22px] w-8 text-center shrink-0">
                  {area.icon}
                </div>
                <div className="text-xs font-bold tracking-wider uppercase w-[70px] shrink-0 text-foreground/80">
                  {area.name}
                </div>
                <div className="flex-1 h-2.5 bg-foreground/[0.07] rounded overflow-hidden">
                  <div
                    ref={(el) => { fillRefs.current[i] = el; }}
                    className={`h-full rounded transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] w-0 ${
                      isThriving
                        ? "bg-gradient-to-r from-accent to-gold-light"
                        : "bg-gradient-to-r from-secondary to-primary"
                    }`}
                  />
                </div>
                <div className="font-display text-xl text-accent w-7 text-right shrink-0">
                  {scores[i]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnosis */}
        {drowning.length > 0 && (
          <div className="mb-10">
            <h3 className="font-display text-[22px] font-normal mb-4">
              Where You're Drowning
            </h3>
            {drowning.map((area) => {
              const i = areas.indexOf(area);
              const insight = areaInsights[area.key].low;
              return (
                <div
                  key={area.key}
                  className="bg-gradient-to-br from-primary/[0.12] to-secondary/[0.06] border border-primary/25 rounded-[14px] p-6 mb-3.5"
                >
                  <div className="text-[10px] tracking-[3px] text-primary uppercase mb-2">
                    {area.icon} {area.key} · Score: {scores[i]}
                  </div>
                  <div className="font-display text-lg font-normal leading-snug mb-2.5">
                    "{insight.truth}"
                  </div>
                  <p className="text-[13px] leading-relaxed text-foreground/70">
                    {insight.shift}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {surviving.length > 0 && (
          <div className="mb-10">
            <h3 className="font-display text-[22px] font-normal mb-4">
              Where You're Surviving
            </h3>
            {surviving.map((area) => {
              const i = areas.indexOf(area);
              const insight = areaInsights[area.key].mid;
              return (
                <div
                  key={area.key}
                  className="bg-foreground/[0.03] border border-foreground/[0.12] rounded-[14px] p-6 mb-3.5"
                >
                  <div className="text-[10px] tracking-[3px] text-foreground/50 uppercase mb-2">
                    {area.icon} {area.key} · Score: {scores[i]}
                  </div>
                  <div className="font-display text-base font-normal leading-snug mb-2.5">
                    "{insight.truth}"
                  </div>
                  <p className="text-[13px] leading-relaxed text-foreground/70">
                    {insight.shift}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {thriving.length > 0 && (
          <div className="mb-10">
            <h3 className="font-display text-[22px] font-normal mb-4">
              Where You're Thriving
            </h3>
            {thriving.map((area) => {
              const i = areas.indexOf(area);
              const insight = areaInsights[area.key].high;
              return (
                <div
                  key={area.key}
                  className="bg-gradient-to-br from-accent/10 to-accent/[0.05] border border-accent/25 rounded-[14px] p-6 mb-3.5"
                >
                  <div className="text-[10px] tracking-[3px] text-accent uppercase mb-2">
                    {area.icon} {area.key} · Score: {scores[i]}
                  </div>
                  <div className="font-display text-[17px] font-normal leading-snug mb-2">
                    "{insight.truth}"
                  </div>
                  <p className="text-[13px] text-foreground/65 leading-relaxed">
                    {insight.shift}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Good on Paper trap */}
        {showGoodOnPaper && (
          <div className="bg-gradient-to-br from-accent/10 to-accent/[0.04] border border-accent/30 rounded-[14px] p-6 mb-10">
            <div className="text-[10px] tracking-[3px] text-accent uppercase mb-2.5">
              ⚡ The Pattern I See
            </div>
            <div className="font-display text-lg font-normal leading-snug mb-2.5">
              "You're successful. And you're not fully happy. That's the
              good-on-paper trap."
            </div>
            <p className="text-[13px] leading-relaxed text-foreground/65">
              High achievement is real. So is the emptiness. A Brickhouse
              doesn't just build a life that looks good — she builds one that
              feels good to live in, every single day. That's what we're
              building toward.
            </p>
          </div>
        )}

        {/* Blueprint box */}
        <div className="bg-gradient-to-br from-primary/[0.15] to-background/50 border border-primary/30 rounded-2xl p-8 mb-10 text-center">
          <div className="text-[40px] mb-4">🏛️</div>
          <h3 className="font-display text-[32px] font-normal tracking-wide text-accent mb-3.5">
            You Are the Architect
          </h3>
          <p className="text-sm leading-relaxed text-foreground/75 mb-3">
            Every score you just saw is a{" "}
            <strong className="text-foreground">starting point</strong>, not a
            verdict. A Brickhouse isn't born — she's{" "}
            <strong className="text-foreground">built</strong>. Brick by brick.
            Area by area. Day by day.
          </p>
          <p className="text-sm leading-relaxed text-foreground/75">
            The fact that you're here, looking honestly at your life, means
            you've already laid the first brick.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="font-display text-[clamp(30px,6vw,44px)] font-normal tracking-wide mb-3">
            Ready to <span className="text-primary italic">start building?</span>
          </h3>
          <p className="text-sm leading-relaxed text-foreground/65 max-w-[440px] mx-auto mb-7">
            The Brickhouse Mindset is your complete blueprint — 144 lessons
            across all 5 life areas and more. Your owner's manual for a life
            that actually feels like yours.
          </p>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3.5 mb-7">
            <a
              href="https://example.com/mini-bundle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground/[0.04] border border-foreground/[0.08] rounded-xl p-5 text-left hover:border-primary/40 transition-colors block"
            >
              <div className="text-2xl mb-2">📖</div>
              <div className="font-extrabold text-[13px] text-accent mb-1 tracking-wide">
                Mini Bundle — $88
              </div>
              <p className="text-[11px] text-foreground/55 leading-relaxed">
                Book + Audiobook + Workbook. Your complete Brickhouse blueprint.
              </p>
            </a>
            <a
              href="https://example.com/brickhouse-collective"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground/[0.04] border border-foreground/[0.08] rounded-xl p-5 text-left hover:border-primary/40 transition-colors block"
            >
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-extrabold text-[13px] text-accent mb-1 tracking-wide">
                Brickhouse Collective
              </div>
              <p className="text-[11px] text-foreground/55 leading-relaxed">
                Full app access, daily rituals, community, coaching. From
                $55/mo.
              </p>
            </a>
          </div>

          <button className="inline-block bg-gradient-pink text-foreground font-body font-extrabold text-[13px] tracking-[2px] uppercase px-12 py-[18px] border-none cursor-pointer [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] hover:opacity-90 hover:-translate-y-0.5 transition-all mb-4">
            Start Building →
          </button>

          <p className="text-xs text-foreground/45 mt-2">
            Not ready yet?{" "}
            <a href="/" className="text-accent no-underline hover:underline">
              Register for the free 3-Day Breakthrough →
            </a>
          </p>
        </div>

        {/* Footer sig */}
        <div className="text-center pt-10 pb-5 text-[11px] text-foreground/25 tracking-[2px]">
          Built with love by <span className="text-accent">Che' Lovelight</span>{" "}
          · Lifestyle Architect
        </div>
      </div>
    </div>
  );
};

export default AuditResults;
