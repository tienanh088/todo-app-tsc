import React from 'react';
import { Task } from "../atoms/Task";
import { Box, Button, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { IoFileTraySharp, IoListSharp } from "react-icons/io5";
import { Priority } from "../atoms/Priority";
import { todoService } from "../../services";
import { ModalCreate } from "../atoms/modals/ModalCreate";
import { useQuery } from "react-query";
import { useGlobalToast } from "../../hooks/useGlobalToast";

export const Controller = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useGlobalToast();

  const { data: tasks, refetch, isLoading } = useQuery(
    'tasks',
    () => todoService.getTasks(),
    {
      onError: error => toast((error as Error).message, 'error')
    });

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
      <Box>Total: {isLoading ? 'counting...' : tasks?.length}</Box>
    </Flex>
    <Flex
      direction={'column'}
      width={'4xl'}
      height={'xs'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
    >
      {isLoading ? <Spinner
        size={'lg'}
        thickness={"4px"}
        color={"red.500"}
        emptyColor={"gray.200"}
      /> : !tasks?.length ? <Flex
        direction={'column'}
        fontWeight={'bold'}
        fontSize={'xl'}
        color={'gray.200'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <IoFileTraySharp />
        <Box>Empty</Box>
      </Flex>
        :
        <Box height={'xs'} width={'4xl'} overflow={'auto'}>
          {tasks.map((item, index) => <Task
            key={index}
            task={item}
            onChange={refetch}
          />
          )}
        </Box>}
    </Flex>
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
    <ModalCreate isOpen={isOpen} onClose={onClose} onSubmit={refetch} />
  </Flex>;
};
