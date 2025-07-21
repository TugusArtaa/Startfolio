"use client";

import { Button } from "@/components/ui/button";
import {
  Shield,
  Calendar,
  ArrowLeft,
  Database,
  UserCheck,
  Share2,
  Lock,
  Eye,
  Cookie,
  FileText,
  Mail,
} from "lucide-react";
import Link from "next/link";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-teal-200/50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Last updated: July 01, 2025
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-12">
          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 rounded-xl flex items-center justify-center mr-4">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                What Information We Collect
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you use our CV builder, we collect information you provide
              directly to us:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Personal details (name, email, phone, address)</li>
              <li>
                Professional information (work experience, education, skills)
              </li>
              <li>Profile photos for creative templates</li>
              <li>Usage data to improve our service</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Create and customize your CV templates</li>
              <li>Provide customer support</li>
              <li>Send important account notifications</li>
              <li>Improve our services and user experience</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Information Sharing
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>We do not sell your personal information.</strong> We may
              share information only when:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>You give us explicit consent</li>
              <li>Required by law or legal process</li>
              <li>Necessary to protect our rights or safety</li>
              <li>
                With trusted service providers who help operate our service
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-xl flex items-center justify-center mr-4">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Data Security
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We protect your information using industry-standard security
              measures including SSL encryption, secure data storage, and
              regular security audits. However, no method of transmission over
              the internet is 100% secure.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 rounded-xl flex items-center justify-center mr-4">
                <Cookie className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to enhance your experience, remember your
              preferences, and analyze site usage. You can control cookie
              settings through your browser.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Changes to This Policy
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update this policy from time to time. We'll notify you of
              significant changes via email or through our service. Your
              continued use constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 rounded-xl flex items-center justify-center mr-4">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact
              us:
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <div className="space-y-2">
                <div>
                  <strong className="text-gray-900">Email:</strong>{" "}
                  <a
                    href="mailto:privacy@cvbuilder.com"
                    className="text-teal-600 hover:text-teal-700"
                  >
                    privacy@startfolio.com
                  </a>
                </div>
                <div>
                  <strong className="text-gray-900">Address:</strong> Bali,
                  Indonesia
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/">
            <Button
              variant="outline"
              className="border-teal-200 hover:border-teal-300 hover:bg-teal-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
