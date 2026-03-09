import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/brickhouse-logo.png";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    const checkOnboarding = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("transformation_choice")
        .eq("id", user.id)
        .single();

      // If no transformation chosen, redirect to onboarding
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

      <p className="font-body text-muted-foreground max-w-md mb-10">
        Your Brickhouse is under construction. The 12 Bricks, daily rituals,
        and your full Lifestyle Architecture tools are coming soon.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg w-full mb-10">
        {[
          { icon: "🧱", label: "My Bricks" },
          { icon: "🌅", label: "Daily Ritual" },
          { icon: "💎", label: "Affirmations" },
          { icon: "🔥", label: "Passion Pick" },
          { icon: "📐", label: "Scheduler" },
          { icon: "✨", label: "Goddess Rx" },
        ].map((item) => (
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
