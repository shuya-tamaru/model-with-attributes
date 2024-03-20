import { Flex } from "@chakra-ui/react";
import WebCanvas from "./components/WebCanvas";
import Interfaces from "./components/Interfaces";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Flex margin={"0 auto"} w="100%" h="100vh" position={"relative"}>
        <WebCanvas />
        <Interfaces />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
