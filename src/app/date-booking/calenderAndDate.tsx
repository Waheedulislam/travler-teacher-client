"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { Calendar as DayPicker } from "@/components/ui/calendar";

// Mock data for calendar events
const calendarEvents = [
  { date: new Date(), count: 3, type: "available" },
  { date: addDays(new Date(), 1), count: 5, type: "available" },
  { date: addDays(new Date(), 2), count: 2, type: "limited" },
  { date: addDays(new Date(), 5), count: 8, type: "available" },
  { date: addDays(new Date(), 7), count: 1, type: "limited" },
  { date: addDays(new Date(), 10), count: 6, type: "available" },
  { date: addDays(new Date(), 12), count: 0, type: "booked" },
  { date: addDays(new Date(), 15), count: 4, type: "available" },
];

export default function EnhancedCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCountry, setSelectedCountry] = useState("sen-martin");
  const [selectedPriceRange, setSelectedPriceRange] = useState("800-1000");
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getEventForDate = (date: Date) => {
    return calendarEvents.find((event) => isSameDay(event.date, date));
  };

  const handleSearch = () => {
    console.log({
      country: selectedCountry,
      priceRange: selectedPriceRange,
      date: selectedDate,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border-0 ring-1 ring-white/20 overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#1E93A6] to-[#FF8926] bg-clip-text text-transparent">
                Calendar
              </h2>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-[#1E93A6]/10 to-[#FF8926]/10 text-[#1E93A6] border-0 px-4 py-2 text-sm font-semibold"
              >
                {format(currentMonth, "MMMM yyyy")}
              </Badge>
            </div>

            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as any)}
              className="w-auto"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-100/80 p-1">
                <TabsTrigger
                  value="month"
                  className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="text-sm sm:text-base">Month View</span>
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-sm sm:text-base">Week View</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {viewMode === "month" ? (
            /* Month View Calendar */
            <div className="space-y-6">
              {/* Month Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-4 sm:p-6 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="rounded-xl border-2 border-gray-200 hover:border-[#1E93A6]/40 hover:bg-[#1E93A6]/5 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Previous
                </Button>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  {format(currentMonth, "MMMM yyyy")}
                </h3>

                <Button
                  variant="outline"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="rounded-xl border-2 border-gray-200 hover:border-[#1E93A6]/40 hover:bg-[#1E93A6]/5 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Enhanced Calendar Component */}
              <div className="overflow-x-auto">
                <div className="min-w-[320px] sm:min-w-[700px] bg-gradient-to-br from-white to-blue-50/20 rounded-3xl p-6 sm:p-8 shadow-inner border border-gray-100">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    disabled={(date) => date < new Date()}
                    className="w-full"
                    modifiers={{
                      hasEvent: (date) => !!getEventForDate(date),
                      today: (date) => isSameDay(date, new Date()),
                    }}
                    modifiersClassNames={{
                      hasEvent: "has-event",
                      today: "day-today",
                    }}
                    classNames={{
                      months:
                        "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4 w-full",
                      caption:
                        "flex justify-center pt-1 relative items-center mb-6",
                      caption_label:
                        "text-xl sm:text-2xl font-bold text-gray-800",
                      nav: "space-x-1 flex items-center",
                      nav_button:
                        "h-10 w-10 sm:h-12 sm:w-12 bg-white rounded-xl border-2 border-gray-200 hover:border-[#1E93A6]/40 hover:bg-[#1E93A6]/5 transition-all duration-300 shadow-md hover:shadow-lg",
                      nav_button_previous: "absolute left-0",
                      nav_button_next: "absolute right-0",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex mb-4",
                      head_cell:
                        "text-gray-600 rounded-xl w-full font-bold text-sm sm:text-base text-center py-3 bg-gradient-to-r from-gray-50 to-blue-50/30 mx-1",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm sm:text-base focus-within:relative focus-within:z-20 mx-1 first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl",
                      day: "h-14 w-full sm:h-16 font-semibold rounded-xl border-2 border-transparent hover:border-[#1E93A6]/30 hover:bg-[#1E93A6]/5 transition-all duration-300 flex items-center justify-center relative overflow-hidden group",
                      day_selected:
                        "bg-gradient-to-br from-[#1E93A6] to-[#FF8926] text-white border-[#1E93A6] shadow-lg hover:shadow-xl",
                      day_today:
                        "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-800 border-amber-300 font-bold shadow-inner",
                      day_outside: "opacity-40",
                      day_disabled: "opacity-40 pointer-events-none",
                      day_range_middle: "rounded-none",
                      day_range_start: "rounded-l-xl",
                      day_range_end: "rounded-r-xl",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Week View */
            <div className="overflow-x-auto">
              <div className="min-w-[320px] sm:min-w-[700px] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 rounded-3xl bg-gradient-to-br from-white to-blue-50/20 p-6 shadow-inner border border-gray-100">
                {weekDays.map((day) => {
                  const event = getEventForDate(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentDay = isToday(day);

                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 cursor-pointer select-none rounded-xl border-2 p-4 hover:shadow-md transition-shadow duration-300",
                        isSelected
                          ? "bg-gradient-to-br from-[#1E93A6] to-[#FF8926] text-white border-[#1E93A6]"
                          : "border-gray-200 bg-white",
                        isCurrentDay &&
                          !isSelected &&
                          "bg-amber-100 text-amber-800 font-bold border-amber-300 shadow-inner"
                      )}
                      title={`Date: ${format(day, "PPP")}${
                        event ? ` - ${event.count} event(s)` : ""
                      }`}
                    >
                      <div className="text-base sm:text-lg font-semibold">
                        {format(day, "EEEE")}
                      </div>
                      <div className="text-lg sm:text-xl font-bold">
                        {format(day, "d")}
                      </div>
                      {event && (
                        <Badge
                          variant={
                            event.type === "limited"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs sm:text-sm px-2 py-0.5"
                        >
                          {event.count} events
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1E93A6] transition"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="sen-martin">Sen Martin</option>
                <option value="morocco">Morocco</option>
                <option value="guinea">Guinea</option>
                <option value="sierra-leone">Sierra Leone</option>
              </select>

              <select
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1E93A6] transition"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="800-1000">800-1000$</option>
                <option value="1000-1200">1000-1200$</option>
                <option value="1200-1400">1200-1400$</option>
              </select>
            </div>

            <Button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-gradient-to-r from-[#1E93A6] to-[#FF8926] text-white rounded-xl px-6 py-3 hover:brightness-110 transition"
            >
              <CalendarDays className="h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
