"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Globe, Users, BookOpen, MapPin, Heart } from "lucide-react";
import { IUser } from "@/types";
import Image from "next/image";
import userLogo from "../../../../public/assets/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
import { toast } from "sonner";

interface UserProfileProps {
  user: IUser;
}

export default function TravelerProfileForm({ user }: UserProfileProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: "",
    homeCountry: "",
    languages: [] as string[],
    travelInterests: [] as string[],
    targetLanguages: [] as string[],
    languageLevel: "",
    learningGoals: [] as string[],
    preferredDestinations: [] as string[],
    travelStyle: "",
    accommodationPreference: "",
    hobbies: [] as string[],
    foodPreferences: [] as string[],
    socialStyle: [3] as number[],
    adventurousness: [3] as number[],
  });
  const toggleArrayItem = (
    array: string[],
    item: string,
    setter: (value: string[]) => void
  ) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  // PATCH Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: user.userId,
      image: user.image,
      ...formData,
    };
    console.log(user.userId);
    console.log("🔍 PATCH Payload:", payload);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/user/${user.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      await res.json();
      toast.success("✅ Profile Updated successfully");
    } catch (error) {
      toast.error("❌ Error updating profile");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="font-heading text-4xl font-bold text-foreground">
            Join the Adventure
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow travelers, learn new languages, and discover
            cultures around the world. Tell us about yourself to find your
            perfect travel companions.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* ---- Your existing Cards & Inputs remain unchanged ---- */}
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Let&#39;s start with the basics about you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <Image
                    src={user.image || userLogo}
                    alt={user.name || "User Avatar"}
                    fill
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg">
                    <Camera className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Show your personality with a friendly photo
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={user.name}
                    disabled
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={user.email}
                    disabled
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder={user.age}
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Home Country</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, homeCountry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="es">Spain</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="kr">South Korea</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Languages You Speak</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Japanese",
                    "Korean",
                    "Mandarin",
                    "Arabic",
                  ].map((lang) => (
                    <Badge
                      key={lang}
                      variant={
                        formData.languages.includes(lang)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(formData.languages, lang, (newLangs) =>
                          setFormData({ ...formData, languages: newLangs })
                        )
                      }
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Travel Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Culture",
                    "Food",
                    "History",
                    "Adventure",
                    "Nature",
                    "Art",
                    "Music",
                    "Photography",
                    "Architecture",
                    "Nightlife",
                  ].map((interest) => (
                    <Badge
                      key={interest}
                      variant={
                        formData.travelInterests.includes(interest)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(
                          formData.travelInterests,
                          interest,
                          (newInterests) =>
                            setFormData({
                              ...formData,
                              travelInterests: newInterests,
                            })
                        )
                      }
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Learning Goals
              </CardTitle>
              <CardDescription>
                What languages do you want to learn and why?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Target Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Japanese",
                    "Korean",
                    "Mandarin",
                    "Arabic",
                    "Russian",
                  ].map((lang) => (
                    <Badge
                      key={lang}
                      variant={
                        formData.targetLanguages.includes(lang)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(
                          formData.targetLanguages,
                          lang,
                          (newLangs) =>
                            setFormData({
                              ...formData,
                              targetLanguages: newLangs,
                            })
                        )
                      }
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Language Level</Label>
                <RadioGroup
                  value={formData.languageLevel}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, languageLevel: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">
                      Beginner - Just starting out
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">
                      Intermediate - Can have basic conversations
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">
                      Advanced - Fluent but want to improve
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Specific Learning Goals</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Conversation Practice",
                    "Exam Preparation",
                    "Business Communication",
                    "Accent Training",
                    "Cultural Understanding",
                    "Travel Communication",
                  ].map((goal) => (
                    <Badge
                      key={goal}
                      variant={
                        formData.learningGoals.includes(goal)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(
                          formData.learningGoals,
                          goal,
                          (newGoals) =>
                            setFormData({
                              ...formData,
                              learningGoals: newGoals,
                            })
                        )
                      }
                    >
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Travel Preferences
              </CardTitle>
              <CardDescription>
                Tell us about your travel style and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Preferred Destinations</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Europe",
                    "Asia",
                    "South America",
                    "North America",
                    "Africa",
                    "Oceania",
                    "Middle East",
                    "Caribbean",
                  ].map((dest) => (
                    <Badge
                      key={dest}
                      variant={
                        formData.preferredDestinations.includes(dest)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(
                          formData.preferredDestinations,
                          dest,
                          (newDests) =>
                            setFormData({
                              ...formData,
                              preferredDestinations: newDests,
                            })
                        )
                      }
                    >
                      {dest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Travel Style</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, travelStyle: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How do you like to travel?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural Immersion</SelectItem>
                    <SelectItem value="adventure">
                      Adventure & Outdoor
                    </SelectItem>
                    <SelectItem value="luxury">Luxury & Comfort</SelectItem>
                    <SelectItem value="backpacking">
                      Backpacking & Budget
                    </SelectItem>
                    <SelectItem value="eco">Eco & Sustainable</SelectItem>
                    <SelectItem value="food">Food & Culinary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Accommodation Preference</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, accommodationPreference: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Where do you prefer to stay?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homestay">
                      Homestay with locals
                    </SelectItem>
                    <SelectItem value="private">
                      Private room/apartment
                    </SelectItem>
                    <SelectItem value="hostel">Hostel (shared)</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="mixed">I&lsquo;m flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Personality & Lifestyle */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Personality & Lifestyle
              </CardTitle>
              <CardDescription>
                Help us match you with compatible travel companions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Hobbies & Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Reading",
                    "Hiking",
                    "Photography",
                    "Cooking",
                    "Music",
                    "Dancing",
                    "Sports",
                    "Art",
                    "Gaming",
                    "Yoga",
                  ].map((hobby) => (
                    <Badge
                      key={hobby}
                      variant={
                        formData.hobbies.includes(hobby) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(formData.hobbies, hobby, (newHobbies) =>
                          setFormData({ ...formData, hobbies: newHobbies })
                        )
                      }
                    >
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Food Preferences</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Halal",
                    "Kosher",
                    "Gluten-Free",
                    "No Restrictions",
                    "Adventurous Eater",
                  ].map((pref) => (
                    <Badge
                      key={pref}
                      variant={
                        formData.foodPreferences.includes(pref)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        toggleArrayItem(
                          formData.foodPreferences,
                          pref,
                          (newPrefs) =>
                            setFormData({
                              ...formData,
                              foodPreferences: newPrefs,
                            })
                        )
                      }
                    >
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Social Style</Label>
                  <div className="px-3">
                    <Slider
                      value={formData.socialStyle}
                      onValueChange={(value) =>
                        setFormData({ ...formData, socialStyle: value })
                      }
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Quiet & Calm</span>
                      <span>Outgoing & Social</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Adventure Level</Label>
                  <div className="px-3">
                    <Slider
                      value={formData.adventurousness}
                      onValueChange={(value) =>
                        setFormData({ ...formData, adventurousness: value })
                      }
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Prefer Comfort</span>
                      <span>Love Adventure</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Submit Button */}
          <div className="text-center pb-8">
            <Button
              type="submit"
              size="lg"
              className="font-heading text-lg px-8 py-3"
            >
              <Globe className="mr-2 h-5 w-5" />
              Save my Profile
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Ready to connect with travelers worldwide?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
