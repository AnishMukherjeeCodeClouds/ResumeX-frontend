import { DownloadIcon } from "@/app/(general)/(landing)/_icons/DownloadIcon";
import { PreviewIcon } from "@/app/(general)/(landing)/_icons/PreviewIcon";
import { SecureIcon } from "@/app/(general)/(landing)/_icons/SecureIcon";
import { TemplatesIcon } from "@/app/(general)/(landing)/_icons/TemplatesIcon";

export function FeaturesSection() {
  return (
    <section className="py-16 px-10 bg-gray-50">
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">Why Choose Our Resume Builder?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto lg:text-lg">
            Everything you need to create a professional resume quickly and
            easily.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-40">
          {[
            {
              icon: TemplatesIcon,
              title: "Multiple Free Templates",
              desc: "Choose from a variety of professionally designed resume templates for free.",
            },
            {
              icon: PreviewIcon,
              title: "Live Preview",
              desc: "See your resume update in real time as you edit — no surprises.",
            },
            {
              icon: DownloadIcon,
              title: "Download Anytime",
              desc: "Export your resume as PDF whenever you need — no limits.",
            },
            {
              icon: SecureIcon,
              title: "Saved Securely",
              desc: "Your resume data is stored securely so you can edit anytime without worry.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-4 p-4 lg:p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <feature.icon className="size-40" />
              <h3 className="text-lg font-semibold lg:text-xl">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
