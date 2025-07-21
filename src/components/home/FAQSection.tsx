"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqData } from "@/data/homepage";

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-teal-200/50 text-teal-700 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium shadow-sm mb-4 sm:mb-6">
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about our CV builder and
            services.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.map((faq, index) => (
              <Card
                key={index}
                className={cn(
                  "border border-gray-200 hover:border-teal-400 hover:bg-transparent transition-all duration-300 overflow-hidden",
                  "rounded-lg",
                  "shadow-none",
                  "bg-white",
                  "p-0",
                  openItems.includes(index) && "border-teal-200 shadow-md"
                )}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-3 sm:p-4 text-left hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openItems.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-teal-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openItems.includes(index)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-center">
          <Card className="bg-transparent border border-teal-200/50">
            <CardContent className="p-4 sm:p-3">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6">
                Can't find the answer you're looking for? Our support team is
                here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="mailto:support@startfolio.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
