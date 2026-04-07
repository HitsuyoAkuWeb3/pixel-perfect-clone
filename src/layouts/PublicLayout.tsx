import { Outlet } from "react-router-dom";
import LandingFooter from "../components/LandingFooter";
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 relative overflow-x-hidden">
      <div className="fixed inset-0 z-[0] bg-background pointer-events-none" />
      <div className="fixed inset-0 z-[0] bg-brick-pattern pointer-events-none" />
      <main className="relative z-10 w-full">
        <Outlet />
      </main>
      <div className="relative z-10 w-full">
        <LandingFooter />
      </div>
    </div>
  );
}
