"use client";
import type { ITeacher } from "@/types";
import Image from "next/image";
import { MapPin, Award, Globe, Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BookTourButton from "@/components/StripePaymentButton/StripePaymentButton";

const extractPrice = (desc?: string) => {
  if (!desc) return null;

  return desc.replace(/^from\s+/i, "").trim();
};

const extractAmountNumber = (desc?: string): number => {
  if (!desc) return 0;
  const match = desc.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const TeacherDetails = ({ teacher }: { teacher: ITeacher }) => {
  const priceText = extractPrice(teacher.description);
  const amount = extractAmountNumber(teacher.description);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Image and quick info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={teacher?.image || "/placeholder.svg"}
                alt={`${teacher?.name}'s profile picture`}
                width={500}
                height={500}
                className="w-full object-cover h-80"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h1 className="text-2xl font-bold text-white">
                  {teacher?.name}
                </h1>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 text-white mr-1" />
                  <span className="text-white text-sm">{teacher?.country}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={teacher?.countryImage || "/placeholder.svg"}
                    alt={`${teacher?.country} flag`}
                    width={24}
                    height={16}
                    className="rounded border mr-2"
                  />
                  <span className="text-sm font-medium">
                    {teacher?.country}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="ml-auto text-blue-600 border-blue-600"
                >
                  Verified Guide
                </Badge>
              </div>

              <div className="space-y-3 mt-4 text-muted-foreground text-sm">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-blue-500" />
                  <span>5+ Years Guiding Experience</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-blue-500" />
                  <span>English, Spanish</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Email for Booking</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Available Year Round</span>
                </div>
              </div>

              {/* Price Section */}
              {/* Price Section */}
              <div className="mt-6 mb-6">
                <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 shadow-sm">
                  <span className="text-sm text-gray-600 font-medium">
                    Starting From:
                  </span>
                  <p className="text-lg font-semibold text-orange-600">
                    {priceText}
                  </p>
                </div>
              </div>

              {/* Payment Button */}
              <div>
                <BookTourButton
                  teacherId={teacher._id}
                  teacherName={teacher.name}
                  amount={amount || 10}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Tour Focus</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-100 text-yellow-700">
                  City Walks
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700">
                  Food Tours
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700">Museums</Badge>
                <Badge variant="outline">Nature Trails</Badge>
                <Badge variant="outline">Historical Sites</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Detailed information */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                About {teacher?.name}
              </h2>
              <Separator className="my-4" />
              <div className="prose max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-4">{teacher?.description}</p>
                <p className="leading-relaxed">
                  {teacher?.name} is passionate about cultural exchange and
                  storytelling. Whether you&#39;re exploring {teacher?.country}
                  &#39;s hidden gems or its iconic landmarks, they ensure an
                  authentic, enriching experience every time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Tour Style & Approach
              </h2>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground text-sm">
                <div className="space-y-3">
                  <h3 className="font-medium text-blue-600">
                    Interactive Exploration
                  </h3>
                  <p>
                    Hands-on discovery through local markets, historical sites,
                    and immersive activities.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-blue-600">
                    Culturally Enriching
                  </h3>
                  <p>
                    Learn about local traditions, languages, and festivals from
                    an insider’s perspective.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-blue-600">Flexible Routes</h3>
                  <p>
                    Tours can be customized to match your interests and time
                    constraints.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-blue-600">Small Groups</h3>
                  <p>
                    Personalized attention with smaller group sizes for a better
                    experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
