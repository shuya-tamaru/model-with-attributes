import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import useInformationTabVisible from "../stores/useInformationTabVisible";
import { FaDatabase } from "react-icons/fa";

export default function Interfaces() {
  const { visible, setVisible } = useInformationTabVisible((state) => state);

  return (
    <Box
      bg="red"
      w="400px"
      h="100%"
      position="absolute"
      left={"100%"}
      p="20px"
      zIndex={2}
      transition="all 0.3s ease-in-out"
      transform={!visible ? "translateX(-100%)" : "none"}
    >
      <Box
        w="40px"
        h="30px"
        bg={"#333"}
        color={"#fff"}
        shadow={"md"}
        cursor={"pointer"}
        position={"absolute"}
        top="20px"
        left="-40px"
        lineHeight={"20px"}
        borderRadius={"3px 0 0 3px "}
        borderRight={"none"}
        display={"block"}
        _hover={{ opacity: 0.8 }}
        onClick={() => setVisible(!visible)}
      >
        <Center w="100%" h="100%">
          <Icon
            as={!visible ? RiArrowRightDoubleLine : RiArrowLeftDoubleLine}
            boxSize={20}
          />
          <Icon as={FaDatabase} boxSize={14} />
        </Center>
      </Box>
      <Text>Hello</Text>
    </Box>
  );
}
