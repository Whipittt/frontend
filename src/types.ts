import { type Rating } from "@/components/ui/star-rating";
import type { JSONContent } from "@tiptap/react";
import type { ReactNode } from "react";

export interface FastAPIError {
  details: {
    loc: (string | number)[];
    msg: string;
    interface?: string;
  }[];
}

export type AppRoute = {
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: AppRoute[];
};

export type PaginationProps = {
  skip?: number;
  limit?: number;
};

export interface RecipeCategory {
  id?: string;
  name: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  instructions?: string;
  category?: { id: string; name: string };
  categories?: { id: string; name: string }[];
  ingredients?: { id: string; name: string }[];
  interfaces?: string[];
  cuisines?: string[];
  types?: string[];
  time_minutes?: number;
  display_image?: string;
  instruction_json?: any;
  rating?: Rating;
  favourited?: boolean;
  favourites_count?: number;
}

export interface RecipeBrief {
  id: string;
  title: string;
  display_image?: string;
  time_minutes?: number;
  rating?: number;
  favourited?: boolean;
  favourites_count?: number;
}

export interface RecipeSupBrief {
  id: string;
  title: string;
}

export interface User {
  id?: string;
  fullname: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at?: string;
  password?: string;
}

export interface Preference {
  cooking_time?: string;
  ethnicity?: string;
  skill_level?: string;
  dietary_restriction_ids?: string[];
  dietary_restrictions?: {
    id: string;
    name: string;
  }[];
}

export interface UserProfile {
  id?: string;
  fullname: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at?: string;
  preference: Preference | null;
}

export interface UserFromtoken {
  id: string;
  fullname: string;
  email: string;
  is_superuser: boolean;
}

export interface PasswordResetPayload {
  new_password: string;
}

export interface UserUpdatePayload {
  fullname?: string;
  email?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface MetricsResponse {
  total_recipes: number;
  active_users: number;
  user_growth_rate: number;
  average_recipe_rating: number;
}

export interface Ingredient {
  id?: string;
  name: string;
  recipes?: RecipeBrief[];
}

export interface NewRecipe {
  title: string;
  description: string;
  instructions: string;
  category_ids: string[];
  ingredient_ids: string[];
  cuisines: string[];
  types: string[];
  time_minutes: number;
  rating: number;
  display_image: string;
  instruction_json: JSONContent;
}

export type MealPlanRecipeBrief = {
  id: string;
  title: string;
};

export type MealPlanDayMealsOut = {
  breakfast: MealPlanRecipeBrief | null;
  lunch: MealPlanRecipeBrief | null;
  dinner: MealPlanRecipeBrief | null;
};

export type MealPlanDayOut = {
  day_of_week: number;
  meals: MealPlanDayMealsOut;
};

export type MealPlanOut = {
  id?: string;
  week_start_date: string;
  days: MealPlanDayOut[];
};

export type MealplanPayload = {
  week_start_date: string;
  days: {
    day_of_week: number;
    meals: Partial<Record<keyof MealPlanDayMealsOut, string>>;
  }[];
};
