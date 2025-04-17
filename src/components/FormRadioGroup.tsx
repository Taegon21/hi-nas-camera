import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/schemas/form-schema";
import { FormField } from "@/types/form";
import { SHIP_OPTIONS, ENGINE_OPTIONS } from "@/constants/form-options";
import { FormErrorMessage } from "@/components/FormErrorMessage";
import { getFieldErrorMessage, hasFieldError } from "@/shared/utils/form-error";
import { twMerge as tw } from "tailwind-merge";

export const FormRadioGroup = ({ field }: { field: FormField }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const { name, label } = field;

  const options = name === "ship_type" ? SHIP_OPTIONS : ENGINE_OPTIONS;
  const errorMessage = getFieldErrorMessage(errors, name);
  const hasError = hasFieldError(errors, name);

  const isHorizontalLayout = options.length <= 2;

  return (
    <div className="space-y-4">
      <div className={tw("font-bold", hasError ? "text-destructive" : "text-foreground")}>
        {label}
      </div>
      <div className={isHorizontalLayout ? "flex space-x-6" : "space-y-4"}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <div className="relative flex items-center">
              <input
                id={`${name}-${option.value}`}
                type="radio"
                value={option.value}
                className="peer border-foreground h-4 w-4 cursor-pointer appearance-none rounded-full border"
                {...register(name as keyof FormSchema)}
              />
              <div className="bg-foreground pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full not-first:opacity-0 peer-checked:opacity-100"></div>
            </div>
            <label
              htmlFor={`${name}-${option.value}`}
              className={tw(
                "block cursor-pointer pl-2 text-sm font-medium",
                hasError ? "text-destructive" : "text-foreground"
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <FormErrorMessage error={errorMessage} />
    </div>
  );
};
