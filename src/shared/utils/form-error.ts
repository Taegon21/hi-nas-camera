import { FieldErrors } from "react-hook-form";
import { FormSchema } from "@/schemas/form-schema";

export const getFieldErrorMessage = (
  errors: FieldErrors<FormSchema>,
  fieldName: string
): string | undefined => {
  const isArrayField = fieldName.includes("[");

  if (!isArrayField) {
    return errors[fieldName as keyof FormSchema]?.message;
  } else {
    const baseName = fieldName.split("[")[0] as keyof FormSchema;
    const index = parseInt(fieldName.match(/\[(\d+)\]/)?.[1] || "0");

    const fieldErrors = errors[baseName];
    if (fieldErrors && Array.isArray(fieldErrors) && fieldErrors[index]) {
      return fieldErrors[index]?.message;
    }

    return undefined;
  }
};

export const hasFieldError = (errors: FieldErrors<FormSchema>, fieldName: string): boolean => {
  return !!getFieldErrorMessage(errors, fieldName);
};
