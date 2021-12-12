import React, { useEffect } from "react";
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
import { ITask } from "../../../types/common";
import { getErrorMessage } from "../../../utils/validate";

interface ModalUpdateProps {
  task?: ITask;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: ITask) => void;
}

export const ModalUpdate = (props: ModalUpdateProps) => {
  const { task, isOpen, onClose, onSubmit = () => {} } = props;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ITask>();

  useEffect(() => {
    reset(task);
  }, [task]);

  const handleUpdate = (task: ITask) => {
    onSubmit(task);
  };

  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Update task
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder={"Coding..."}
            {...register('title', { required: true, maxLength: 150 })}
          />
          <Box color={'red'}>{getErrorMessage(errors)}</Box>
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
        <Button colorScheme="blue" mr={3} onClick={handleSubmit(handleUpdate)}>
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
