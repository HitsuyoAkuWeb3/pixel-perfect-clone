import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { getBrickBySlug } from "@/data/bricksContent";
import { cn } from "@/lib/utils";

const BrickDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const brick = slug ? getBrickBySlug(slug) : undefined;

  if (!brick) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl mb-4">Brick not found</p>
          <Link to="/bricks" className="text-accent hover:underline font-body text-sm">
            ← Back to My Bricks
          </Link>
        </div>
      </div>
    );
  }

  // Brick 1 is unlocked for all; rest show as locked placeholder
  const isUnlocked = brick.id === 1;

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          to="/bricks"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          My Bricks
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{brick.icon}</div>
            <div>
              <div className="font-display text-[10px] tracking-[3px] text-muted-foreground mb-1">
                BRICK {String(brick.id).padStart(2, "0")} OF 12
              </div>
              <h1 className="font-display text-3xl sm:text-4xl tracking-wider leading-tight">
                {brick.name}
              </h1>
              <p className="font-body text-xs text-accent uppercase tracking-wider mt-1">
                {brick.subtitle}
              </p>
            </div>
          </div>

          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
            {brick.description}
          </p>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-2 bg-foreground/[0.07] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ width: "0%" }}
              />
            </div>
            <span className="font-body text-xs text-muted-foreground">
              0 / {brick.lessonCount}
            </span>
          </div>
        </motion.div>

        {/* Lessons */}
        <div className="space-y-2">
          {brick.lessons.map((lesson, i) => {
            const locked = !isUnlocked;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <div
                  className={cn(
                    "flex items-start gap-4 rounded-xl border p-4 transition-all",
                    locked
                      ? "bg-foreground/[0.02] border-border opacity-50"
                      : "bg-gradient-card border-border hover:border-primary/30 cursor-pointer"
                  )}
                >
                  {/* Lesson number */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-display text-sm",
                      locked
                        ? "bg-foreground/[0.05] text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {locked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "font-display text-sm tracking-wider leading-snug",
                        locked && "text-muted-foreground"
                      )}
                    >
                      {lesson.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Locked message */}
        {!isUnlocked && (
          <motion.div
            className="mt-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/25 p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Lock className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display text-lg tracking-wider mb-2">
              Unlock This Brick
            </h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto mb-4">
              Join the Brickhouse Collective to access all 12 Bricks, daily
              rituals, and your complete Lifestyle Architecture tools.
            </p>
            <a
              href="https://example.com/brickhouse-collective"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-pink text-foreground font-body font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Join the Collective →
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrickDetail;
