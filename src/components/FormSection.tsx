import { FormField } from "@/types/form";
import { FormFieldList } from "@/components/FormFieldList";

interface FormSectionProps {
  title: string;
  fields: FormField[];
}

export const FormSection = ({ title, fields }: FormSectionProps) => {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="grid gap-4">
        <FormFieldList category={title} fields={fields} />
      </div>
    </>
  );
};
