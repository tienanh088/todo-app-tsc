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

interface ModalDeleteProps {
  task?: ITask;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalDelete = (props: ModalDeleteProps) => {
  const { task, isOpen, onClose, onSubmit = () => {} } = props;

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
        <Button colorScheme="blue" mr={3} onClick={onSubmit}>
          OK
        </Button>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
