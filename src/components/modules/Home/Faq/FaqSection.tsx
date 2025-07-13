"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";

export default function FaqSection() {
  return (
    <section className="relative max-w-4xl mx-auto px-6 pb-20 pt-16">
      {/* Background Elements */}

      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20 blur-xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm mb-6">
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              FAQ Preview
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our platform and services
          </p>
        </div>

        {/* Accordion */}
        <div className="mb-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-semibold px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-blue-50 [&[data-state=open]]:to-indigo-50">
                <span className="text-left">Who are the teachers?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                Our platform features certified educators, experienced local
                guides, and passionate cultural experts from around the world.
                Each teacher is carefully vetted and brings unique expertise to
                create engaging learning experiences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-semibold px-6 py-5 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-green-50 [&[data-state=open]]:to-emerald-50">
                <span className="text-left">Do I have to travel?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                Not at all! You can learn from the comfort of your home through
                our seamless online platform via Zoom. Experience authentic
                cultural learning without the need to travel, making education
                accessible from anywhere in the world.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-semibold px-6 py-5 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-purple-50 [&[data-state=open]]:to-pink-50">
                <span className="text-left">Is it safe?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                All teachers undergo thorough verification processes. You can
                chat with teachers before booking to ensure the perfect match.
                Our secure payment system protects your transactions, giving you
                peace of mind.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-semibold px-6 py-5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-orange-50 [&[data-state=open]]:to-red-50">
                <span className="text-left">How do I get started?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                Getting started is simple! Browse our teacher profiles, read
                reviews, and book a session that fits your schedule. You&apos;ll
                receive all the necessary details to join your online learning
                experience.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="group relative px-8 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-300/50 rounded-full text-gray-700 font-medium hover:bg-white hover:border-blue-300 hover:text-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">💫</span>
              <span>View All FAQs</span>
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>
    </section>
  );
}
