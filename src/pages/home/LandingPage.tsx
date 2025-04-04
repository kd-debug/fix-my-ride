
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/home/HeroSection";
import { ServiceFeatures } from "@/components/home/ServiceFeatures";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { BecomeMechanic } from "@/components/home/BecomeMechanic";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <ServiceFeatures />
      <HowItWorks />
      <Testimonials />
      <BecomeMechanic />
    </div>
  );
};

export default LandingPage;
