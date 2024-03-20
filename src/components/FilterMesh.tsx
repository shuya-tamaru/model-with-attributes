import { Center, Flex, Icon, Select, Text } from "@chakra-ui/react";
import { RiFilter3Line } from "react-icons/ri";
import useFloorSelector from "../stores/useFloorSelector";
import usePartFilter from "../stores/usePartFilter";

export default function FilterMesh() {
  const setFloor = useFloorSelector((state) => state.setFloor);
  const setPart = usePartFilter((state) => state.setPart);

  const handleFloorSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFloor = e.target.value;
    setFloor(selectedFloor ? selectedFloor : null);
  };

  const handlePartSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPart = e.target.value;
    setPart(selectedPart ? selectedPart : null);
  };
  return (
    <>
      <Flex>
        <Icon as={RiFilter3Line} boxSize={5} />
        <Text ml="10px" fontWeight={"semibold"} fontSize={"14px"}>
          フィルター
        </Text>
      </Flex>
      <Flex w="100%" mt="5px">
        <Center flex={0.2} justifyContent={"start"}>
          <Text fontWeight={"semibold"}>階</Text>
        </Center>
        <Select
          placeholder="全ての階"
          w="250px"
          flex={1.0}
          bg="#fff"
          fontSize={"14px"}
          borderRadius={2}
          borderColor={"#ccc"}
          onChange={handleFloorSelector}
        >
          <option value="1F">1F</option>
          <option value="2F">2F</option>
          <option value="3F">3F</option>
          <option value="4F">4F</option>
          <option value="RF">RF</option>
          <option value="外構">外構</option>
        </Select>
      </Flex>
      <Flex w="100%" mt="5px">
        <Center flex={0.2} justifyContent={"start"}>
          <Text fontWeight={"semibold"}>部位</Text>
        </Center>
        <Select
          placeholder="全ての部位"
          w="250px"
          bg="#fff"
          flex={1.0}
          fontSize={"14px"}
          borderRadius={2}
          borderColor={"#ccc"}
          onChange={handlePartSelector}
        >
          <option value="外壁">外壁</option>
          <option value="内壁">内壁</option>
          <option value="床">床</option>
          <option value="天井">天井</option>
        </Select>
      </Flex>
    </>
  );
}
