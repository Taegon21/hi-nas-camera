import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/schemas/form-schema";
import { FormField } from "@/types/form";
import { getFieldErrorMessage } from "@/shared/utils/form-error";
import { FormErrorMessage } from "@/components/FormErrorMessage";
import { formatDisplayLabel } from "@/shared/utils/label-formatter";

export const FormInputGroup = ({ field }: { field: FormField }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const { category, name, label, type } = field;

  const errorMessage = getFieldErrorMessage(errors, name);
  const displayLabel = formatDisplayLabel(category, label);

  return (
    <div>
      <div className={"font-bold"}>{displayLabel}</div>
      <input
        type={type === "number" ? "number" : "text"}
        {...register(name as keyof FormSchema, {
          valueAsNumber: type === "number",
        })}
        className={"w-full rounded-md border-2 p-2"}
      />
      <FormErrorMessage error={errorMessage} />
    </div>
  );
};
