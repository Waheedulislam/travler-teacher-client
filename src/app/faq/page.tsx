"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  CreditCard,
  Users,
  Video,
  Calendar,
  Shield,
  Languages,
  Camera,
  Clock,
} from "lucide-react";

// Define types
type FAQItem = {
  id: string;
  category: string;
  icon: React.ReactNode;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "Getting Started",
    icon: <Globe className="w-5 h-5" />,
    question: "How do virtual travel tours work?",
    answer:
      "Our virtual tours connect you with local guides via Zoom for live, interactive experiences. Your guide will take you through their city using their phone or camera, showing you landmarks, hidden gems, and sharing cultural insights in real-time.",
  },
  {
    id: "2",
    category: "Getting Started",
    icon: <Calendar className="w-5 h-5" />,
    question: "How do I book a tour?",
    answer:
      "Browse our destinations, select a guide and tour that interests you, choose your preferred date and time, and complete the booking. You'll receive a Zoom link and tour details via email before your experience.",
  },
  {
    id: "3",
    category: "Teachers & Guides",
    icon: <Users className="w-5 h-5" />,
    question: "Who are the teachers and guides?",
    answer:
      "Certified educators, local guides, and cultural experts from around the world who are passionate about sharing their cities and cultures.",
  },
  {
    id: "4",
    category: "Teachers & Guides",
    icon: <Shield className="w-5 h-5" />,
    question: "Are all guides verified?",
    answer:
      "Yes — all teachers and guides are verified through our screening process. We check their credentials, conduct interviews, and require references. You can also chat with guides before booking.",
  },
  {
    id: "5",
    category: "Virtual Experiences",
    icon: <Video className="w-5 h-5" />,
    question: "Do I have to travel?",
    answer:
      "Nope! You can learn from your teacher online via Zoom. Experience destinations from the comfort of your home.",
  },
  {
    id: "6",
    category: "Virtual Experiences",
    icon: <Camera className="w-5 h-5" />,
    question: "What can I expect during a virtual tour?",
    answer:
      "Live walking tours through cities, visits to markets and landmarks, cultural cooking classes, language lessons, historical storytelling, and interactive Q&A sessions. Each experience is unique to the destination and guide.",
  },
  {
    id: "7",
    category: "Virtual Experiences",
    icon: <Clock className="w-5 h-5" />,
    question: "How long are the tours?",
    answer:
      "Tours typically range from 45 minutes to 2 hours, depending on the experience. Duration is clearly listed on each tour description. Some guides offer extended experiences or multi-session packages.",
  },
  {
    id: "8",
    category: "Virtual Experiences",
    icon: <Users className="w-5 h-5" />,
    question: "Can I book private or group tours?",
    answer:
      "Both! You can book private one-on-one experiences or join group tours with other travelers. Private tours offer personalized attention, while group tours are more affordable and social.",
  },
  {
    id: "9",
    category: "Booking & Scheduling",
    icon: <Calendar className="w-5 h-5" />,
    question: "Can I reschedule or cancel my tour?",
    answer:
      "Yes, you can reschedule up to 24 hours before your tour for free. Cancellations made 24+ hours in advance receive a full refund. Last-minute changes may incur fees depending on the guide's policy.",
  },
  {
    id: "10",
    category: "Booking & Scheduling",
    icon: <Globe className="w-5 h-5" />,
    question: "What time zones do you operate in?",
    answer:
      "Our guides operate in their local time zones worldwide. When booking, you'll see available times converted to your local timezone. We have guides available 24/7 across different continents.",
  },
  {
    id: "11",
    category: "Technical Requirements",
    icon: <Video className="w-5 h-5" />,
    question: "What do I need for a virtual tour?",
    answer:
      "A device with internet connection (computer, tablet, or smartphone), Zoom app installed, and a quiet space. Headphones are recommended for better audio quality. No special equipment needed!",
  },
  {
    id: "12",
    category: "Technical Requirements",
    icon: <Video className="w-5 h-5" />,
    question: "What if I have technical issues during the tour?",
    answer:
      "Our guides are trained to handle common technical issues. If problems persist, we offer technical support and will reschedule your tour at no extra cost. We also provide a backup contact method.",
  },
  {
    id: "13",
    category: "Languages & Communication",
    icon: <Languages className="w-5 h-5" />,
    question: "What languages are tours available in?",
    answer:
      "Tours are available in 20+ languages including English, Spanish, French, German, Italian, Japanese, Mandarin, and more. Each guide's languages are clearly listed on their profile.",
  },
  {
    id: "14",
    category: "Languages & Communication",
    icon: <MessageCircle className="w-5 h-5" />,
    question: "Can I interact with the guide during the tour?",
    answer:
      "Our tours are interactive. You can ask questions, request to see specific places, and have real conversations with your guide. It's like having a local friend show you around.",
  },
  {
    id: "15",
    category: "Pricing & Payments",
    icon: <CreditCard className="w-5 h-5" />,
    question: "How much do tours cost?",
    answer:
      "Prices vary by destination and experience type, typically ranging from $15-50 per person for group tours and $30-100 for private experiences. Pricing is clearly displayed before booking.",
  },
  {
    id: "16",
    category: "Pricing & Payments",
    icon: <CreditCard className="w-5 h-5" />,
    question: "Is it safe to pay online?",
    answer:
      "Yes — all teachers are verified. Chat before booking. Payment is secure using encrypted payment processing. We accept major credit cards and PayPal.",
  },
  {
    id: "17",
    category: "Destinations",
    icon: <MapPin className="w-5 h-5" />,
    question: "Which destinations are available?",
    answer:
      "We offer virtual experiences from 100+ cities worldwide including Tokyo, Paris, Rome, Istanbul, Cairo, Mumbai, Rio de Janeiro, New York, and many hidden gems. New destinations are added regularly.",
  },
  {
    id: "18",
    category: "Destinations",
    icon: <Globe className="w-5 h-5" />,
    question: "Can I request a specific location or experience?",
    answer:
      "Yes! If you don't see your desired destination, you can submit a request. We'll try to connect you with local guides in that area or add it to our platform if there's enough interest.",
  },
];

const categories = [
  "All",
  "Getting Started",
  "Teachers & Guides",
  "Virtual Experiences",
  "Booking & Scheduling",
  "Technical Requirements",
  "Languages & Communication",
  "Pricing & Payments",
  "Destinations",
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Getting Started": <Globe className="w-4 h-4" />,
  "Teachers & Guides": <Users className="w-4 h-4" />,
  "Virtual Experiences": <Video className="w-4 h-4" />,
  "Booking & Scheduling": <Calendar className="w-4 h-4" />,
  "Technical Requirements": <Video className="w-4 h-4" />,
  "Languages & Communication": <Languages className="w-4 h-4" />,
  "Pricing & Payments": <CreditCard className="w-4 h-4" />,
  Destinations: <MapPin className="w-4 h-4" />,
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Globe className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Travel Tour FAQ
          </h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
            Everything you need to know about virtual travel experiences with
            local guides from around the world. Explore destinations from home!
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search travel and tour questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-full focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow-lg"
                  : "hover:bg-gray-50 hover:shadow-md"
              }`}
            >
              {category !== "All" && categoryIcons[category]}
              <span className={category !== "All" ? "ml-2" : ""}>
                {category}
              </span>
            </Button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12 col-span-2">
              <CardContent>
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or category filter.
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(
              filteredFAQs.reduce((acc, faq) => {
                if (!acc[faq.category]) acc[faq.category] = [];
                acc[faq.category].push(faq);
                return acc;
              }, {} as Record<string, FAQItem[]>)
            ).map(([category, faqs]) => (
              <Card
                key={category}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-2"
              >
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <div className="flex items-center gap-3">
                    {categoryIcons[category]}
                    <CardTitle className="text-xl">{category}</CardTitle>
                    <Badge variant="secondary" className="ml-auto">
                      {faqs.length}{" "}
                      {faqs.length === 1 ? "question" : "questions"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border-b last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-center gap-3 text-left">
                            <div className="p-2 bg-yellow-100 rounded-lg shrink-0">
                              {faq.icon}
                            </div>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="pl-11">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Section */}
        <Card className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Ready to explore the world?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can&lsquo;t find the answer you&lsquo;re looking for? Our travel
              experts are here to help you plan the perfect virtual adventure
              with local guides from around the globe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Travel Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-gray-50 bg-transparent"
              >
                <Globe className="w-5 h-5 mr-2" />
                Browse Destinations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
