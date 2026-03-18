import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { areas } from "@/data/auditContent";
import { analytics } from "@/lib/analytics";
import AuditCover from "@/components/audit/AuditCover";
import AuditIntro from "@/components/audit/AuditIntro";
import AuditProgress from "@/components/audit/AuditProgress";
import AuditQuestion from "@/components/audit/AuditQuestion";
import AuditResults from "@/components/audit/AuditResults";

type Screen = "cover" | "intro" | "quiz" | "results";

const screenVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" as const } },
};

const LifeAudit = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("lead");

  const [screen, setScreen] = useState<Screen>("cover");
  const [currentArea, setCurrentArea] = useState(0);
  const [scores, setScores] = useState<number[]>([5, 5, 5, 5, 5]);
  const [submitting, setSubmitting] = useState(false);

  const goToScreen = useCallback((s: Screen) => {
    if (s === "quiz") analytics.auditStarted(leadId);
    setScreen(s);
    window.scrollTo(0, 0);
  }, [leadId]);

  const handleScoreChange = useCallback(
    (value: number) => {
      setScores((prev) => {
        const next = [...prev];
        next[currentArea] = value;
        return next;
      });
    },
    [currentArea]
  );

  const saveResults = useCallback(async () => {
    const scoreData = {
      self: scores[0],
      love: scores[1],
      money: scores[2],
      purpose: scores[3],
      joy: scores[4],
    };

    await supabase.from("audit_results").insert({
      lead_id: leadId || null,
      scores: scoreData,
    });
  }, [scores, leadId]);

  const handleNext = useCallback(async () => {
    if (currentArea < areas.length - 1) {
      setCurrentArea((c) => c + 1);
      window.scrollTo(0, 0);
    } else {
      setSubmitting(true);
      await saveResults();
      analytics.auditCompleted({
        self: scores[0], love: scores[1], money: scores[2],
        purpose: scores[3], joy: scores[4],
      });
      setSubmitting(false);
      goToScreen("results");
    }
  }, [currentArea, scores, saveResults, goToScreen]);

  const handleBack = useCallback(() => {
    if (currentArea > 0) {
      setCurrentArea((c) => c - 1);
      window.scrollTo(0, 0);
    }
  }, [currentArea]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === "cover" && (
          <motion.div key="cover" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <AuditCover onStart={() => goToScreen("intro")} />
          </motion.div>
        )}

        {screen === "intro" && (
          <motion.div key="intro" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <AuditIntro onStart={() => goToScreen("quiz")} />
          </motion.div>
        )}

        {screen === "quiz" && (
          <motion.div key="quiz" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <div className="min-h-screen flex flex-col items-center px-6 py-10">
              <div className="flex items-center justify-center gap-2 text-[10px] tracking-[3px] text-foreground/30 uppercase mb-0">
                <span className="flex-1 max-w-[80px] h-px bg-foreground/[0.08]" />
                Brickhouse Life Audit
                <span className="flex-1 max-w-[80px] h-px bg-foreground/[0.08]" />
              </div>

              <div className="max-w-[640px] w-full mt-6">
                <AuditProgress current={currentArea} total={areas.length} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentArea}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.25, ease: "easeIn" } }}
                  >
                    <AuditQuestion
                      area={areas[currentArea]}
                      index={currentArea}
                      total={areas.length}
                      score={scores[currentArea]}
                      onScoreChange={handleScoreChange}
                      onNext={handleNext}
                      onBack={handleBack}
                      isFirst={currentArea === 0}
                      isLast={currentArea === areas.length - 1}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {screen === "results" && (
          <motion.div key="results" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <AuditResults scores={scores} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeAudit;
