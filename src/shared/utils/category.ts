import { FormField } from "@/types/form";

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
