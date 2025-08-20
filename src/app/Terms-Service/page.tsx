import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Shield, CreditCard, AlertTriangle, Phone } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: <Shield className="w-5 h-5" />,
      content: `By accessing or using our platform Travel To Your Teacher, you agree to comply with these Terms of Service. If you do not agree, please discontinue using our services.`,
    },
    {
      id: 2,
      title: "Use of Services",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `You agree to use our website only for lawful purposes. Misuse, fraudulent activities, or abusive behavior may result in suspension or termination.`,
    },
    {
      id: 3,
      title: "Bookings & Payments",
      icon: <CreditCard className="w-5 h-5" />,
      content: `All bookings with teachers are subject to availability. Payments must be made securely through our approved payment gateways.`,
    },
    {
      id: 4,
      title: "Limitation of Liability",
      icon: <Shield className="w-5 h-5" />,
      content: `We are not liable for any indirect damages, travel delays, or issues caused by third-party service providers.`,
    },
    {
      id: 5,
      title: "Contact Us",
      icon: <Phone className="w-5 h-5" />,
      content: `For any questions regarding these Terms, contact us at: support@tour-travler.com`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Legal Documentation
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Last Updated: January 20, 2025
          </p>
        </div>

        {/* Introduction Card */}
        <Card className="mb-12 border-yellow-300 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Welcome to Travel To Your Teacher
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms govern your use of our educational travel
                  platform. By using our services, you agree to these terms and
                  our commitment to providing safe, reliable educational
                  experiences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="group hover:shadow-lg transition-all duration-300 border border-yellow-200 hover:border-yellow-400"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-700 border-yellow-300 px-3 py-2 text-lg font-bold"
                    >
                      {section.id}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-100 p-2 rounded-lg group-hover:bg-yellow-200 transition-colors">
                        {React.cloneElement(section.icon, {
                          className: "w-5 h-5 text-yellow-600",
                        })}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                        {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {section.content.includes(
                          "support@tour-travler.com"
                        ) ? (
                          <>
                            For any questions regarding these Terms, contact us
                            at:{" "}
                            <a
                              href="mailto:support@tour-travler.com"
                              className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors underline decoration-yellow-400 hover:decoration-yellow-600"
                            >
                              support@tour-travler.com
                            </a>
                          </>
                        ) : (
                          section.content
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <Card className="mt-16 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Questions About These Terms?
              </h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our legal team is here to help clarify any questions you may have
              about these terms of service. We&lsquo;re committed to
              transparency and clear communication.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
