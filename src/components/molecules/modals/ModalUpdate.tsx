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
import { useMutation } from "react-query";
import { todoService } from "../../../services";
import moment from "moment";
import { useGlobalToast } from "../../../hooks/useGlobalToast";
import { ControlledStatus } from "../../atoms/ControlledStatus";

interface ModalUpdateProps {
  task?: ITask;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalUpdate = (props: ModalUpdateProps) => {
  const { task, isOpen, onClose, onSubmit = () => {} } = props;
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<ITask>();
  const toast = useGlobalToast();
  const { mutate, isLoading } = useMutation((data: ITask) => todoService.updateTask(data));

  useEffect(() => {
    reset(task);
  }, [task]);

  const handleUpdate = async (task: ITask) => {
    const now = moment(new Date(), 'DD/MM/YYYY HH:mm').valueOf();
    mutate(
      { ...task, updatedAt: now },
      {
        onSuccess: () => {
          toast('Updated successfully!', 'success');
          onClose();
          onSubmit();
        },
        onError: error => toast((error as Error).message, 'error')
      }
    );
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
        <ControlledStatus control={control} />
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme={"blue"}
          marginRight={3}
          loadingText={"Updating..."}
          isLoading={isLoading}
          onClick={handleSubmit(handleUpdate)}>
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
