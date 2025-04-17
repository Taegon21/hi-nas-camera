import { FormField } from "@/types/form";

export function extractCategories(
  fields: FormField[],
  upperCase: boolean = true
): Record<string, string> {
  return [...new Set(fields.map((field) => field.category))].reduce(
    (acc, category) => {
      const key = category.replace(/\s+/g, "_");
      const formattedKey = upperCase ? key.toUpperCase() : key.toLowerCase();
      return { ...acc, [formattedKey]: category };
    },
    {} as Record<string, string>
  );
}

export function groupFieldsByCategory(fields: FormField[]): Record<string, FormField[]> {
  return fields.reduce(
    (acc, field) => {
      if (!acc[field.category]) {
        acc[field.category] = [];
      }
      acc[field.category].push(field);
      return acc;
    },
    {} as Record<string, FormField[]>
  );
}
