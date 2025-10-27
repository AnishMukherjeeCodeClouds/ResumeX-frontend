import { HeroIcon } from "@/app/(general)/(landing)/_icons/HeroIcon";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="px-10 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 max-w-6xl mx-auto">
      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-5 text-center md:text-left">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Create a Job-Ready Resume in Minutes
          </h1>
          <h2 className="text-lg sm:text-xl text-gray-600">
            Build your resume easily with our free builder and professional
            templates.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row md:justify-start justify-center gap-3 pt-3">
          <Button className="text-lg py-3 px-8 rounded-full bg-accent2 hover:opacity-90 transition">
            Build Your Resume
          </Button>
          <Button
            variant="outline"
            className="text-lg py-3 px-8 rounded-full border !border-accent2 text-accent2 bg-white hover:bg-accent2/10 transition"
          >
            Check our templates
          </Button>
        </div>
      </div>

      {/* Right Image / Illustration */}
      <div className="w-full md:w-1/2 flex justify-center">
        <HeroIcon className="size-full max-w-sm sm:max-w-md md:max-w-lg" />
      </div>
    </section>
  );
}
