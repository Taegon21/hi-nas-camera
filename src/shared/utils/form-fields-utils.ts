import { FormField } from "@/types/form";

export function groupFieldsByCategory(fields: FormField[]): Record<string, FormField[]> {
  return fields.reduce(
    (acc, field) => {
      if (!acc[field.category]) {
        acc[field.category] = [];
      }
      acc[field.category].push(field);
      return acc;
    },
    {} as Record<string, FormField[]>
  );
}

export const sortFieldsByOrder = (
  fields: FormField[],
  displayOrder: string[],
  groupSize?: number
): FormField[] => {
  const sortedFields: FormField[] = [];
  const actualGroupSize = groupSize || displayOrder.length;

  for (let i = 0; i < fields.length; i += actualGroupSize) {
    const group = fields.slice(i, i + actualGroupSize);

    displayOrder.forEach((orderType) => {
      const field = group.find((f) => f.label.includes(orderType));
      if (field) {
        sortedFields.push(field);
      }
    });
  }

  return sortedFields;
};
