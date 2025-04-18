import { FormField, FormOption } from "@/types/form";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormInputGroup } from "./FormInputGroup";
import { SHIP_OPTIONS, ENGINE_OPTIONS } from "@/constants/form-options";

interface FormSectionProps {
  title: string;
  fields: FormField[];
}

const RADIO_OPTIONS: Record<string, FormOption<string>[]> = {
  ship_type: SHIP_OPTIONS,
  engine: ENGINE_OPTIONS,
};

export const FormSection = ({ title, fields }: FormSectionProps) => {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="grid gap-4">
        {fields.map((field) =>
          field.type === "radio" ? (
            <FormRadioGroup key={field.name} field={field} options={RADIO_OPTIONS[field.name]} />
          ) : (
            <FormInputGroup key={field.name} field={field} />
          )
        )}
      </div>
    </>
  );
};
