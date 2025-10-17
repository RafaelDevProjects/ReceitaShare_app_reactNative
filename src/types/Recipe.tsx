export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  prepTime: number;
  needsRefrigeration: boolean;
}

export interface RecipeFormData {
  name: string;
  ingredients: string;
  prepTime: string;
  needsRefrigeration: boolean;
}