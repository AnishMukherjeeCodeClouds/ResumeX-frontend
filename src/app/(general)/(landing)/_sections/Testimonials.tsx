import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section className="py-16 px-10 bg-white">
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto lg:text-lg">
            Thousands of job seekers love how easy it is to create a
            professional resume with our builder.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-40">
          {[
            {
              name: "Sarah M.",
              title: "Software Engineer",
              review:
                "I landed my dream job in just two weeks after creating my resume here! The _templates are amazing.",
              avatar: "https://i.pravatar.cc/150?img=32",
              rating: 5,
            },
            {
              name: "David L.",
              title: "Marketing Specialist",
              review:
                "Live preview made it so easy to see exactly how my resume looked. Highly recommend!",
              avatar: "https://i.pravatar.cc/150?img=12",
              rating: 4,
            },
            {
              name: "Priya K.",
              title: "UX Designer",
              review:
                "I love that I can save my resume and edit anytime. Makes job applications stress-free.",
              avatar: "https://i.pravatar.cc/150?img=44",
              rating: 5,
            },
            {
              name: "James R.",
              title: "Product Manager",
              review:
                "Downloading my resume as PDF was super simple, and it looks very professional.",
              avatar: "https://i.pravatar.cc/150?img=56",
              rating: 4,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 text-sm md:text-base mb-4">
                &quot;{testimonial.review}&quot;
              </p>

              <div className="flex items-center mt-auto space-x-3">
                <Image
                  height={10}
                  width={10}
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.958a1 1 0 00-.364-1.118L2.044 9.385c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.293-3.958z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
