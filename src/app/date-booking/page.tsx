"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Search,
  Mail,
  Globe,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// 🌍 Full Country List
const countries = [
  { value: "afghanistan", label: "Afghanistan" },
  { value: "australia", label: "Australia" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "brazil", label: "Brazil" },
  { value: "canada", label: "Canada" },
  { value: "china", label: "China" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "india", label: "India" },
  { value: "italy", label: "Italy" },
  { value: "japan", label: "Japan" },
  { value: "mexico", label: "Mexico" },
  { value: "nepal", label: "Nepal" },
  { value: "netherlands", label: "Netherlands" },
  { value: "pakistan", label: "Pakistan" },
  { value: "sen-martin", label: "Sen Martin" },
  { value: "spain", label: "Spain" },
  { value: "sri-lanka", label: "Sri Lanka" },
  { value: "switzerland", label: "Switzerland" },
  { value: "thailand", label: "Thailand" },
  { value: "uae", label: "UAE" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
];

const priceRanges = [
  { value: "200-300", label: "$200 - $300" },
  { value: "500-600", label: "$500 - $600" },
  { value: "700-800", label: "$700 - $800" },
  { value: "800-900", label: "$800 - $900" },
  { value: "1000-1500", label: "$1000 - $1500" },
  { value: "1500-2000", label: "$1500 - $2000" },
  { value: "2000+", label: "$2000+" },
];

export default function EnhancedSearchComponent() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCountry, setSelectedCountry] = useState("sen-martin");
  const [selectedPriceRange, setSelectedPriceRange] = useState("800-900");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sharedTriggerStyle =
    "h-14 w-full rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm hover:border-gray-300 transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 px-4 shadow-sm";

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/teacher");
    }, 1000);
  };

  return (
    <div className="w-full mx-auto p-4">
      <Card className="bg-gradient-to-br my-20 py-20 from-white to-gray-50 p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto relative overflow-hidden border border-white/50">
        {/* Subtle background overlay for visual interest */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-orange-400/5" />
        <div className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* 🌍 Location with Searchable Dropdown */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-600" />
                Location
              </label>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className={sharedTriggerStyle}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <MapPin className="h-4 w-4 text-teal-600" />
                    </div>
                    <SelectValue placeholder="Select a country" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-gray-200 max-h-[300px] overflow-y-auto p-2 space-y-2 shadow-lg">
                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/40 mb-2 text-sm"
                    onChange={(e) => {
                      const query = e.target.value.toLowerCase();
                      const items = document.querySelectorAll(
                        ".country-select-item"
                      ) as NodeListOf<HTMLDivElement>;
                      items.forEach((item) => {
                        const match = item.textContent
                          ?.toLowerCase()
                          .includes(query);
                        item.style.display = match ? "block" : "none";
                      });
                    }}
                  />
                  {countries.map((country) => (
                    <SelectItem
                      key={country.value}
                      value={country.value}
                      className="rounded-lg country-select-item hover:bg-gray-100 focus:bg-gray-100"
                    >
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 💰 Price Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-teal-600" />
                Price Range
              </label>
              <Select
                value={selectedPriceRange}
                onValueChange={setSelectedPriceRange}
              >
                <SelectTrigger className={sharedTriggerStyle}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <DollarSign className="h-4 w-4 text-teal-600" />
                    </div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-gray-200 shadow-lg">
                  {priceRanges.map((range) => (
                    <SelectItem
                      key={range.value}
                      value={range.value}
                      className="rounded-lg hover:bg-gray-100 focus:bg-gray-100"
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 📅 Date */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-teal-600" />
                Select Date
              </label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      sharedTriggerStyle,
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <CalendarDays className="h-4 w-4 text-teal-600" />
                      </div>
                      <span className="font-medium text-gray-800">
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Pick a date"}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-xl border border-gray-200 shadow-lg"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="rounded-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 🔍 Search Button */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-transparent select-none">
                Action
              </label>
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="h-14 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Find Teacher
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* ✅ Quick Filters */}
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
        </div>
      </Card>
      {/* Contact Section */}
      <Card className="mt-16 bg-gradient-to-r  border-0 shadow-xl">
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
            experts are here to help you plan the perfect virtual adventure with
            local guides from around the globe.
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
  );
}
