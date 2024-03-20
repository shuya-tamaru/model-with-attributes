import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Flex,
  Icon,
  Text,
  Center,
} from "@chakra-ui/react";
import useGetUserData from "../stores/useGetUserData";
import { BsDatabase } from "react-icons/bs";
import { LuMousePointerClick } from "react-icons/lu";

export default function MeshInformation() {
  const information = useGetUserData((state) => state.information);
  const floor = information && information.floor ? information.floor : "";
  const part = information && information.part ? information.part : "";

  return (
    <Box mt="40px">
      <Flex>
        <Icon as={BsDatabase} boxSize={5} />
        <Text ml="10px" fontWeight={"semibold"} fontSize={"14px"}>
          データ
        </Text>
      </Flex>
      <TableContainer mt="5px">
        <Table size={"sm"}>
          <Tbody fontSize={"13px"}>
            <Tr>
              <Td
                border={"1px solid #888"}
                w="100px"
                bg="#999"
                color={"#fff"}
                fontWeight={"semibold"}
              >
                階
              </Td>
              <Td border={"1px solid #999"}>{floor}</Td>
            </Tr>
            <Tr>
              <Td
                border={"1px solid #888"}
                w="100px"
                bg="#999"
                color={"#fff"}
                fontWeight={"semibold"}
              >
                部位
              </Td>
              <Td border={"1px solid #999"}>{part}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Center mt="5px" fontSize="12px" w="100%" justifyContent={"start"}>
        <Icon as={LuMousePointerClick} boxSize={5} />
        <Text ml="5px" fontWeight={"semibold"}>
          {"Meshをダブルクリックでデータ取得"}
        </Text>
      </Center>
    </Box>
  );
}
