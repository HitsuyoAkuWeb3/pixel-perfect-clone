import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/brickhouse-logo.png";
import { toast } from "sonner";

type Mode = "login" | "signup" | "forgot";

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Check your email to verify your account!");
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Check your email for the reset link.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) toast.error(error.message);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Pink glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(330 100% 42% / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[400px]">
        <img
          src={logo}
          alt="Brickhouse Mindset"
          className="w-48 mx-auto mb-8 drop-shadow-[0_0_30px_hsl(330_100%_42%/0.4)]"
        />

        <h1 className="font-display text-3xl text-center mb-1 tracking-wider">
          {mode === "login" && "Welcome Back"}
          {mode === "signup" && "Start Building"}
          {mode === "forgot" && "Reset Password"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {mode === "login" && "Sign in to your Brickhouse"}
          {mode === "signup" && "Create your Brickhouse account"}
          {mode === "forgot" && "We'll send you a reset link"}
        </p>

        {/* Google */}
        {mode !== "forgot" && (
          <>
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 bg-foreground/[0.06] border border-border rounded-lg px-4 py-3 font-body text-sm font-medium hover:border-primary/40 transition-colors mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
              <span className="flex-1 h-px bg-border" />
            </div>
          </>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-input border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-input border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />

          {mode !== "forgot" && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-pink text-foreground font-body font-bold text-sm tracking-wider uppercase py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting
              ? "..."
              : mode === "login"
              ? "Sign In"
              : mode === "signup"
              ? "Create Account"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === "login" && (
            <>
              <button
                onClick={() => setMode("forgot")}
                className="text-xs text-muted-foreground hover:text-accent transition-colors block mx-auto"
              >
                Forgot password?
              </button>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-accent hover:underline"
                >
                  Sign up
                </button>
              </p>
            </>
          )}
          {mode === "signup" && (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-accent hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
          {mode === "forgot" && (
            <button
              onClick={() => setMode("login")}
              className="text-sm text-accent hover:underline"
            >
              ← Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
