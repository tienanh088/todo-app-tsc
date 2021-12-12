import { useToast } from "@chakra-ui/react";
import { AlertStatus } from "@chakra-ui/alert/src/alert";

export const useGlobalToast = () => {
  const toast = useToast();

  return (message: string, status: AlertStatus) => {
    toast({
      description: message,
      status: status,
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };
};
