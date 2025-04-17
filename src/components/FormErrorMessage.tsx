export const FormErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;

  return <p className="text-destructive mt-1 text-sm">{error}</p>;
};
