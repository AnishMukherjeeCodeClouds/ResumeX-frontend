import { Button } from "@/components/ui/button";

export function BottomCTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-accent2 to-accent2/80 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Your Dream Job Awaits
        </h2>
        <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto">
          Create a professional resume that gets noticed by top employers. Start
          today, it’s free!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button className="text-lg py-4 px-10 rounded-full bg-white text-accent2 shadow-lg hover:shadow-xl transition">
            Build Your Resume
          </Button>
          <Button
            variant="outline"
            className="text-lg py-4 px-10 rounded-full border !border-white text-white hover:bg-white hover:text-accent2 shadow hover:shadow-lg transition"
          >
            See Templates
          </Button>
        </div>

        <p className="text-sm text-gray-200 mt-4">
          No credit card required • Start immediately
        </p>
      </div>
    </section>
  );
}
