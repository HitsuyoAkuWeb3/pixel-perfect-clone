import HeroSection from "@/components/HeroSection";
import DualCTASection from "@/components/DualCTASection";
import TransformationsSection from "@/components/TransformationsSection";
import SocialProofSection from "@/components/SocialProofSection";
import LandingFooter from "@/components/LandingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <DualCTASection />
      <TransformationsSection />
      <SocialProofSection />
      <LandingFooter />
    </div>
  );
};

export default Index;
