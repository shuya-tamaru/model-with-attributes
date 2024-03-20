import { Flex } from "@chakra-ui/react";
import WebCanvas from "./components/WebCanvas";
import Interfaces from "./components/Interfaces";
import LeftButtons from "./components/LeftButtons";

function App() {
  return (
    <Flex margin={"0 auto"} w="100%" h="100vh" position={"relative"}>
      {/* <LeftButtons /> */}
      <WebCanvas />
      <Interfaces />
    </Flex>
  );
}

export default App;
