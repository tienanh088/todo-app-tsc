import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Select
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { TPriority } from "../../../types/common";

export interface FieldsCreate extends TPriority {
  title: string;
}

interface ModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: FieldsCreate) => void;
}

export const ModalCreate = (props: ModalCreateProps) => {
  const { isOpen, onClose, onSubmit = () => {} } = props;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldsCreate>();

  const handleCreate = (value: FieldsCreate) => {
    onSubmit(value);
    reset();
  };

  const getTitleError = () => {
    if (errors.title?.type === 'required') return 'Please input title';
    if (errors.title?.type === 'maxLength') return 'Title is too long (max: 150 characters)';
  };

  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Create new task
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder={"Coding..."}
            {...register('title', { required: true, maxLength: 150 })}
          />
          <Box color={'red'}>{getTitleError()}</Box>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Priority</FormLabel>
          <Select placeholder="Select priority" {...register('priority', { required: true })}>
            <option value={'high'}>High</option>
            <option value={'medium'}>Medium</option>
            <option value={'low'}>Low</option>
          </Select>
          <Box color={'red'}>{errors.priority && 'Please select priority'}</Box>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleSubmit(handleCreate)}>
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
