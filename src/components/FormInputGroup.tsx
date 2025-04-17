import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/schemas/form-schema";
import { FormField } from "@/types/form";
import { getFieldErrorMessage, hasFieldError } from "@/shared/utils/form-error";
import { FormErrorMessage } from "@/components/FormErrorMessage";
import { getFieldPlaceholder } from "@/shared/utils/form-placeholder";
import { twMerge as tw } from "tailwind-merge";

const formatDisplayLabel = (category: string, label: string): string => {
  if (!category.includes("Cam")) return label;

  let position = "";
  if (label.includes("Left")) position = "Left";
  else if (label.includes("Center")) position = "Center";
  else if (label.includes("Right")) position = "Right";

  let axis = "";
  if (label.includes("X")) axis = "X";
  else if (label.includes("Y")) axis = "Y";

  return `${position} ${axis}`;
};

export const FormInputGroup = ({ field }: { field: FormField }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();

  const { category, name, label, type } = field;

  const errorMessage = getFieldErrorMessage(errors, name);
  const displayLabel = formatDisplayLabel(category, label);
  const placeholder = getFieldPlaceholder(category, name);
  const hasError = hasFieldError(errors, name);

  return (
    <div className="space-y-2">
      <div className={tw("font-bold", hasError ? "text-destructive" : "text-foreground")}>
        {displayLabel}
      </div>
      <input
        type={type === "number" ? "number" : "text"}
        {...register(name as keyof FormSchema, {
          valueAsNumber: type === "number",
        })}
        className={tw(
          "w-full rounded-md border-2 p-2 focus:ring-3 focus:outline-none",
          hasError
            ? "border-destructive focus:border-destructive focus:ring-destructive/30"
            : "border-input focus:border-ring focus:ring-ring/30"
        )}
        placeholder={placeholder}
      />
      <FormErrorMessage error={errorMessage} />
    </div>
  );
};
