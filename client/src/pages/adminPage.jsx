import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";

import { UserBarInfo } from "../components/userBarInfo";

import createImg from "../assets/adminPage/create.png";
import updateImg from "../assets/adminPage/update.png";
import categoryImg from "../assets/adminPage/category.png";

export const AdminPage = () => {
  return (
    <>
      {/* pl={{ base: "0", lg: "3.8vw" }} */}
      {/* bg="#F9F8FB" */}

      <SimpleSidebar />
      <Grid templateColumns="repeat(10, 1fr)" h="100vh">
        <GridItem colSpan="7" w="full" bg="#F9F8FB" pl="10vw" py="7">
          <Text
            fontSize={{ base: "1.3rem", lg: "1.6rem" }}
            fontWeight="semibold"
            textColor="#1C2537"
          >
            Admin Page
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap="8" mt="8">
            <GridItem colSpan="1" bg="white" borderRadius="xl" p="6">
              <Flex flexDirection="row">
                <Flex p="4" bg="#EDF2F7" w="max-content" borderRadius="full">
                  <Image src={createImg} h="3rem" w="3rem"></Image>
                </Flex>
                <Text>Create Product</Text>
              </Flex>
            </GridItem>
            <GridItem colSpan="1" bg="white" borderRadius="xl" p="6">
              <Text>Product List</Text>
            </GridItem>
            <GridItem colSpan="1" bg="white" borderRadius="xl" p="6">
              <Text>Product Category</Text>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          colSpan="3"
          w="full"
          bg="#F9F8FB"
          py="6rem"
          pl="1.5rem"
          pr="4rem"
        >
          <UserBarInfo />
        </GridItem>
      </Grid>
    </>
  );
};
