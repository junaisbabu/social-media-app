import { useToast } from "@/components/ui/use-toast";

export const useShowToast = () => {
  const { toast } = useToast();

  const showErrorToast = (message: string) => {
    toast({
      title: "Error",
      description: message,
    });
  };

  const showSuccessToast = (message: string) => {
    toast({
      title: "Success",
      description: message,
    });
  };

  return { showErrorToast, showSuccessToast };
};
