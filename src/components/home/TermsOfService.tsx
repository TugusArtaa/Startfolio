"use client";

import { Button } from "@/components/ui/button";
import {
  Scale,
  Calendar,
  ArrowLeft,
  FileCheck,
  Settings,
  UserX,
  Copyright,
  Shield,
  Trash2,
  FileText,
  Mail,
} from "lucide-react";
import Link from "next/link";

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-teal-200/50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm mb-6">
            <Scale className="w-4 h-4 mr-2" />
            Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our CV builder
            service. By using our service, you agree to these terms.
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
                <FileCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Acceptance of Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              By using CV Builder, you agree to these terms. If you don't agree,
              please don't use our service. These terms govern your use of our
              website and CV building services.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Service</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              CV Builder provides:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Online CV and resume building tools</li>
              <li>Professional templates (ATS-friendly and creative)</li>
              <li>PDF export functionality</li>
              <li>Secure account management and data storage</li>
              <li>Customer support</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-xl flex items-center justify-center mr-4">
                <UserX className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your Responsibilities
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              When using our service, you must:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Provide accurate and truthful information</li>
              <li>Keep your account secure and confidential</li>
              <li>Use the service legally and appropriately</li>
              <li>Respect intellectual property rights</li>
              <li>Not interfere with or disrupt the service</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 text-red-600 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Acceptable Use
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may not use our service to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Create false or misleading CVs</li>
              <li>Violate any laws or regulations</li>
              <li>Upload malicious content or viruses</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Use the service for spam or harassment</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-xl flex items-center justify-center mr-4">
                <Copyright className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Intellectual Property
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Our Rights:</strong> We own the CV Builder service,
              templates, and technology.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Your Rights:</strong> You own your personal content and
              the CVs you create. You can export and delete your data anytime.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Disclaimers</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our service is provided "as is" without warranties. We don't
              guarantee uninterrupted service or specific job outcomes. While we
              strive for excellence, we cannot guarantee that using our CV
              builder will result in job interviews or employment.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 rounded-xl flex items-center justify-center mr-4">
                <Trash2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              You can terminate your account anytime. We may suspend accounts
              for terms violations. Upon termination, you can export your data,
              and we'll delete your information as required by law.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Changes to Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update these terms occasionally. We'll notify you of
              significant changes via email or through our service. Continued
              use means you accept the updated terms.
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
              Questions about these terms? Contact us:
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <div className="space-y-2">
                <div>
                  <strong className="text-gray-900">Email:</strong>{" "}
                  <a
                    href="mailto:legal@cvbuilder.com"
                    className="text-teal-600 hover:text-teal-700"
                  >
                    legal@startfolio.com
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
