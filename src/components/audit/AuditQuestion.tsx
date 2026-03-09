import { AuditArea, feelingLabels, sliderSubLabels } from "@/data/auditContent";

interface AuditQuestionProps {
  area: AuditArea;
  index: number;
  total: number;
  score: number;
  onScoreChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const AuditQuestion = ({
  area,
  index,
  total,
  score,
  onScoreChange,
  onNext,
  onBack,
  isFirst,
  isLast,
}: AuditQuestionProps) => {
  return (
    <div className="animate-fade-up">
      <div className="text-[10px] tracking-[4px] text-accent uppercase mb-3">
        Area {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
      </div>

      <span className="text-[44px] block mb-3.5">{area.icon}</span>

      <h2 className="font-display text-[clamp(38px,8vw,60px)] font-normal leading-none tracking-[3px] uppercase mb-1.5">
        {area.name}
      </h2>

      <p className="text-xs tracking-[2px] text-primary uppercase mb-6">
        {area.tagline}
      </p>

      {/* Reflective questions */}
      <div className="text-sm leading-relaxed text-foreground/70 mb-8 p-5 bg-foreground/[0.03] rounded-xl border border-foreground/[0.06]">
        {area.questions.map((q, i) => (
          <p key={i} className={i < area.questions.length - 1 ? "mb-2" : ""}>
            {q}
          </p>
        ))}
      </div>

      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[13px] text-foreground/60">{area.sliderLabel}</span>
          <div className="text-right">
            <div className="font-display text-[42px] font-normal text-accent leading-none min-w-[60px] text-right">
              {score}
            </div>
            <div className="text-[11px] text-foreground/40 mt-0.5">
              {sliderSubLabels[score - 1]}
            </div>
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={score}
          onChange={(e) => onScoreChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-foreground/10 rounded-sm outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-pink [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_hsl(330_100%_42%/0.2)] [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_8px_hsl(330_100%_42%/0.25)] [&::-webkit-slider-thumb]:transition-shadow"
        />

        <div className="flex justify-between mt-2 px-0.5">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="text-[10px] text-foreground/25 w-5 text-center">
              {i + 1}
            </span>
          ))}
        </div>

        <p className="text-center mt-3 text-[13px] text-foreground/50 italic min-h-[20px] transition-all">
          {feelingLabels[score]}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 items-center mt-8">
        {!isFirst && (
          <button
            onClick={onBack}
            className="bg-foreground/[0.07] text-foreground/60 font-body font-semibold text-xs tracking-[2px] uppercase px-6 py-3.5 border border-foreground/10 rounded cursor-pointer hover:bg-foreground/10 hover:text-foreground transition-all"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-pink text-foreground font-body font-extrabold text-[13px] tracking-[2px] uppercase py-4 border-none cursor-pointer [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)] hover:opacity-90 transition-opacity"
        >
          {isLast ? "See My Results →" : "Next Area →"}
        </button>
      </div>
    </div>
  );
};

export default AuditQuestion;
