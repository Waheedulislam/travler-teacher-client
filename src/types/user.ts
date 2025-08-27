export interface IUser {
  userId: string;
  name: string;
  email: string;
  image: string;
  isActive?: string;
  role: string;
  iat?: number;
  exp?: number;
  age?: string;
  homeCountry?: string;
  languages?: string;
  travelInterests?: string;
  targetLanguages?: string;
  languageLevel?: string;
  learningGoals?: string;
  preferredDestinations?: string;
  travelStyle?: string;
  accommodationPreference?: string;
  hobbies?: string;
  foodPreferences?: string;
  socialStyle?: number;
  adventurousness?: number;

  accommodationPreferences?: string;
}
