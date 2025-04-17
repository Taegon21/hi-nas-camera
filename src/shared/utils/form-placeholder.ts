import { CATEGORY_PLACEHOLDERS } from "@/constants/form-placeholders";

export function getFieldPlaceholder(category: string, fieldName: string): string {
  if (!CATEGORY_PLACEHOLDERS[category]) {
    return "Please enter value";
  }

  const categoryPlaceholders = CATEGORY_PLACEHOLDERS[category];

  return categoryPlaceholders[fieldName]
    ? categoryPlaceholders[fieldName]
    : categoryPlaceholders.default;
}
