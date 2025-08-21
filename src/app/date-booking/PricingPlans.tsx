"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Check, X, Star, Clock, Users, Zap } from "lucide-react";
import { useState } from "react";
import BookTourButton from "@/components/StripePaymentButton/StripePaymentButton"; // Stripe button

type Feature = { text: string; included: boolean };

type Plan = {
  name: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  badge?: string;
  deliveryTime: string;
  revisions: string;
  features: Feature[];
  color: string;
  icon: React.ReactNode;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: 199.99,
    originalPrice: 249.99,
    deliveryTime: "7 days",
    revisions: "2 revisions",
    color: "teal",
    icon: <Zap className="w-4 h-4" />,
    features: [
      { text: "Travel Itinerary Planning", included: true },
      { text: "Destination Consultation", included: true },
      { text: "Hotel & Flight Suggestions", included: true },
      { text: "24/7 Chat Support", included: false },
      { text: "Local Guide Assistance", included: false },
      { text: "Group Tour Discounts", included: false },
    ],
  },
  {
    name: "Standard",
    price: 399.99,
    originalPrice: 499.99,
    popular: true,
    badge: "Best Value",
    deliveryTime: "5 days",
    revisions: "5 revisions",
    color: "indigo",
    icon: <Star className="w-4 h-4" />,
    features: [
      { text: "Travel Itinerary Planning", included: true },
      { text: "Destination Consultation", included: true },
      { text: "Hotel & Flight Suggestions", included: true },
      { text: "24/7 Chat Support", included: true },
      { text: "Local Guide Assistance", included: false },
      { text: "Group Tour Discounts", included: false },
    ],
  },
  {
    name: "Premium",
    price: 599.99,
    originalPrice: 749.99,
    badge: "Pro Choice",
    deliveryTime: "3 days",
    revisions: "Unlimited",
    color: "violet",
    icon: <Users className="w-4 h-4" />,
    features: [
      { text: "Travel Itinerary Planning", included: true },
      { text: "Destination Consultation", included: true },
      { text: "Hotel & Flight Suggestions", included: true },
      { text: "24/7 Chat Support", included: true },
      { text: "Local Guide Assistance", included: true },
      { text: "Group Tour Discounts", included: true },
    ],
  },
];

const colorClasses = {
  teal: {
    bg: "bg-teal-500",
    hoverBg: "hover:bg-teal-600",
    text: "text-teal-600",
    lightBg: "bg-teal-100",
    lightText: "text-teal-600",
  },
  indigo: {
    bg: "bg-indigo-500",
    hoverBg: "hover:bg-indigo-600",
    text: "text-indigo-600",
    lightBg: "bg-indigo-100",
    lightText: "text-indigo-600",
  },
  violet: {
    bg: "bg-violet-500",
    hoverBg: "hover:bg-violet-600",
    text: "text-violet-600",
    lightBg: "bg-violet-100",
    lightText: "text-violet-600",
  },
};

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState("Standard");

  const getColorClasses = (color: string, selected: boolean) => {
    const c = colorClasses[color as keyof typeof colorClasses];
    return selected ? `${c.bg} text-white` : `${c.text} hover:bg-gray-50`;
  };

  const getCardClasses = (plan: Plan) => {
    const baseClasses =
      "relative rounded-xl shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1";
    return plan.popular
      ? `${baseClasses} border-indigo-300 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 scale-105`
      : `${baseClasses} border-gray-200 bg-white hover:border-gray-300`;
  };

  return (
    <section className="py-14 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Custom Tabs */}
        <Tabs value={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-gray-200">
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 min-w-[110px] justify-center
                    ${getColorClasses(plan.color, selectedPlan === plan.name)}
                  `}
                >
                  {plan.icon}
                  {plan.name}
                  {plan.badge && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      {plan.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {plans.map((plan) => (
            <TabsContent key={plan.name} value={plan.name} className="mt-0">
              <div className="max-w-lg mx-auto">
                <Card className={getCardClasses(plan)}>
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div
                          className={`${
                            colorClasses[
                              plan.color as keyof typeof colorClasses
                            ].lightBg
                          } p-2 rounded-full`}
                        >
                          {plan.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {plan.name} Plan
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2">
                          {plan.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              ${plan.originalPrice}
                            </span>
                          )}
                          <span
                            className={`text-3xl font-bold ${
                              colorClasses[
                                plan.color as keyof typeof colorClasses
                              ].text
                            }`}
                          >
                            ${plan.price}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">per trip</span>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {plan.deliveryTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {plan.revisions}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              feature.included
                                ? `${
                                    colorClasses[
                                      plan.color as keyof typeof colorClasses
                                    ].lightBg
                                  } ${
                                    colorClasses[
                                      plan.color as keyof typeof colorClasses
                                    ].lightText
                                  }`
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {feature.included ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              feature.included
                                ? "text-gray-700 font-medium"
                                : "text-gray-400 line-through"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Stripe Payment Button with plan color */}
                    <BookTourButton
                      teacherId="123"
                      teacherName="Travel Guide"
                      amount={plan.price}
                      name={
                        plan.popular ? "Get Started Now" : "Select This Plan"
                      }
                      className={`w-full cursor-pointer py-3 px-5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow ${
                        colorClasses[plan.color as keyof typeof colorClasses].bg
                      } text-white ${
                        colorClasses[plan.color as keyof typeof colorClasses]
                          .hoverBg
                      }`}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
