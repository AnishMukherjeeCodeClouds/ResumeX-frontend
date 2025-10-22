import { BottomCTASection } from "@/app/(general)/(landing)/_sections/BottomCTA";
import { FeaturesSection } from "@/app/(general)/(landing)/_sections/Features";
import { HeroSection } from "@/app/(general)/(landing)/_sections/Hero";
import { TestimonialsSection } from "@/app/(general)/(landing)/_sections/Testimonials";

export default function Page() {
  return (
    <div className="min-h-dvh max-w-dvw">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BottomCTASection />
    </div>
  );
}
