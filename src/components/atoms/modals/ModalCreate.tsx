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
import { ITask, TPriority } from "../../../types/common";
import { getErrorMessage } from "../../../utils/validate";
import { todoService } from "../../../services";
import { useGlobalToast } from "../../../hooks/useGlobalToast";
import moment from "moment";
import { useMutation } from "react-query";

export interface FieldsCreate extends TPriority {
  title: string;
}

interface ModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalCreate = (props: ModalCreateProps) => {
  const { isOpen, onClose, onSubmit = () => {} } = props;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldsCreate>();
  const toast = useGlobalToast();
  const { mutate, isLoading } = useMutation((data: ITask) => todoService.createTask(data));

  const handleCreate = async (task: FieldsCreate) => {
    const now = moment(new Date(), 'DD/MM/YYYY HH:mm').valueOf();
    mutate(
      { ...task, isDone: false, createdAt: now, updatedAt: now },
      {
        onSuccess: () => {
          onSubmit();
          onClose();
          toast('Created successfully!', 'success');
          reset();
        },
        onError: (error) => toast((error as Error).message, 'error')
      }
    );
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
        <Button
          colorScheme={"blue"}
          marginRight={3}
          loadingText={"Creating..."}
          isLoading={isLoading}
          onClick={handleSubmit(handleCreate)}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
