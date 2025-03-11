import Link from "next/link";

export default function Footer() {
        return (
          <footer className="bg-gray-900 text-white py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

              <nav className="flex space-x-6 mb-3">
                <a href="/privacy-policy" className="hover:text-gray-400 transition">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-gray-400 transition">
                  Terms of Service
                </a>
                <a href="/sitemap" className="hover:text-gray-400 transition">
                  Sitemap
                </a>
              </nav>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Find Me Time. All rights reserved.
              </div>
            </div>
          </footer>
  );
}
