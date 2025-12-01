import { type Rating } from "@/components/ui/star-rating";

export interface FastAPIError {
  details: {
    loc: (string | number)[];
    msg: string;
    interface?: string;
  }[];
}

export interface RecipeCategory {
  id: string;
  name: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string | null;
  instructions?: string | null;
  category?: { id: string; name: string } | null;
  categories?: { id: string; name: string }[] | null;
  ingredients?: { id: string; name: string }[] | null;
  interfaces?: string[] | null;
  cuisines?: string[] | null;
  time_minutes?: number | null;
  display_image?: string | null;
  instruction_json?: any | null;
  rating?: Rating | null;
  favourited?: boolean | null;
  favourites_count?: number | null;
}

export interface RecipeBrief {
  id: string;
  title: string;
  display_image?: string | null;
  time_minutes?: number | null;
  rating?: number | null;
  favourited?: boolean | null;
  favourites_count?: number | null;
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
  id: string;
  name: string;
}
