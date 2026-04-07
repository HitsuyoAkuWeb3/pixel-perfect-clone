import HeroSection from "@/components/HeroSection";
import DualCTASection from "@/components/DualCTASection";
import TransformationsSection from "@/components/TransformationsSection";
import SocialProofSection from "@/components/SocialProofSection";
import FounderSection from "@/components/FounderSection";
import B2BWaitlistSection from "@/components/B2BWaitlistSection";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent w-full">
      
      <div className="relative z-10 pt-0">
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
      <ScrollReveal delay={0.1}>
        <FounderSection />
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <B2BWaitlistSection />
      </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;

