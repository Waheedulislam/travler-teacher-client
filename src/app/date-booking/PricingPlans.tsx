import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Star } from "lucide-react";
import BookTourButton from "@/components/StripePaymentButton/StripePaymentButton";

const plans = [
  {
    name: "Basic",
    price: 199.99,
    popular: false,
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
    popular: true,
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
    popular: false,
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

export default function PricingPlans() {
  return (
    <section className="pb-16 ">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative rounded-3xl shadow-xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular
                  ? "border-yellow-400 bg-gradient-to-b from-yellow-50 to-white scale-105"
                  : "border-yellow-200 bg-white hover:border-yellow-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardContent className="p-8 flex flex-col h-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 text-lg"> /trip</span>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto"></div>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          feature.included
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={`text-base leading-relaxed ${
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

                {/* FIX: Use only BookTourButton, pass price */}
                <BookTourButton
                  teacherId="123" // dynamic value dite paro later
                  teacherName="Travel Guide"
                  amount={plan.price}
                  name={plan.popular ? "Get Started Now" : "Select Plan"}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ✨ 30-day money-back guarantee • No hidden fees • Cancel anytime
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
            <span>🏆 Award-winning service</span>
            <span>🌟 10,000+ happy travelers</span>
            <span>🔒 Secure payment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
