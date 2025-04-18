import { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "@/schemas/form-schema";
import { FORM_FIELDS } from "@/constants/form-fields";
import { SettingFormSection } from "@/components/setting-page/SettingFormSection";
import { groupFieldsByCategory, sortFieldsByOrder } from "@/shared/utils/form-fields-utils";
import { CustomButton } from "@/components/common/CustomButton";
import { ParameterViewModal } from "@/components/setting-page/ParameterViewModal";
import { UI_STRINGS } from "@/constants/ui-string";

const CATEGORY_SORT_CONFIG: Record<string, string[]> = {
  "Roll Pitch Yaw": ["Roll", "Pitch", "Yaw"],
};

export const SettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormSchema | null>(null);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const organizedFields = useMemo(() => {
    const categorizedFields = groupFieldsByCategory(FORM_FIELDS);

    Object.entries(CATEGORY_SORT_CONFIG)
      .filter(([categoryName]) => categorizedFields[categoryName])
      .forEach(([categoryName, displayOrder]) => {
        categorizedFields[categoryName] = sortFieldsByOrder(
          categorizedFields[categoryName],
          displayOrder
        );
      });

    return categorizedFields;
  }, []);

  const onSubmit = (data: FormSchema) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-12 text-3xl font-bold">{UI_STRINGS.TITLE}</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-12">
          {Object.entries(organizedFields).map(([category, fields]) => (
            <SettingFormSection key={category} title={category} fields={fields} />
          ))}

          <CustomButton buttonText={UI_STRINGS.BUTTON_SUBMIT} className="mt-4 flex w-full justify-center" />
        </form>
      </FormProvider>

      <ParameterViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={formData}
      />
    </div>
  );
};
