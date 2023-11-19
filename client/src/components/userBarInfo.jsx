import { Flex, Icon, Image, Text } from "@chakra-ui/react";

import avaDummy from "../assets/ava-dummy.png";
import { CiSettings } from "react-icons/ci";

export const UserBarInfo = () => {
  const { token } = localStorage.getItem

  return (
    <Flex flexDirection={"column"}>
      {/* User */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="full"
        p="4"
        bg="white"
        borderRadius="xl"
      >
        <Flex>
          <Image src={avaDummy} h="3rem" w="3rem" rounded="lg"></Image>
        </Flex>
        <Flex flexDirection="column" justifyContent="start" alignItems="start" flexGrow="1" ml={{ md: "0.5rem", lg: "1.4rem" }}>
          <Text color="#717171" fontSize="0.9rem">
            I'm Admin
          </Text>
          <Text fontWeight="semibold">John Doe</Text>
        </Flex>
        <Flex justifyContent="end" h="full">
          <Icon
            as={CiSettings}
            h="3rem"
            w="3rem"
            p="0.4rem"
            textColor="#A4A4A4"
            _hover={{
              bg: "#4D81F1",
              color: "white",
            }}
            rounded="lg"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
