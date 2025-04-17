import { FormField } from "@/types/form";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormInputGroup } from "@/components/FormInputGroup";

interface FormSectionProps {
  title: string;
  fields: FormField[];
}

export const FormSection = ({ title, fields }: FormSectionProps) => {
  const fieldElements = fields.map((field) => {
    if (field.type === "radio") {
      return <FormRadioGroup key={field.name} field={field} />;
    }
    return <FormInputGroup key={field.name} field={field} />;
  });

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="grid gap-4">{fieldElements}</div>
    </div>
  );
};
