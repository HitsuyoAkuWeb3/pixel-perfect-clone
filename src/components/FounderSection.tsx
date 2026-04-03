import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import cheImage from "@/assets/che-lovelight.png";

const FounderSection = () => {
  return (
    <section className="relative px-6 py-20 md:py-28">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Photo */}
          <div className="mx-auto md:mx-0">
            <div className="w-64 h-80 rounded-2xl bg-gradient-card border border-border overflow-hidden flex items-center justify-center">
              <img src={cheImage} alt="Che' Lovelight" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="font-display text-sm tracking-[6px] text-gold-light mb-4">
              LIFESTYLE ARCHITECT
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6">
              Meet{" "}
              <span className="text-gradient-pink">Che' Lovelight</span>
            </h2>

            <div className="space-y-4 font-body text-[15px] text-foreground/75 leading-relaxed">
              <p>
                When Che's daughter was abducted, she faced two years of silence,
                a divorce, unemployment, and a 35-pound weight gain — all at
                once. Everything that could break a woman, happened. And she made
                a choice:{" "}
                <strong className="text-foreground">
                  Build. Don't. Break.
                </strong>
              </p>
              <p>
                That decision became a framework of 144 lessons across 12 life
                categories. With 20+ years of executive experience in technology
                and the music industry, Che' doesn't do fluffy affirmations —
                she builds blueprints. Brick by brick.
              </p>
            </div>

            <Link
              to="/coaching"
              className="inline-flex items-center gap-2 mt-6 font-body font-semibold text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Learn More About Coaching
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
