import React, { useEffect, useState } from 'react';
import { Task } from "../atoms/Task";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { IoFileTraySharp, IoListSharp } from "react-icons/io5";
import { Priority } from "../atoms/Priority";
import { ITask } from "../../types/common";
import { todoService } from "../../services";
import { ModalCreate } from "../atoms/modals/ModalCreate";

export const Controller = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchTasks = async () => {
    const result = await todoService.getTasks();
    setTasks(result);
  };

  useEffect(() => {
    fetchTasks().then();
  }, []);

  const handleChange = async () => {
    await fetchTasks().then();
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
      <Box>Total: {tasks.length}</Box>
    </Flex>
    {!tasks.length ? <Flex
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
        {tasks.map((item, index) => <Task
          key={index}
          task={item}
          onChange={handleChange}
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
    <ModalCreate isOpen={isOpen} onClose={onClose} onSubmit={handleChange} />
  </Flex>;
};
