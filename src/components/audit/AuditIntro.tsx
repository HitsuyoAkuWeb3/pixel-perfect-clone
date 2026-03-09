interface AuditIntroProps {
  onStart: () => void;
}

const AuditIntro = ({ onStart }: AuditIntroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-[600px] w-full animate-fade-up">
        <p className="text-[10px] tracking-[4px] text-accent uppercase mb-5">
          Before You Begin
        </p>

        <h2 className="font-display text-[clamp(34px,7vw,54px)] font-normal tracking-wide leading-tight mb-6">
          This is not a <span className="text-primary italic">test.</span>
        </h2>

        <p className="text-[15px] leading-relaxed text-foreground/70 mb-4">
          There are no right answers. No grades. No judgment. This is a{" "}
          <strong className="text-accent">mirror</strong> — an honest look at
          five areas of your life so you can see clearly where you are right now.
        </p>

        <p className="text-[15px] leading-relaxed text-foreground/70 mb-8">
          The only way this works is if you're{" "}
          <strong className="text-accent">brutally honest</strong>. Not where
          you want to be. Not where you were. Where you are{" "}
          <em>right now, today</em>.
        </p>

        {/* Story block */}
        <div className="border-l-[3px] border-primary pl-6 py-5 bg-primary/[0.06] rounded-r-xl mb-8">
          <p className="text-[15px] leading-relaxed text-foreground/80 italic">
            "I created this audit because I needed it myself. After my
            daughter's abduction, a divorce, losing my career, and gaining 35
            pounds — I realized I had been building everyone else's life except
            my own. The first step was seeing the truth. This is that step for
            you."
          </p>
          <cite className="block mt-3.5 not-italic text-xs text-accent tracking-wider font-bold">
            — Che' Lovelight, Lifestyle Architect
          </cite>
        </div>

        {/* Rules grid */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mb-8">
          {[
            { num: "01", title: "Be Honest", desc: "Rate where you are — not where you wish you were." },
            { num: "02", title: "Go With Your Gut", desc: "Don't overthink it. First instinct is usually truth." },
            { num: "03", title: "Takes 2 Minutes", desc: "Five areas. One slider each. That's it." },
            { num: "04", title: "Results Are Instant", desc: "Personalized diagnosis the moment you finish." },
          ].map((rule) => (
            <div
              key={rule.num}
              className="bg-foreground/[0.04] border border-accent/20 rounded-[10px] p-4"
            >
              <div className="font-display text-[28px] text-primary/30 leading-none mb-1.5">
                {rule.num}
              </div>
              <strong className="text-foreground text-[13px]">{rule.title}</strong>
              <p className="text-xs leading-relaxed text-foreground/70 mt-1">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-pink text-foreground font-body font-extrabold text-sm tracking-[2px] uppercase py-4 border-none cursor-pointer [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)] hover:opacity-90 transition-opacity"
        >
          I'm Ready — Let's Go →
        </button>
      </div>
    </div>
  );
};

export default AuditIntro;
