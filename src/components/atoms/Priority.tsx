import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { TPriority } from "../../types/common";

export const Priority = (props: TPriority) => {
  const { priority } = props;

  const getColor = () => {
    if (priority === 'high') return 'red.500';
    if (priority === 'medium') return 'orange.500';
    if (priority === 'low') return 'green.500';
  };

  return <Flex alignItems={'center'}>
    <Box width={'2.25rem'} borderBottomWidth={'5px'} borderBottomColor={getColor()}/>
    <Box marginLeft={2} textTransform={'capitalize'}>{priority}</Box>
  </Flex>;
};
