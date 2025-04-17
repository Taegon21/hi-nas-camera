import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/schemas/form-schema";
import { FormField } from "@/types/form";
import { getFieldErrorMessage } from "@/shared/utils/form-error";
import { FormErrorMessage } from "@/components/FormErrorMessage";
import { getFieldPlaceholder } from "@/shared/utils/form-placeholder";

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

  return (
    <div>
      <div className={"font-bold"}>{displayLabel}</div>
      <input
        type={type === "number" ? "number" : "text"}
        {...register(name as keyof FormSchema, {
          valueAsNumber: type === "number",
        })}
        className={"w-full rounded-md border-2 p-2"}
        placeholder={placeholder}
      />
      <FormErrorMessage error={errorMessage} />
    </div>
  );
};
