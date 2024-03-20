import { Box, Button, Icon, Tooltip } from "@chakra-ui/react";
import { FaDatabase } from "react-icons/fa";
import { MdOutlineHideSource } from "react-icons/md";
import useInterfaceFlex from "../stores/useInterfaceFlex";

export default function LeftButtons() {
  const { flexRatio, setFlexRatio } = useInterfaceFlex((state) => state);
  const onlyCanvas = { canvas: 1.0, info: 0.0 };
  const withInformationRatio = { canvas: 0.8, info: 0.2 };
  const handleFlexRatio = () => {
    if (flexRatio.canvas === 1.0) {
      setFlexRatio(withInformationRatio);
    } else {
      setFlexRatio(onlyCanvas);
    }
  };

  return (
    <Box
      w="100px"
      position="absolute"
      bottom="2%"
      left="20px"
      p="20px"
      zIndex={2}
    >
      <Button
        _hover={{ color: "#ff007f" }}
        onClick={handleFlexRatio}
        p={0}
        m={0}
        cursor="pointer"
        border="none"
        variant="link"
      >
        {flexRatio ? (
          <Tooltip
            hasArrow
            label={"Show Information"}
            bg={"#333"}
            color={"#fff"}
            placement="top-start"
            zIndex={3}
            p="5px"
          >
            <span
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Icon className="button" as={FaDatabase} fontSize={"1.5em"} />
            </span>
          </Tooltip>
        ) : (
          <Tooltip hasArrow label={"Hide Information"} placement="top-start">
            <span
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Icon
                className="button"
                as={MdOutlineHideSource}
                fontSize={"1.5em"}
              />
            </span>
          </Tooltip>
        )}
      </Button>
    </Box>
  );
}
