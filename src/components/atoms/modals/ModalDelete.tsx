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
import { RecordType } from "../../molecules/Controller";

interface ModalDeleteProps {
  item?: RecordType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalDelete = (props: ModalDeleteProps) => {
  const { item, isOpen, onClose, onSubmit = () => {} } = props;

  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Delete {item?.title}
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
