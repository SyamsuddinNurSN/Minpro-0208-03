import { Flex, Icon, Image, Text } from "@chakra-ui/react";

import avaDummy from "../assets/ava-dummy.png";
import { CiSettings } from "react-icons/ci";

export const UserBarInfo = () => {
  return (
    <Flex flexDirection={"column"}>
      {/* User */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="full"
        gap={7}
        p="4"
        bg="white"
        borderRadius="xl"
      >
        <Image src={avaDummy} h="3rem" w="3rem" rounded="lg"></Image>
        <Flex flexDirection="column" justifyContent="start" alignItems="start">
          <Text color="#717171" fontSize="0.9rem">
            I'm a Cashier
          </Text>
          <Text fontWeight="semibold">John Doe</Text>
        </Flex>
        <Flex flexGrow="1" justifyContent="end" h="full">
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
