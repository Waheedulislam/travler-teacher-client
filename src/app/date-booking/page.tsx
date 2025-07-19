"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { countries } from "@/components/data/country";
import NMContactComponents from "@/components/ui/core/NMContactComponents/NMContactComponents";

// Price ranges starting from $5
const priceRanges = [
  { label: "$5 - $10", value: "5-10" },
  { label: "$10 - $20", value: "10-20" },
  { label: "$20 - $50", value: "20-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200+", value: "200+" },
];

export default function SearchWithCountries() {
  const router = useRouter();

  const [date, setDate] = useState<Date>();
  const [country, setCountry] = useState("");
  const [pricePreset, setPricePreset] = useState("5-10");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter countries based on searchTerm
  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setLoading(true);

    // Determine price filter: if custom inputs filled, use those, else use preset
    const priceFilter =
      minPrice.trim() !== "" && maxPrice.trim() !== ""
        ? `${minPrice}-${maxPrice}`
        : pricePreset;

    const filters = {
      country,
      date: date?.toISOString(),
      price: priceFilter,
    };

    console.log("Filters applied:", filters);

    setTimeout(() => {
      setLoading(false);
      router.push("/teacher");
    }, 800);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="bg-gradient-to-br my-20 py-20 from-white to-gray-50 p-6 rounded-3xl shadow-2xl mx-auto relative overflow-hidden border border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Country dropdown */}
          <div>
            <label className="text-sm font-semibold flex gap-2 items-center mb-1">
              <MapPin className="h-4 w-4 text-teal-600" /> Location
            </label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="mt-1 border rounded-lg p-3">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="p-2">
                {/* Search input */}
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent dropdown close on input click
                  className="mb-2 w-full p-2 border rounded text-sm"
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

          {/* Price selection */}
          <div>
            <label className="text-sm font-semibold flex gap-2 items-center mb-1">
              <DollarSign className="h-4 w-4 text-teal-600" /> Price Range
            </label>

            {/* Preset dropdown */}
            <Select
              value={pricePreset}
              onValueChange={(val) => {
                setPricePreset(val);
                // Clear custom inputs when preset changes
                setMinPrice("");
                setMaxPrice("");
              }}
            >
              <SelectTrigger className="mt-1 border rounded-lg p-3">
                <SelectValue placeholder="Choose range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Custom price inputs */}
            <div className="flex items-center gap-3 mt-3">
              <input
                type="number"
                min={0}
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  if (e.target.value.trim() !== "") setPricePreset(""); // Clear preset if custom price entered
                }}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-gray-500 font-semibold">-</span>
              <input
                type="number"
                min={0}
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  if (e.target.value.trim() !== "") setPricePreset(""); // Clear preset if custom price entered
                }}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            {/* Validation hint */}
            {minPrice !== "" && maxPrice !== "" && +minPrice > +maxPrice && (
              <p className="text-xs text-red-500 mt-1">
                Min price should not exceed Max price.
              </p>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-sm font-semibold flex gap-2 items-center mb-1">
              <CalendarDays className="h-4 w-4 text-teal-600" /> Select Date
            </label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="mt-1 w-full flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 text-left text-gray-700 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <CalendarDays className="h-5 w-5 text-teal-600" />
                  <span className="flex-1">
                    {date ? format(date, "PPP") : "Pick a date"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border border-gray-200 shadow-lg">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl"
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

        {/* Quick Filters */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-medium text-gray-700">
              Quick Filters:
            </span>
            {[
              "Online Classes",
              "Native Speakers",
              "Certified Teachers",
              "Group Classes",
            ].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="rounded-full border-teal-300 text-teal-700 bg-teal-50/50 hover:bg-teal-100 hover:border-teal-400 transition-colors duration-200"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Contact Section */}
      <NMContactComponents />
    </div>
  );
}
