import HeroSection from "@/components/HeroSection";
import DualCTASection from "@/components/DualCTASection";
import TransformationsSection from "@/components/TransformationsSection";
import SocialProofSection from "@/components/SocialProofSection";
import LandingFooter from "@/components/LandingFooter";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <ScrollReveal>
        <DualCTASection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <TransformationsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <SocialProofSection />
      </ScrollReveal>
      <ScrollReveal>
        <LandingFooter />
      </ScrollReveal>
    </div>
  );
};

export default Index;
