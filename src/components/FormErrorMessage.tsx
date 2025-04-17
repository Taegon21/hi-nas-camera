export const FormErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;

  return <p className="text-destructive text-sm">{error}</p>;
};
