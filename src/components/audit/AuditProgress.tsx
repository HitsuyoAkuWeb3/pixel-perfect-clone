interface AuditProgressProps {
  current: number;
  total: number;
}

const AuditProgress = ({ current, total }: AuditProgressProps) => {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="mb-9">
      <div className="flex justify-between text-[11px] tracking-[2px] text-accent uppercase mb-2">
        <span>Area {current + 1} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-[3px] bg-foreground/[0.08] rounded-sm overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-sm transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default AuditProgress;
