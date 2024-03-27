import { Center, Flex, Icon, Select, Text } from "@chakra-ui/react";
import { RiFilter3Line } from "react-icons/ri";
import useFilter from "../stores/useFilter";

export default function FilterMesh() {
  const filters = useFilter((state) => state.filters);
  const { currentFilter, setCurrentFilter } = useFilter((state) => state);

  const handleFilterSelector = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    const value = e.target.value;
    setCurrentFilter({ ...currentFilter, [key]: value });
  };

  return (
    <>
      <Flex>
        <Icon as={RiFilter3Line} boxSize={5} />
        <Text ml="10px" fontWeight={"semibold"} fontSize={"14px"}>
          Filters
        </Text>
      </Flex>
      {filters.map((filter, index) => {
        const key: string = Object.keys(filter)[0];
        const values: string[] = Object.values(filter)[0];
        return (
          <Flex w="100%" mt="5px" key={index}>
            <Center flex={0.2} justifyContent={"start"} fontSize={"14px"}>
              <Text fontWeight={"semibold"}>{key.toUpperCase()}</Text>
            </Center>
            <Select
              placeholder={`All_${key.toUpperCase()}`}
              w="250px"
              flex={1.0}
              bg="#fff"
              fontSize={"14px"}
              borderRadius={2}
              borderColor={"#ccc"}
              onChange={(e) => handleFilterSelector(e, key)}
            >
              {values.map((value, index) => {
                return (
                  <option key={index + "val"} value={value}>
                    {value}
                  </option>
                );
              })}
            </Select>
          </Flex>
        );
      })}
    </>
  );
}
