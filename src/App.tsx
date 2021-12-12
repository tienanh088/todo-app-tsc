import React from 'react';
import { Controller } from "./components/molecules/Controller";
import { Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}>
    <Flex
      direction={'column'}
      width={'100vw'}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={'gray.100'}
    >
      <Controller />
    </Flex>
  </QueryClientProvider>;
}

export default App;
