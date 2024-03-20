import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import useGetUserData from "../stores/useGetUserData";
import { BsDatabase } from "react-icons/bs";

export default function MeshInformation() {
  const information = useGetUserData((state) => state.information);
  const floor = information && information.floor ? information.floor : "";
  const part = information && information.part ? information.part : "";

  console.log(information);
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
    </Box>
  );
}
