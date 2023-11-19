import { PhoneIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";

import { CiSearch } from "react-icons/ci";
import { CategoryMenu } from "./categoryMenu";
import { MenuGrid } from "./menuGrid";

export const MenuHead = () => {
  return (
    <VStack align="stretch" spacing={{ base: "3", lg: "6" }}>
      {/* Search bar */}
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        gap={{ base: "3" }}
      >
        <Text
          fontSize={{ base: "1.3rem", lg: "1.6rem" }}
          fontWeight="semibold"
          textColor="#1C2537"
          ml="1"
        >
          Menu TASmart
        </Text>
        <InputGroup
          w={{ base: "full", lg: "20rem" }}
          bg="white"
          borderRadius="lg"
          borderColor="#E2E8F0"
        >
          <InputRightElement pointerEvents="none">
            <Icon as={CiSearch} color="#92929E" h="1.3rem" w="1.3rem" />
          </InputRightElement>
          <Input
            type="tel"
            placeholder="Search category or menu.."
            textColor="#92929E"
          />
        </InputGroup>
      </Flex>
      {/* Category slider */}
      <HStack>
        <CategoryMenu />
      </HStack>
      {/* Menu Grid */}
      <MenuGrid />
    </VStack>
  );
};
