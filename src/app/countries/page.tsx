import Link from "next/link";
import { MapPin, Clock, ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"></div>
      <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-amber-100/30 blur-3xl"></div>

      {/* Floating icons */}
      <div className="absolute top-20 right-[20%] animate-float opacity-20">
        <MapPin className="h-12 w-12 text-blue-500" />
      </div>
      <div className="absolute bottom-32 left-[15%] animate-float-delayed opacity-20">
        <Globe className="h-16 w-16 text-emerald-500" />
      </div>

      <div className="container relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-extrabold text-amber-500 mb-6 animate-pulse">
              🚧
            </h1>

            <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              Exciting Destinations Coming Soon
            </h1>
            <div className="h-1 w-24 mx-auto my-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We&lsquo;re crafting extraordinary travel experiences for this
              destination. Our team of experts is curating the best local
              insights just for you.
            </p>
          </div>

          <div className="backdrop-blur-sm bg-white/70 border border-gray-100 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-6 p-3 bg-blue-50 rounded-lg text-blue-700">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Under active development</span>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Our travel experts are researching hidden gems, local favorites,
                and must-see attractions to create the ultimate guide for your
                journey.
              </p>

              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Local Tips</p>
                  <p className="font-semibold text-blue-700">Coming</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Attractions</p>
                  <p className="font-semibold text-emerald-700">Coming</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Itineraries</p>
                  <p className="font-semibold text-amber-700">Coming</p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
              >
                <Link href="/" className="flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
