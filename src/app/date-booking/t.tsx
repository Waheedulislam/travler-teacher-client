// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { MapPin, DollarSign, Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { countries } from "@/components/data/country";
// import NMContactComponents from "@/components/ui/core/NMContactComponents/NMContactComponents";
// import PricingPlans from "./PricingPlans";

// export default function SearchWithCountries() {
//   const router = useRouter();

//   const [country, setCountry] = useState("");
//   const [pricePreset, setPricePreset] = useState("any");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const filteredCountries = countries.filter((c) =>
//     c.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearch = () => {
//     setLoading(true);

//     const filters = {
//       country,
//       price: pricePreset,
//     };

//     console.log("Filters applied:", filters);

//     setTimeout(() => {
//       setLoading(false);
//       router.push("/teacher");
//     }, 800);
//   };

//   return (
//     <div className="container mx-auto p-6 ">
//       <Card className="bg-gradient-to-br my-20 py-20 from-white to-gray-50 p-6 rounded-3xl shadow-2xl mx-auto relative overflow-hidden border border-white/50">
//         {/* Top controls */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Country dropdown */}
//           <div>
//             <label className="text-sm font-semibold flex gap-2 items-center mb-1 ">
//               <MapPin className="h-4 w-4 text-teal-600" /> Location
//             </label>
//             <Select value={country} onValueChange={setCountry}>
//               <SelectTrigger className="mt-1 border rounded-lg p-3 w-full">
//                 <SelectValue placeholder="Select country" />
//               </SelectTrigger>

//               <SelectContent className="p-2">
//                 <input
//                   type="text"
//                   placeholder="Search country..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onClick={(e) => e.stopPropagation()}
//                   className="mb-2 w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />

//                 <div
//                   className="max-h-48 overflow-y-auto border border-gray-200 rounded"
//                   style={{ scrollbarWidth: "thin" }}
//                 >
//                   {filteredCountries.length ? (
//                     filteredCountries.map((c) => (
//                       <SelectItem
//                         key={c}
//                         value={c}
//                         className="rounded hover:bg-gray-100"
//                       >
//                         {c}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="px-3 py-2 text-sm text-gray-500 select-none">
//                       No countries found.
//                     </div>
//                   )}
//                 </div>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Budget Selection */}
//           <div>
//             <label className="text-sm font-semibold flex gap-2 items-center mb-1">
//               <DollarSign className="h-4 w-4 text-teal-600" /> Budget
//             </label>

//             <Select value={pricePreset} onValueChange={setPricePreset}>
//               <SelectTrigger className="mt-1 border rounded-lg p-3 w-full">
//                 <SelectValue placeholder="Choose budget" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="any">Any Budget</SelectItem>
//                 <SelectItem value="upto-25">Up to $25</SelectItem>
//                 <SelectItem value="25-50">$25 – $50</SelectItem>
//                 <SelectItem value="50-100">$50 – $100</SelectItem>
//                 <SelectItem value="over-100">Over $100</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Search button */}
//           <div className="flex items-end">
//             <Button
//               onClick={handleSearch}
//               disabled={loading}
//               className="w-full h-14 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-500 transition-all duration-300"
//             >
//               {loading ? (
//                 "Searching..."
//               ) : (
//                 <>
//                   <Search className="w-5 h-5 mr-2" />
//                   Find Teachers
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Quick Filters */}
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <div className="flex flex-wrap gap-3 items-center">
//             <span className="text-sm font-medium text-gray-700">
//               Quick Filters:
//             </span>
//             {[
//               "Online Classes",
//               "Native Speakers",
//               "Certified Teachers",
//               "Group Classes",
//             ].map((filter) => (
//               <Button
//                 key={filter}
//                 variant="outline"
//                 size="sm"
//                 className="rounded-full border-teal-300 text-teal-700 bg-teal-50/50 hover:bg-teal-100 hover:border-teal-400 transition-colors duration-200"
//               >
//                 {filter}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </Card>
//       {/* PricingPlans */}
//       <PricingPlans />

//       {/* Contact Section */}
//       <NMContactComponents />
//     </div>
//   );
// }
