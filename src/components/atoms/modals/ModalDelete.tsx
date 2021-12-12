import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { ITask } from "../../../types/common";
import { useMutation } from "react-query";
import { todoService } from "../../../services";
import { useGlobalToast } from "../../../hooks/useGlobalToast";

interface ModalDeleteProps {
  task?: ITask;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalDelete = (props: ModalDeleteProps) => {
  const { task, isOpen, onClose, onSubmit = () => {} } = props;
  const toast = useGlobalToast();
  const { mutate, isLoading } = useMutation((id: number) => todoService.deleteTask(id));

  const handleDelete = async () => {
    task?.id && mutate(task?.id, {
      onSuccess: () => {
        toast('Deleted successfully!', 'success');
        onClose();
        onSubmit();
      },
      onError: (error) => toast((error as Error).message, 'error')
    });
  };

  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Delete {task?.title}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>Are you sure you want to delete this task?</Box>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme={"blue"}
          marginRight={3}
          loadingText={"Deleting..."}
          isLoading={isLoading}
          onClick={handleDelete}
        >
          OK
        </Button>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
