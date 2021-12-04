import React, { useState } from 'react';
import { TodoRecord } from "../atoms/TodoRecord";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { IoFileTraySharp, IoListSharp } from "react-icons/io5";
import { FieldsCreate, ModalCreate } from "../atoms/modals/ModalCreate";
import { Priority } from "../atoms/Priority";
import { useGlobalToast } from "../../hooks/useGlobalToast";
import { ModalDelete } from "../atoms/modals/ModalDelete";
import { TPriority } from "../../types/common";

export interface RecordType extends TPriority {
  title: string;
  isDone: boolean;
}

export const Controller = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState<RecordType>();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const toast = useGlobalToast();

  const handleSubmit = (value: FieldsCreate) => {
    const indexRecord = records.findIndex(item => item.title === value.title);

    if (indexRecord !== -1) {
      const updateRecord = [...records];
      updateRecord[indexRecord] = { ...value, isDone: false };
      setRecords(updateRecord);
      onClose();
      toast('Updated successfully!', 'success');

      return;
    }

    const newRecord = [{ ...value, isDone: false }, ...records];
    setRecords(newRecord);
    onClose();
    toast('Created successfully!', 'success');
  };

  const handleChange = (index: number) => {
    const currentRecord = [...records];
    currentRecord[index] = { ...currentRecord[index], isDone: !currentRecord[index].isDone };
    setRecords(currentRecord);
    toast('Updated successfully!', 'success');
  };

  const handleDelete = () => {
    const currentRecord = records.filter(item => item.title !== deleteItem?.title);
    setRecords(currentRecord);
    onCloseDelete();
    toast('Deleted successfully!', 'success');
  };

  return <Flex
    direction={'column'}
    backgroundColor={'white'}
    borderRadius={'base'}
  >
    <Flex
      borderBottomWidth={'1px'}
      borderBottomColor={'gray.100'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={4}
    >
      <Flex alignItems={'center'}>
        <IoListSharp />
        <Box fontWeight={'bold'} marginLeft={2}>Tasks list</Box>
      </Flex>
      <Box>Total: {records.length}</Box>
    </Flex>
    {!records.length ? <Flex
      direction={'column'}
      width={'4xl'}
      height={'xs'}
      alignItems={'center'}
      justifyContent={'center'}
      fontWeight={'bold'}
      fontSize={'xl'}
      color={'gray.200'}
      padding={2}
    >
      <IoFileTraySharp />
      <Box>Empty</Box>
    </Flex>
      :
      <Box height={'xs'} overflow={'auto'}>
        {records.map((item, index) => <TodoRecord
          key={index}
          title={item.title}
          priority={item.priority}
          isDone={item.isDone}
          onChange={() => handleChange(index)}
          onDelete={() => {
            setDeleteItem(item);
            onOpenDelete();
          }}
        />
        )}
      </Box>
    }
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={4}
      borderTopWidth={'1px'}
      borderTopColor={'gray.100'}
    >
      <Flex direction={'column'}>
        <Box fontWeight={'bold'}>Priorities:</Box>
        <Priority priority={'high'} />
        <Priority priority={'medium'}/>
        <Priority priority={'low'} />
      </Flex>
      <Button
        backgroundColor={'blue.500'}
        color={'white'}
        _hover={{ backgroundColor: 'blue.400' }}
        _active={{ backgroundColor: 'blue.400' }}
        onClick={onOpen}
      >
        Add task
      </Button>
    </Flex>
    <ModalCreate isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    <ModalDelete item={deleteItem} isOpen={isOpenDelete} onClose={onCloseDelete} onSubmit={handleDelete} />
  </Flex>;
};
