import { CustomModal } from "@/components/common/CustomModal";
import { FormSchema } from "@/schemas/form-schema";
import { getJsonString } from "@/shared/lib/get-json-string";
import { CustomButton } from "@/components/common/CustomButton";

interface ParameterViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FormSchema | null;
}

export const ParameterViewModal = ({ isOpen, onClose, data }: ParameterViewModalProps) => {
  if (!data) return null;

  const formattedData = getJsonString(data, null, 2);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Camera Parameter">
      <pre className="overflow-auto rounded p-4 text-sm break-words whitespace-pre-wrap">
        {formattedData}
      </pre>
      <div className="flex justify-end">
        <CustomButton buttonText="Close" className="w-auto" onClick={onClose} type="button" />
      </div>
    </CustomModal>
  );
};
