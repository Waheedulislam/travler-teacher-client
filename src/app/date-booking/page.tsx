"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, DollarSign, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/components/data/country";
import NMContactComponents from "@/components/ui/core/NMContactComponents/NMContactComponents";
import PricingPlans from "./PricingPlans";

export default function SearchWithCountries() {
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [pricePreset, setPricePreset] = useState("any");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setLoading(true);

    const filters = new URLSearchParams({
      country: country || "",
      budget: pricePreset || "any",
    });

    setTimeout(() => {
      setLoading(false);
      router.push(`/teacher?${filters.toString()}`);
    }, 500);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Choose Your Adventure
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Travel Plans That Fit
          <span className="text-yellow-600"> Your Dreams</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From budget-friendly basics to premium luxury experiences, find the
          perfect plan for your next adventure.
        </p>
      </div>

      <Card className="bg-gradient-to-br my-20 py-20 from-white to-gray-50 p-6 rounded-3xl shadow-2xl mx-auto relative overflow-hidden border border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Country dropdown */}
          <div>
            <label className="text-sm font-semibold flex gap-2 items-center mb-1 ">
              <MapPin className="h-4 w-4 text-teal-600" /> Location
            </label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="mt-1 border rounded-lg p-3 w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>

              <SelectContent className="p-2">
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="mb-2 w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <div
                  className="max-h-48 overflow-y-auto border border-gray-200 rounded"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {filteredCountries.length ? (
                    filteredCountries.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                        className="rounded hover:bg-gray-100"
                      >
                        {c}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500 select-none">
                      No countries found.
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Selection */}
          <div>
            <label className="text-sm font-semibold flex gap-2 items-center mb-1">
              <DollarSign className="h-4 w-4 text-teal-600" /> Budget
            </label>

            <Select value={pricePreset} onValueChange={setPricePreset}>
              <SelectTrigger className="mt-1 border rounded-lg p-3 w-full">
                <SelectValue placeholder="Choose budget" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="any">Any Budget</SelectItem>
                <SelectItem value="5-25">$5 – $25</SelectItem>
                <SelectItem value="25-50">$25 – $50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-500 transition-all duration-300"
            >
              {loading ? (
                "Searching..."
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find Teachers
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* PricingPlans */}
      <PricingPlans />

      {/* Contact Section */}
      <NMContactComponents />
    </div>
  );
}
