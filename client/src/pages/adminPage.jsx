import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";

import { UserBarInfo } from "../components/userBarInfo";

import createImg from "../assets/adminPage/create-2.png";
import updateImg from "../assets/adminPage/list.png";
import categoryImg from "../assets/adminPage/category.png";
import salesImg from "../assets/adminPage/sales.png"
import { Link } from "react-router-dom";

const tabsContent = [
  {
    img: createImg,
    title: "Create Product",
    desc: "Add new drinks or food to your menu",
    route: "/create-product",
  },
  {
    img: updateImg,
    title: "Product List",
    desc: "See details and update your food or drinks",
    route: "/product-list",
  },
  {
    img: categoryImg,
    title: "Category",
    desc: "Add, Edit, Delete category",
    route: "/manage-category",
  },
  {
    img: salesImg,
    title: "Sales Report",
    desc: "keep track of your sales in one place",
    route: "/manage-category",
  },
];

export const AdminPage = () => {
  return (
    <>
      <SimpleSidebar />
      <Grid templateColumns="repeat(10, 1fr)" h="100vh">
        <GridItem
          colSpan={{ base: "10", md: "6", lg: "7" }}
          w="full"
          bg="#F6FAFEFF"
          // bg="#F9F8FB"
          pl={{ base: "3", md: "11vw", lg: "10vw" }}
          pr={{ base: "3", md: "1", lg: "5" }}
          py="7"
        >
          <Text
            fontSize={{ base: "1.3rem", md: "1.6rem" }}
            fontWeight="semibold"
            textColor="#1C2537"
          >
            Admin Page
          </Text>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={{ base: "3", lg: "4" }}
            mt="8"
          >
            {tabsContent.map((item) => (
              <GridItem
                colSpan={{ base: "2", lg: "1" }}
                bg="white"
                borderRadius="xl"
                p="6"
                border="1px"
                borderColor="#E2E8F0"
                role="group"
                _hover={{
                  border: "1px",
                  borderColor: "#4D81F1",
                  bg: "#E7EEFD9E",
                  transitionDuration: "0.4s",
                  transitionTimingFunction: "ease-in-out",
                  cursor: "pointer",
                }}
              >
                <Link to={item.route}>
                  <Flex flexDirection="row" gap="6" alignItems="center">
                    <Flex
                      p="4"
                      bg="#EDF2F7"
                      w="max-content"
                      borderRadius="full"
                      _groupHover={{
                        bg: "white",
                        transitionDuration: "0.4s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      <Image src={item.img} h="2.6rem" w="2.6rem"></Image>
                    </Flex>
                    <Flex flexDirection="column" gap="1">
                      <Text fontWeight="semibold">{item.title}</Text>
                      <Text textColor="#757575" fontSize="0.9rem" w="80%">
                        {item.desc}
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </GridItem>
        <GridItem
          colSpan={{ md: "4", lg: "3" }}
          w="full"
          bg="#F6FAFEFF"
          // bg="#F9F8FB"
          py="6rem"
          pl="1.5rem"
          pr={{ md: "1.2rem", lg: "4rem" }}
          display={{ base: "none", md: "block" }}
        >
          <UserBarInfo />
        </GridItem>
      </Grid>
    </>
  );
};
