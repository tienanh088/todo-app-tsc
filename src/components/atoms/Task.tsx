import React from 'react';
import { Box, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { FaCheck, FaEdit, FaTrash, FaUndoAlt } from "react-icons/fa";
import { ITask } from "../../types/common";
import { ModalUpdate } from "../molecules/modals/ModalUpdate";
import { ModalDelete } from "./modals/ModalDelete";
import { todoService } from "../../services";
import { useGlobalToast } from "../../hooks/useGlobalToast";
import moment from "moment";
import { useMutation } from "react-query";

interface TaskProps {
    task: ITask;
    onChange: () => void;
}

export const Task = (props: TaskProps) => {
  const { task, onChange } = props;
  const { id, title, priority, isDone } = task;
  const toast = useGlobalToast();
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  const { mutate, isLoading } = useMutation((data: ITask) => todoService.updateTask(data));

  const getBorderColor = () => {
    if (priority === 'high') return 'red.500';
    if (priority === 'medium') return 'orange.500';
    if (priority === 'low') return 'green.500';
  };

  const handleChange = async () => {
    id && mutate({ ...task, isDone: !isDone }, {
      onSuccess: () => {
        toast('Updated successfully!', 'success');
        onChange();
      },
      onError: (error) => toast((error as Error).message, 'error')
    });
  };

  return <><Flex
    flex={1}
    width={'full'}
    borderBottomWidth={'1px'}
    borderBottomColor={'gray.100'}
    padding={2}
    alignItems={'center'}
    justifyContent={'space-between'}
    backgroundColor={task.isDone ? 'blue.100' : 'unset'}
  >
    <Box
      borderLeftWidth={'5px'}
      borderLeftColor={getBorderColor()}
      borderRadius={'base'}
      padding={2}
      wordBreak={'break-word'}
    >
      <Box textDecoration={task.isDone ? 'line-through' : 'none'}>{title}</Box>
      <Box fontSize={'small'} color={'gray.500'}>{moment(task.createdAt).startOf('seconds').fromNow()}</Box>
    </Box>
    <HStack spacing={'24px'}>
      {isDone ?
        <FaUndoAlt
          color={'#DD6B20'}
          cursor={'pointer'}
          onClick={handleChange}
        />
        :
        <FaCheck
          color={'#68D391'}
          cursor={'pointer'}
          onClick={handleChange}
        />
      }
      <FaEdit color={'#00B5D8'} cursor={'pointer'} onClick={onOpenUpdate} />
      <FaTrash color={'#E53E3E'} cursor={'pointer'} onClick={onOpenDelete} />
    </HStack>
  </Flex>
  <ModalUpdate task={task} isOpen={isOpenUpdate} onClose={onCloseUpdate} onSubmit={onChange} />
  <ModalDelete task={task} isOpen={isOpenDelete} onClose={onCloseDelete} onSubmit={onChange} />
  </>;
};
