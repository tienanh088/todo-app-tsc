import React from 'react';
import { Controller } from "./components/molecules/Controller";
import { Flex } from "@chakra-ui/react";

function App() {
  return <Flex
    direction={'column'}
    width={'100vw'}
    height={'100vh'}
    alignItems={'center'}
    justifyContent={'center'}
    backgroundColor={'gray.100'}
  >
    <Controller />
  </Flex>;
}

export default App;
