import { Outlet } from "react-router-dom";
import LandingFooter from "../components/LandingFooter";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <main className="relative z-10">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
