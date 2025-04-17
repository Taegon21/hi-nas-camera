import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "@/schemas/form-schema";
import { FORM_FIELDS } from "@/constants/form-fields";
import { FormSection } from "@/components/FormSection";
import { groupFieldsByCategory } from "@/shared/utils/category";
import { CustomButton } from "@/components/CustomButton";
import { ParameterViewModal } from "@/components/ParameterViewModal";
import { useState } from "react";

export const SettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormSchema | null>(null);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const fieldsByCategory = groupFieldsByCategory(FORM_FIELDS);

  const onSubmit = (data: FormSchema) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-12 text-3xl font-bold">Camera Parameter</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-12">
          {Object.entries(fieldsByCategory).map(([category, fields]) => (
            <FormSection key={category} title={category} fields={fields} />
          ))}

          <CustomButton buttonText="Submit" className="mt-4 flex w-full justify-center" />
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
