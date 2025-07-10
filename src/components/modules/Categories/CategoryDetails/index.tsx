import type { ICategory } from "@/types/category";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Tag,
  Info,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CategoryDetails = ({ category }: { category: ICategory }) => {
  // Format dates for better readability
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fallback image in case category.image is missing or invalid
  const imageSrc = category?.image || "/placeholder.svg?height=400&width=600";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-50 to-violet-100 py-12 px-4">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Header Section with Clean Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-200 via-pink-200 to-teal-200 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-xl">
                <div className="relative h-80 w-full rounded-xl overflow-hidden">
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt={`${category?.title || "Category"} category image`}
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>

                {/* Image Badge */}
                <div className="absolute top-6 right-6">
                  <Badge className="bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200 shadow-lg hover:bg-white transition-all duration-300">
                    <Tag className="h-3 w-3 mr-1" />
                    Category Image
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Title and Info Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-0 px-3 py-1">
                  Featured Category
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-violet-700 to-teal-700 bg-clip-text text-transparent">
                  {category?.title}
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                {category?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Created</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {formatDate(category?.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Updated</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {formatDate(category?.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-teal-400 rounded-full"></div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* country Information Card */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transition-all duration-500">
            <div className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-lg">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                    Country Details
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Complete information about this country
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Country ID
                  </dt>
                  <dd className="text-lg font-mono bg-gradient-to-r from-slate-50 to-violet-50 rounded-2xl px-6 py-4 border-l-4 border-violet-400 group-hover:border-violet-600 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">{category?._id}</span>
                      <span className="text-xs text-violet-500 font-sans">
                        Unique Identifier
                      </span>
                    </div>
                  </dd>
                </div>

                <div className="group">
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
                    <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full mr-2"></span>
                    Title
                  </dt>
                  <dd className="text-2xl font-semibold bg-gradient-to-r from-slate-50 to-fuchsia-50 rounded-2xl px-6 py-4 border-l-4 border-fuchsia-400 group-hover:border-fuchsia-600 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="bg-gradient-to-r from-slate-800 to-fuchsia-900 bg-clip-text text-transparent">
                        {category?.title}
                      </span>
                      <span className="text-xs text-fuchsia-500 font-sans font-normal">
                        Display Name
                      </span>
                    </div>
                  </dd>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <Badge className="bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 hover:from-violet-200 hover:to-fuchsia-200 transition-all duration-300 px-4 py-2 text-xs font-medium">
                  <Sparkles className="h-3 w-3 mr-1 text-fuchsia-500" />
                  Premium Content
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="bg-white/70 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transition-all duration-500">
            <div className="h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500"></div>
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-700 via-emerald-700 to-green-700 bg-clip-text text-transparent">
                    Timeline
                  </h2>
                  <p className="text-slate-500 text-sm">
                    History and activity timeline
                  </p>
                </div>
              </div>

              <div className="relative pl-12 space-y-12 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-teal-300 before:to-emerald-300">
                {/* Creation Timeline */}
                <div className="relative">
                  <div className="absolute -left-12 top-0 w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-teal-400">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-teal-800 text-lg">
                        Country Created
                      </h3>
                      <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                        Initial
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">
                      {formatDate(category?.createdAt)}
                    </p>
                    <p className="text-sm text-slate-500 bg-white/50 rounded-xl px-4 py-2 inline-block">
                      This country was first added to the system on this date
                    </p>
                  </div>
                </div>

                {/* Update Timeline */}
                <div className="relative">
                  <div className="absolute -left-12 top-0 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-emerald-400">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-emerald-800 text-lg">
                        Last Updated
                      </h3>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                        Recent
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">
                      {formatDate(category?.updatedAt)}
                    </p>
                    <p className="text-sm text-slate-500 bg-white/50 rounded-xl px-4 py-2 inline-block">
                      The most recent modifications were made on this date
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card className="bg-gradient-to-r from-slate-50/90 to-white/90 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transition-all duration-500 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">
                    Country Status
                  </h3>
                  <p className="text-slate-500">
                    Current availability and metrics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-5 py-2.5 rounded-full shadow-sm">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Active & Available</span>
                </div>
                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors duration-300">
                  <span>View Details</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-pink-500/5 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <CardContent className="p-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-6 w-6 text-fuchsia-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">
                About This Country
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                This category was created on{" "}
                <span className="font-semibold text-violet-700">
                  {formatDate(category?.createdAt)}
                </span>
                , with the most recent updates made on{" "}
                <span className="font-semibold text-fuchsia-700">
                  {formatDate(category?.updatedAt)}
                </span>
                . It represents a key classification in your content
                organization system.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200">
                  Premium
                </Badge>
                <Badge className="bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200">
                  Featured
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryDetails;
