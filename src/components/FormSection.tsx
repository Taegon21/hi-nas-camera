import { FormField } from "@/types/form";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormInputGroup } from "./FormInputGroup";

interface FormSectionProps {
  title: string;
  fields: FormField[];
}

export const FormSection = ({ title, fields }: FormSectionProps) => {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="grid gap-4">
        {fields.map((field) =>
          field.type === "radio" ? (
            <FormRadioGroup key={field.name} field={field} />
          ) : (
            <FormInputGroup key={field.name} field={field} />
          )
        )}
      </div>
    </>
  );
};
