import logo from "@/assets/brickhouse-logo.png";
import { Instagram } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="relative px-6 py-16 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        <img
          src={logo}
          alt="Brickhouse Mindset"
          className="w-40 opacity-80"
        />

        <p className="font-body text-sm text-muted-foreground max-w-md">
          Simplifying Loving Yourself and Creating a Life That You Love.
        </p>

        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/BrickhouseMindset"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-muted-foreground"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        <p className="font-body text-xs text-muted-foreground opacity-60">
          © {new Date().getFullYear()} Brickhouse Mindset. Che' Lovelight,
          Lifestyle Architect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
