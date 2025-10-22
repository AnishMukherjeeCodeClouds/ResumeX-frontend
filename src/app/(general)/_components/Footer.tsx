import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo / Branding */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">ResumeBuilder</h3>
          <p className="text-gray-400">
            Build professional resumes easily and land your dream job.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Templates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.9 9.9 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184a4.916 4.916 0 00-8.379 4.482A13.946 13.946 0 011.671 3.149a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.215 2.188 4.099a4.904 4.904 0 01-2.228-.616c-.054 2.385 1.675 4.623 4.157 5.114a4.935 4.935 0 01-2.224.085c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 01-6.102 2.105c-.395 0-.787-.023-1.175-.069A13.945 13.945 0 007.548 21c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c-5.402 0-9.837 4.435-9.837 9.837 0 5.401 4.435 9.837 9.837 9.837 5.401 0 9.837-4.436 9.837-9.837 0-5.402-4.436-9.837-9.837-9.837zm0 17.464c-4.202 0-7.628-3.426-7.628-7.628 0-4.201 3.426-7.627 7.628-7.627 4.201 0 7.628 3.426 7.628 7.627 0 4.202-3.427 7.628-7.628 7.628zm3.406-10.326a1.446 1.446 0 11-2.892 0 1.446 1.446 0 012.892 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
      </div>
    </footer>
  );
}
