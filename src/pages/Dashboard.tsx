import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useDailyRitual } from "@/hooks/useDailyRitual";
import logo from "@/assets/brickhouse-logo.png";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const { completedLessons } = useLessonProgress();
  const { ritual, streak } = useDailyRitual();

  useEffect(() => {
    if (loading || !user) return;

    const checkOnboarding = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("transformation_choice")
        .eq("id", user.id)
        .single();

      if (!data?.transformation_choice) {
        navigate("/onboarding", { replace: true });
        return;
      }
      setCheckingProfile(false);
    };

    checkOnboarding();
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  if (loading || checkingProfile) return null;

  const todayComplete = [
    ritual?.morning_affirmation,
    ritual?.midday_checkin,
    ritual?.evening_reflection,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 text-center">
      <img
        src={logo}
        alt="Brickhouse Mindset"
        className="w-48 mb-8 drop-shadow-[0_0_30px_hsl(330_100%_42%/0.3)]"
      />

      <h1 className="font-display text-4xl sm:text-5xl tracking-wider mb-3">
        Welcome, <span className="text-accent">Queen</span>
      </h1>

      <p className="font-body text-sm text-muted-foreground mb-2">
        {user?.email}
      </p>

      <p className="font-body text-muted-foreground max-w-md mb-4">
        Your Brickhouse is under construction. {completedLessons.length > 0 && `${completedLessons.length} lessons completed.`}
      </p>

      {/* Quick stats */}
      <div className="flex gap-4 mb-8">
        <div className="bg-gradient-card border border-border rounded-xl px-4 py-3 text-center">
          <div className="font-display text-2xl text-accent">{streak}</div>
          <div className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">Day Streak</div>
        </div>
        <div className="bg-gradient-card border border-border rounded-xl px-4 py-3 text-center">
          <div className="font-display text-2xl text-primary">{completedLessons.length}</div>
          <div className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">Lessons Done</div>
        </div>
        <div className="bg-gradient-card border border-border rounded-xl px-4 py-3 text-center">
          <div className="font-display text-2xl">{todayComplete}/3</div>
          <div className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">Today's Ritual</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg w-full mb-10">
        <Link
          to="/bricks"
          className="bg-gradient-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
        >
          <div className="text-2xl mb-2">🧱</div>
          <div className="font-display text-xs tracking-wider">My Bricks</div>
          <div className="text-[9px] text-accent mt-1 uppercase tracking-wider">
            Explore →
          </div>
        </Link>
        <Link
          to="/daily-ritual"
          className="bg-gradient-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
        >
          <div className="text-2xl mb-2">🌅</div>
          <div className="font-display text-xs tracking-wider">Daily Ritual</div>
          <div className="text-[9px] text-accent mt-1 uppercase tracking-wider">
            {todayComplete === 3 ? "Done ✓" : "Start →"}
          </div>
        </Link>
        {[
          { icon: "💎", label: "Affirmations", link: "/affirmations" },
          { icon: "🔥", label: "Passion Pick" },
          { icon: "📐", label: "Scheduler" },
          { icon: "✨", label: "Goddess Rx" },
        ].map((item) => (
          "link" in item && item.link ? (
            <Link
              key={item.label}
              to={item.link}
              className="bg-gradient-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-display text-xs tracking-wider">{item.label}</div>
              <div className="text-[9px] text-accent mt-1 uppercase tracking-wider">Explore →</div>
            </Link>
          ) : (
          <div
            key={item.label}
            className="bg-gradient-card border border-border rounded-xl p-4 text-center opacity-60"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-display text-xs tracking-wider">
              {item.label}
            </div>
            <div className="text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">
              Coming Soon
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSignOut}
        className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
      >
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
