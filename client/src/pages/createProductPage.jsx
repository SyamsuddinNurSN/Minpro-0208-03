import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";

import { IoCreateOutline } from "react-icons/io5";
import { UserBarInfo } from "../components/userBarInfo";
import { NameCategoryCreate } from "../components/createProduct/nameCategoryCreate";
import { PriceStockCreate } from "../components/createProduct/priceStockCreate";
import { DescImageCreate } from "../components/createProduct/descImageCreate";

export const CreateProductPage = () => {
  return (
    <>
      <SimpleSidebar />
      <Grid templateColumns="repeat(10, 1fr)" h="100vh">
        <GridItem
          w="full"
          bg="#F9F8FB"
          px="5"
          colSpan={{ base: "10", lg: "7" }}
          pl={{ base: "0", md: "3vw", lg: "10vw" }}
          py={{ base: "5", md: "9" }}
        >
          <VStack w="full" bg="#F9F8FB" pl={{ base: "0", md: "8vw" }}>
            <Flex
              flexDirection="column"
              bg="white"
              py="2.6rem"
              alignItems="stretch"
              borderRadius="xl"
              w={{ base: "92vw", md: "78vw", lg: "50vw" }}
              px={{ base: "1.8rem", md: "4rem" }}
            >
              <HStack justifyContent="space-between" w="full">
                <Text
                  fontSize={{ base: "1.3rem", lg: "1.6rem" }}
                  fontWeight="semibold"
                  textColor="#1C2537"
                >
                  Create Product
                </Text>
                <Icon
                  as={IoCreateOutline}
                  fontSize="1.8rem"
                  textColor="#A4A4A4"
                />
              </HStack>
              <VStack mt="10" alignItems="stretch" spacing="12">
                {/* Name & Category */}
                <NameCategoryCreate />
                {/* Price & Stock  */}
                <PriceStockCreate />
                {/* Description & Image*/}
                <DescImageCreate />
                <Button
                  bg="#4D81F1"
                  w="full"
                  mt={2}
                  textColor="white"
                  fontSize="0.9rem"
                  _hover={{
                    bg: "#4675DB",
                  }}
                >
                  Submit
                </Button>
              </VStack>
            </Flex>
          </VStack>
        </GridItem>
        {/* Right bar */}
        <GridItem
          colSpan="3"
          w="full"
          bg="#F9F8FB"
          py="9"
          pl="1.5rem"
          pr="4rem"
          display={{ base: "none", lg: "block" }}
        >
          <UserBarInfo />
        </GridItem>
      </Grid>
    </>
  );
};
