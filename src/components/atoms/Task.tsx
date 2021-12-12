import React from 'react';
import { Box, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { FaCheck, FaEdit, FaTrash, FaUndoAlt } from "react-icons/fa";
import { ITask } from "../../types/common";
import { ModalUpdate } from "./modals/ModalUpdate";
import { ModalDelete } from "./modals/ModalDelete";
import { todoService } from "../../services";
import { useGlobalToast } from "../../hooks/useGlobalToast";
import moment from "moment";

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

  const getBorderColor = () => {
    if (priority === 'high') return 'red.500';
    if (priority === 'medium') return 'orange.500';
    if (priority === 'low') return 'green.500';
  };

  const handleDelete = async () => {
    id && await todoService.deleteTask(id);
    toast('Deleted successfully!', 'success');
    onCloseDelete();
    onChange();
  };

  const handleUpdate = async (task: ITask) => {
    const { id, ...data } = task;
    const now = moment(new Date(), 'DD/MM/YYYY HH:mm').valueOf();
    try {
      id && await todoService.updateTask(id, { ...data, updatedAt: now });
      toast('Updated successfully!', 'success');
      onCloseUpdate();
      onChange();
    } catch (error) {
      toast((error as Error).message, 'error');
    }
  };

  const handleChange = async () => {
    id && await todoService.updateTask(id, { ...task, isDone: !isDone });
    toast('Updated successfully!', 'success');
    onChange();
  };

  return <><Flex
    flex={1}
    width={'4xl'}
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
  <ModalUpdate task={task} isOpen={isOpenUpdate} onClose={onCloseUpdate} onSubmit={handleUpdate} />
  <ModalDelete task={task} isOpen={isOpenDelete} onClose={onCloseDelete} onSubmit={handleDelete} />
  </>;
};
