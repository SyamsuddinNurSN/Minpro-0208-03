import { Button, Flex, Grid, GridItem, HStack, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ProductDataMap } from "./productList/productDataMap";
// import notFoundImg from "../assets/not_found-removebg.png"
import notFoundImg from "../assets/not_found2_copy.png"

export const MenuGrid = ({ productData, setProductData }) => {

  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {productData && productData.length > 0 ? (
          // If productData is defined and not empty, map over it
          productData.map((item) => (
            <ProductDataMap getItem={item} key={item.id} />
          ))
        ) : (
          // Show a message or placeholder when productData is empty
          // <Text>No products available</Text>
          <GridItem colSpan={6} mt="3rem" mb={{ base: "3rem", md: "5rem", lg: "4rem" }}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Image src={notFoundImg} h="12rem" w="12rem" mr="0.6rem"></Image>
              <Flex flexDirection="column" alignItems="center" gap="0.5rem">
                <Text fontSize={{ base: "1.6rem", md: "1.8rem" }} fontWeight="semibold">Product Not Found</Text>
                <Text textAlign="center" maxW={{ base: "80vw", md: "40vw", lg: "20vw" }}>Looks like we don't have the products you're looking for</Text>
              </Flex>
            </Flex>
          </GridItem>
        )}
        <GridItem colSpan={6}>
          <Link to="/create-product">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              role="group"
              p={4}
              h="full"
              gap={4}
              _hover={{
                cursor: "pointer",
                bg: "#e7eefd",
                border: "2px",
                borderStyle: "dashed",
                borderColor: "#4D81F1",
                borderRadius: "xl",
                transitionDuration: "0.4s",
                transitionTimingFunction: "ease-out",
              }}
            >
              <Flex borderRadius="lg" p="0.6rem" bg="#e7eefd">
                <Icon
                  as={IoAdd}
                  textColor="#4D81F1"
                  fontSize="2.6rem"
                  _groupHover={{
                    transform: "scale(1.3)",
                    transitionDuration: "0.4s",
                    transitionTimingFunction: "ease-out",
                  }}
                ></Icon>
              </Flex>
              <Text fontWeight="semibold" textColor="#4D81F1" fontSize="1.1rem">
                Add Product
              </Text>
            </Flex>
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};
