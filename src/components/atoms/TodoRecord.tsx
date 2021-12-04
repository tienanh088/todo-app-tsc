import React from 'react';
import { Box, Flex, HStack } from "@chakra-ui/react";
import { FaCheck, FaTrash, FaUndoAlt } from "react-icons/fa";
import { TPriority } from "../../types/common";

interface TodoRecordProps extends TPriority {
    title: string;
    isDone: boolean;
    onChange: () => void;
    onDelete: () => void;
}

export const TodoRecord = (props: TodoRecordProps) => {
  const { title, priority, isDone, onChange, onDelete } = props;

  const getBorderColor = () => {
    if (priority === 'high') return 'red.500';
    if (priority === 'medium') return 'orange.500';
    if (priority === 'low') return 'green.500';
  };

  return <Flex
    flex={1}
    width={'4xl'}
    borderBottomWidth={'1px'}
    borderBottomColor={'gray.100'}
    padding={2}
    alignItems={'center'}
    justifyContent={'space-between'}
    backgroundColor={isDone ? 'blue.100' : 'unset'}
  >
    <Box
      textDecoration={isDone ? 'line-through' : 'none'}
      borderLeftWidth={'5px'}
      borderLeftColor={getBorderColor()}
      borderRadius={'base'}
      padding={2}
      wordBreak={'break-word'}
    >
      {title}
    </Box>
    <HStack spacing={'24px'}>
      {isDone ?
        <FaUndoAlt
          color={'#DD6B20'}
          cursor={'pointer'}
          onClick={onChange}
        />
        :
        <FaCheck
          color={'#68D391'}
          cursor={'pointer'}
          onClick={onChange}
        />
      }
      <FaTrash color={'#E53E3E'} cursor={'pointer'} onClick={onDelete} />
    </HStack>
  </Flex>;
};
