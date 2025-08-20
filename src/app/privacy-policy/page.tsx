import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Page Header */}
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-yellow-400/10 blur-3xl rounded-full transform -translate-y-8"></div>
          <div className="relative">
            <div className="inline-block px-4 py-2 bg-yellow-400/20 rounded-full text-yellow-800 text-sm font-medium mb-4">
              Legal Document
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p>Last Updated: January 20, 2025</p>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-yellow-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welcome to Your Privacy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                  Travel to Your Teacher
                </span>
                . Your privacy is very important to us. This Privacy Policy
                describes how we collect, use, and safeguard your personal
                information when you use our website and services.
              </p>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-8 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
              Information We Collect
            </h2>
          </div>
          <div className="pl-11 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
            <p className="text-gray-700 leading-relaxed">
              We may collect details such as your name, email address, and login
              data when you sign in using third-party services like Google or
              Facebook. Additionally, we may collect browsing activity,
              preferences, and interactions with our platform to improve your
              travel experience.
            </p>
          </div>
        </section>

        {/* How We Use */}
        <section className="mb-8 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
              How We Use Your Information
            </h2>
          </div>
          <div className="pl-11 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
            <ul className="space-y-3">
              {[
                "Provide and improve our travel services",
                "Personalize your user experience",
                "Send booking confirmations and travel updates",
                "Respond to customer inquiries and support requests",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Third-Party */}
        <section className="mb-8 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
              Third-Party Authentication
            </h2>
          </div>
          <div className="pl-11 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
            <p className="text-gray-700 leading-relaxed">
              Our platform uses trusted providers such as Google and Facebook
              for login authentication. We do{" "}
              <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                not
              </span>{" "}
              store your passwords or any highly sensitive personal details.
            </p>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-8 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
              Data Protection
            </h2>
          </div>
          <div className="pl-11 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your
              information. However, please note that no method of transmission
              over the internet or electronic storage is 100% secure.
            </p>
          </div>
        </section>

        {/* Changes */}
        <section className="mb-8 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">5</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
              Changes to This Policy
            </h2>
          </div>
          <div className="pl-11 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. All updates
              will be posted on this page with a revised &rdquo;Last
              Updated&rdquo; date.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
              Contact Us
            </h2>
          </div>
          <div className="pl-11 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, feel free to
              reach out to us at:{" "}
              <a
                href="mailto:support@tour-travler.com"
                className="inline-flex items-center gap-2 text-yellow-700 font-medium hover:text-yellow-800 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@tour-travler.com
              </a>
            </p>
          </div>
        </section>

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
              Questions About Your Privacy?
            </p>
            <p className="text-yellow-100 mb-4">
              We&#39;re here to help and ensure your data is protected.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
