import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  FileText,
  Target,
  Palette,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-white">
      <div className="hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <img
                    src="/logo/Web-Logo.svg"
                    alt="StartFolio Logo"
                    className="h-6 w-6"
                  />
                </div>
                <span className="ml-3 text-xl font-bold text-white">
                  Start Folio CV
                </span>
              </div>

              <p className="mt-6 text-base text-gray-300">
                Create professional, ATS-friendly CVs in minutes. Trusted by
                thousands of job seekers worldwide.
              </p>

              <div className="mt-6 flex items-center text-sm text-gray-300">
                <Sparkles className="mr-2 h-4 w-4 text-teal-200" />
                <span>Trusted by 10,000+ professionals</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">Product</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <Link
                    href="/cv/new"
                    className="flex items-center text-sm text-gray-300 transition-colors hover:text-emerald-200"
                  >
                    <Target className="mr-2 h-4 w-4" />
                    CV ATS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cv/new"
                    className="flex items-center text-sm text-gray-300 transition-colors hover:text-emerald-200"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    CV Creative
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cv/new"
                    className="flex items-center text-sm text-gray-300 transition-colors hover:text-emerald-200"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    CV Template
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">Support</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <a
                    href="#contact"
                    className="flex items-center text-sm text-gray-300 transition-colors hover:text-emerald-200"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="flex items-center text-sm text-gray-300 transition-colors hover:text-emerald-200"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">Contact</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="mr-3 h-4 w-4 text-teal-200" />
                  <span className="text-sm">support@startfolio.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="mr-3 h-4 w-4 text-teal-200" />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="mr-3 h-4 w-4 text-teal-200" />
                  <span className="text-sm">Bali, Indonesia</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <Link
                  href="https://facebook.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800 text-emerald-200 transition-colors hover:bg-teal-400 hover:text-white"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800 text-emerald-200 transition-colors hover:bg-teal-400 hover:text-white"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://instagram.com/accounts/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800 text-emerald-200 transition-colors hover:bg-teal-400 hover:text-white"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-teal-700 pt-8">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <p className="text-sm text-gray-400">
                © 2024 StartFolio. All rights reserved.
              </p>
              <div className="mt-4 flex space-x-6 sm:mt-0">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-gray-400 transition-colors hover:text-emerald-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block sm:hidden">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            © 2024 StartFolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
