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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import EnhancedCalendar from "./calenderAndDate";

const countries = [
  { value: "sen-martin", label: "Sen Martin" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];

const priceRanges = [
  { value: "800-1000", label: "$800 - $1000" },
  { value: "500-800", label: "$500 - $800" },
  { value: "1000-1500", label: "$1000 - $1500" },
  { value: "1500-2000", label: "$1500 - $2000" },
  { value: "2000+", label: "$2000+" },
];

export default function EnhancedSearchComponent() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCountry, setSelectedCountry] = useState("sen-martin");
  const [selectedPriceRange, setSelectedPriceRange] = useState("800-1000");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/teacher");
    }, 1000);
  };

  const sharedTriggerStyle =
    "h-14 w-full rounded-xl border-2 border-[#1E93A6]/20 bg-white/80 backdrop-blur-sm hover:border-[#1E93A6]/40 transition-all duration-200 focus:border-[#1E93A6] focus:ring-2 focus:ring-[#1E93A6]/20 px-4";

  return (
    <div className="w-full mx-auto p-4">
      <Card className="bg-gradient-to-r my-20 py-20 from-[#e0f7fa] via-white to-[#fff3e0] p-6 rounded-2xl shadow-xl max-w-5xl mx-auto relative overflow-hidden border border-white/50">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E93A6]/5 to-[#FF8926]/5" />
        <div className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Location */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1E93A6]" />
                Location
              </label>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className={sharedTriggerStyle}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-[#1E93A6]/10">
                      <MapPin className="h-4 w-4 text-[#1E93A6]" />
                    </div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-[#1E93A6]/20 ">
                  {countries.map((country) => (
                    <SelectItem
                      key={country.value}
                      value={country.value}
                      className="rounded-lg"
                    >
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#1E93A6]" />
                Price Range
              </label>
              <Select
                value={selectedPriceRange}
                onValueChange={setSelectedPriceRange}
              >
                <SelectTrigger className={sharedTriggerStyle}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-[#1E93A6]/10">
                      <DollarSign className="h-4 w-4 text-[#1E93A6]" />
                    </div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-[#1E93A6]/20">
                  {priceRanges.map((range) => (
                    <SelectItem
                      key={range.value}
                      value={range.value}
                      className="rounded-lg"
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#1E93A6]" />
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
                      <div className="p-2 rounded-lg bg-[#1E93A6]/10">
                        <CalendarDays className="h-4 w-4 text-[#1E93A6]" />
                      </div>
                      <span className="font-medium">
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Pick a date"}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-xl border-2 border-[#1E93A6]/20"
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

            {/* Search Button with Spinner */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-transparent select-none">
                Action
              </label>
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="h-14 w-full bg-gradient-to-r from-[#FF700B] via-[#FF8926] to-[#FDC90C] hover:from-[#FF700B]/90 hover:via-[#FF8926]/90 hover:to-[#FDC90C]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
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

          {/* Quick Filters */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium text-gray-600 mb-2">
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
                  className="rounded-full border-[#1E93A6]/30 text-[#1E93A6] hover:bg-[#1E93A6]/10"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <EnhancedCalendar />
    </div>
  );
}
