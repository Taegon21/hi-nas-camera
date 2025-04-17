import { FormField } from "@/types/form";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormInputGroup } from "@/components/FormInputGroup";

type RotationType = "Roll" | "Pitch" | "Yaw";

interface FormFieldListProps {
  category: string;
  fields: FormField[];
}

const sortRollPitchYawFields = (fields: FormField[]): FormField[] => {
  const displayOrder: RotationType[] = ["Roll", "Pitch", "Yaw"];
  const sortedFields: FormField[] = [];

  for (let i = 0; i < fields.length; i += 3) {
    const group = fields.slice(i, i + 3);

    displayOrder.forEach((rotationType) => {
      const field = group.find((f) => f.label.includes(rotationType));
      if (field) {
        sortedFields.push(field);
      }
    });
  }

  return sortedFields;
};

export const FormFieldList = ({ category, fields }: FormFieldListProps) => {
  const displayFields = category === "Roll Pitch Yaw" ? sortRollPitchYawFields(fields) : fields;

  return (
    <>
      {displayFields.map((field) =>
        field.type === "radio" ? (
          <FormRadioGroup key={field.name} field={field} />
        ) : (
          <FormInputGroup key={field.name} field={field} />
        )
      )}
    </>
  );
};
