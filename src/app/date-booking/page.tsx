"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "@/components/data/country";
import NMContactComponents from "@/components/ui/core/NMContactComponents/NMContactComponents";

export default function SearchWithCountries() {
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [pricePreset, setPricePreset] = useState("any");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [offerDetails, setOfferDetails] = useState({
    title: "",
    description: "",
    pages: "",
    revisions: "",
    delivery: "",
    price: "",
    expires: "",
    requirements: "",
  });

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setLoading(true);

    const priceFilter =
      pricePreset === "custom" && offerDetails.price
        ? `custom-${offerDetails.price}`
        : pricePreset;

    const filters = {
      country,
      price: priceFilter,
      offerDetails: pricePreset === "custom" ? offerDetails : null,
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
        {/* Top controls */}
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

            <Select
              value={pricePreset}
              onValueChange={(val) => {
                setPricePreset(val);
                if (val === "custom") setIsCustomModalOpen(true);
              }}
            >
              <SelectTrigger className="mt-1 border rounded-lg p-3 w-full">
                <SelectValue placeholder="Choose budget" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="any">Any Budget</SelectItem>
                <SelectItem value="upto-25">Up to $25</SelectItem>
                <SelectItem value="25-50">$25 – $50</SelectItem>
                <SelectItem value="50-100">$50 – $100</SelectItem>
                <SelectItem value="over-100">Over $100</SelectItem>
                <SelectItem value="custom">Set Custom Price</SelectItem>
              </SelectContent>
            </Select>

            {/* Modal for Custom Offer */}
            <Dialog
              open={isCustomModalOpen}
              onOpenChange={setIsCustomModalOpen}
            >
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-xl">
                <DialogHeader className="pb-4 mb-4 border-b border-gray-200">
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    Create a Custom Offer
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  {/* Offer Title */}
                  <div>
                    <Label
                      htmlFor="offer-title"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Tour Offer Title
                    </Label>
                    <Input
                      id="offer-title"
                      value={offerDetails.title}
                      onChange={(e) =>
                        setOfferDetails({
                          ...offerDetails,
                          title: e.target.value,
                        })
                      }
                      placeholder="Adventure title"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label
                      htmlFor="description"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Tour Overview & What’s Included
                    </Label>
                    <Textarea
                      id="description"
                      value={offerDetails.description}
                      onChange={(e) =>
                        setOfferDetails({
                          ...offerDetails,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the tour, what's included, and details."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 min-h-[100px]"
                    />
                  </div>

                  {/* Pages & Revisions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="pages"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Number of Tour Days
                      </Label>
                      <Input
                        id="pages"
                        type="number"
                        min="1"
                        value={offerDetails.pages}
                        onChange={(e) =>
                          setOfferDetails({
                            ...offerDetails,
                            pages: e.target.value,
                          })
                        }
                        placeholder="e.g. 5"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="revisions"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Adjustments Allowed (optional)
                      </Label>
                      <Input
                        id="revisions"
                        type="number"
                        min="0"
                        value={offerDetails.revisions}
                        onChange={(e) =>
                          setOfferDetails({
                            ...offerDetails,
                            revisions: e.target.value,
                          })
                        }
                        placeholder="e.g. 2"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Delivery & Expires */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="delivery"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Tour Start Date
                      </Label>
                      <Input
                        id="delivery"
                        type="number"
                        min="1"
                        value={offerDetails.delivery}
                        onChange={(e) =>
                          setOfferDetails({
                            ...offerDetails,
                            delivery: e.target.value,
                          })
                        }
                        placeholder="e.g. 7"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="expires"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Offer Expires In (days)
                      </Label>
                      <Input
                        id="expires"
                        type="number"
                        min="1"
                        value={offerDetails.expires}
                        onChange={(e) =>
                          setOfferDetails({
                            ...offerDetails,
                            expires: e.target.value,
                          })
                        }
                        placeholder="e.g. 5"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <Label
                      htmlFor="price"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Total Tour Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="5"
                      value={offerDetails.price}
                      onChange={(e) =>
                        setOfferDetails({
                          ...offerDetails,
                          price: e.target.value,
                        })
                      }
                      placeholder="e.g. 200"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <Label
                      htmlFor="requirements"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Traveler Requirements / Preferences
                    </Label>
                    <Textarea
                      id="requirements"
                      value={offerDetails.requirements}
                      onChange={(e) =>
                        setOfferDetails({
                          ...offerDetails,
                          requirements: e.target.value,
                        })
                      }
                      placeholder="What do you need from the buyer?"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 min-h-[100px]"
                    />
                  </div>
                </div>

                <DialogFooter className="pt-4 mt-4 border-t border-gray-200 flex justify-end">
                  <Button
                    onClick={() => {
                      console.log("Custom Offer Submitted:", offerDetails);
                      setIsCustomModalOpen(false);
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-2 px-6 rounded-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-300"
                  >
                    Submit Offer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
