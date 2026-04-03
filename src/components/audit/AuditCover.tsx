import brickhouseLogo from "@/assets/BHhres-white.png";

interface AuditCoverProps {
  onStart: () => void;
}

const AuditCover = ({ onStart }: AuditCoverProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-10 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_50%_0%,hsl(330_100%_42%/0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_30%,hsl(330_100%_42%/0.25)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[600px]">
        {/* Logo */}
        <div className="mb-2">
          <img
            src={brickhouseLogo}
            alt="Brickhouse Mindset"
            className="w-[clamp(280px,75vw,480px)] mx-auto opacity-95"
          />
        </div>

        <p className="font-display text-lg tracking-[6px] uppercase text-foreground/90 mb-1">
          A Che' Lovelight Experience
        </p>

        <h1 className="font-display text-[clamp(52px,12vw,96px)] font-normal leading-[0.9] tracking-wide mb-1">
          Life <em className="text-accent not-italic block tracking-widest">Audit</em>
        </h1>

        <p className="text-[clamp(13px,2.5vw,16px)] tracking-[3px] text-primary uppercase mt-5 mb-8">
          5 Areas · 2 Minutes · Total Clarity
        </p>

        <p className="text-[15px] leading-relaxed text-foreground/70 max-w-[480px] mx-auto mb-10">
          Most women have never stopped long enough to honestly assess where they
          are. This isn't a quiz. It's a{" "}
          <strong className="text-accent">mirror</strong>. Five life areas.
          Honest answers. A personalized diagnosis of where you're{" "}
          <strong className="text-accent">thriving</strong>, where you're{" "}
          <strong className="text-accent">surviving</strong>, and where you're{" "}
          <strong className="text-accent">drowning</strong>.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 max-w-[300px] mx-auto mb-10">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <span className="w-[7px] h-[7px] bg-accent rotate-45 shrink-0" />
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>

        <button
          onClick={onStart}
          className="inline-block bg-gradient-pink text-foreground font-body font-extrabold text-sm tracking-[2px] uppercase px-12 py-[18px] border-none cursor-pointer [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] hover:opacity-90 hover:-translate-y-0.5 transition-all"
        >
          Begin My Audit →
        </button>

        <p className="mt-8 text-[11px] text-foreground/35 tracking-wider">
          Free · No sign-up required · Results are instant
        </p>
      </div>
    </div>
  );
};

export default AuditCover;
