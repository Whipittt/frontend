import { type Rating } from "@/components/ui/star-rating";

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
  types?: string[] | null;
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

export type User = {
  id: string;
  fullname: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
};

