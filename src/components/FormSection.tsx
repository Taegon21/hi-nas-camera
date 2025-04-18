import { FormField, FormOption } from "@/types/form";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormInputGroup } from "./FormInputGroup";
import { SHIP_OPTIONS, ENGINE_OPTIONS } from "@/constants/form-options";

interface FormSectionProps {
  title: string;
  fields: FormField[];
}

const DEFAULT_OPTIONS: Record<string, FormOption<string>[]> = {
  ship_type: SHIP_OPTIONS,
  engine: ENGINE_OPTIONS,
};

const cameraLabelFormatter = (category: string, label: string): string => {
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

export const FormSection = ({ title, fields }: FormSectionProps) => {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="grid gap-4">
        {fields.map((field) =>
          field.type === "radio" ? (
            <FormRadioGroup key={field.name} field={field} options={DEFAULT_OPTIONS[field.name]} />
          ) : (
            <FormInputGroup key={field.name} field={field} formatLabel={cameraLabelFormatter} />
          )
        )}
      </div>
    </>
  );
};
