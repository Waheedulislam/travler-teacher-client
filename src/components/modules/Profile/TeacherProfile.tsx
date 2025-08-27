"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Target, Plane, Heart, Plus, X } from "lucide-react";
import { IUser } from "@/types";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import userLogo from "../../../../public/assets/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
import { toast } from "sonner";

interface TargetLanguage {
  language: string;
  level: string;
}
interface TeacherProfileProps {
  user: IUser;
}
export default function TravelerProfileForm({ user }: TeacherProfileProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    homeCountry: "",
    languagesSpoken: [] as string[],
    travelInterests: [] as string[],
    targetLanguages: [] as TargetLanguage[],
    learningGoals: [] as string[],
    preferredDestinations: [] as string[],
    travelStyle: [] as string[],
    hobbies: [] as string[],
    foodPreferences: [] as string[],
    socialStyle: [] as string[],
  });
  console.log(user);
  const [newLanguage, setNewLanguage] = useState("");
  const [newDestination, setNewDestination] = useState("");
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
  const languageOptions = [
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
    "Russian",
    "Dutch",
    "Swedish",
  ];
  const levelOptions = ["Beginner", "Intermediate", "Advanced", "Native"];
  const interestOptions = [
    "Culture",
    "Food",
    "History",
    "Adventure",
    "Photography",
    "Art",
    "Music",
    "Nature",
    "Architecture",
    "Shopping",
  ];
  const goalOptions = [
    "Conversation",
    "Exam Prep",
    "Accent Training",
    "Business Communication",
    "Travel Communication",
    "Cultural Understanding",
  ];
  const styleOptions = [
    "Eco-friendly",
    "Cultural Immersion",
    "Luxury",
    "Backpacking",
    "Adventure",
    "Relaxation",
    "Authentic Experiences",
  ];

  const socialOptions = [
    "Outgoing",
    "Calm",
    "Flexible",
    "Structured",
    "Curious",
    "Independent",
    "Social",
  ];

  const addToArray = (field: keyof typeof formData, value: any) => {
    if (value && !formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value],
      }));
    }
  };

  const removeFromArray = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((item) => item !== value),
    }));
  };

  const addTargetLanguage = () => {
    if (newLanguage) {
      setFormData((prev) => ({
        ...prev,
        targetLanguages: [
          ...prev.targetLanguages,
          { language: newLanguage, level: "Beginner" },
        ],
      }));
      setNewLanguage("");
    }
  };

  const updateTargetLanguageLevel = (index: number, level: string) => {
    setFormData((prev) => ({
      ...prev,
      targetLanguages: prev.targetLanguages.map((tl, i) =>
        i === index ? { ...tl, level } : tl
      ),
    }));
  };

  const removeTargetLanguage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      targetLanguages: prev.targetLanguages.filter((_, i) => i !== index),
    }));
  };

  const handleCheckboxChange = (
    field: keyof typeof formData,
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      addToArray(field, value);
    } else {
      removeFromArray(field, value);
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
      toast.success("✅ Teacher Profile Updated successfully");
    } catch (error) {
      toast.error("❌ Error updating profile");
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="font-heading text-4xl font-bold text-foreground">
          Admin Profile
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow admin, learn new languages, and discover cultures
          around the world. Tell us about yourself to find your perfect travel
          companions.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-10 space-y-6"
      >
        {/* Basic Info */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Photo */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <Image
                  src={user.image || userLogo}
                  alt={user.name || "User Avatar"}
                  width={60}
                  height={60}
                  className="object-cover rounded-full"
                />
              </Avatar>

              <div>
                <p className="text-sm text-muted-foreground mt-1">
                  Show your personality with a friendly photo
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
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
              <div>
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
            <div>
              <Label htmlFor="homeCountry">Home Country</Label>
              <Input
                id="homeCountry"
                value={formData.homeCountry}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    homeCountry: e.target.value,
                  }))
                }
                placeholder="Enter your home country"
              />
            </div>

            <div>
              <Label>Languages Spoken</Label>
              <div className="flex gap-2 mb-2">
                <Select value={newLanguage} onValueChange={setNewLanguage}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => addToArray("languagesSpoken", newLanguage)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languagesSpoken.map((language) => (
                  <Badge
                    key={language}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {language}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() =>
                        removeFromArray("languagesSpoken", language)
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Travel Interests</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={`interest-${interest}`}
                      checked={formData.travelInterests.includes(interest)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "travelInterests",
                          interest,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={`interest-${interest}`} className="text-sm">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Learning Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Target Languages</Label>
              <div className="flex gap-2 mb-2">
                <Select value={newLanguage} onValueChange={setNewLanguage}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a language to learn" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addTargetLanguage}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.targetLanguages.map((target, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1">{target.language}</span>
                    <Select
                      value={target.level}
                      onValueChange={(level) =>
                        updateTargetLanguageLevel(index, level)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTargetLanguage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Learning Goals</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {goalOptions.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={`goal-${goal}`}
                      checked={formData.learningGoals.includes(goal)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "learningGoals",
                          goal,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={`goal-${goal}`} className="text-sm">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Preferred Destinations</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="Enter a destination"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToArray("preferredDestinations", newDestination);
                      setNewDestination("");
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addToArray("preferredDestinations", newDestination);
                    setNewDestination("");
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.preferredDestinations.map((destination) => (
                  <Badge
                    key={destination}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {destination}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() =>
                        removeFromArray("preferredDestinations", destination)
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Travel Style</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {styleOptions.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={`style-${style}`}
                      checked={formData.travelStyle.includes(style)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "travelStyle",
                          style,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={`style-${style}`} className="text-sm">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personality & Lifestyle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Personality & Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div>
              <Label>Social Style</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {socialOptions.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={`social-${style}`}
                      checked={formData.socialStyle.includes(style)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "socialStyle",
                          style,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={`social-${style}`} className="text-sm">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* try  */}
        <div className="flex justify-center mb-20">
          <Button type="submit" size="lg" className="px-8">
            Save My Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
