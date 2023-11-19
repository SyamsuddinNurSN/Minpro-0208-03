import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";

import coffee1 from "../assets/menuDummy/coffee-1.jpg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";

export const MenuGridCashier = () => {
  const [products, setProducts] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/products/active");
      setProducts(response.data.allProduct);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);

  useEffect(() => {
    getData();
  }, []);

  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    const { id, name, price, quantity } = item;
    dispatch(addToCart({ id, name, price, quantity }));
  };
  return (
    <>
      <HStack mt={{ base: "2", lg: "3" }} justifyContent="space-between">
        <Text
          fontSize={{ base: "1.1rem", lg: "1.3rem" }}
          fontWeight="semibold"
          textColor="#55606D"
        >
          Coffee Menu
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            fontWeight="medium"
            textColor="#55606D"
            rightIcon={<ChevronDownIcon />}
          >
            Sort by
          </MenuButton>
          <MenuList>
            <MenuItem>Name (A-Z)</MenuItem>
            <MenuItem>Name (Z-A)</MenuItem>
            <MenuItem>Price (Ascending)</MenuItem>
            <MenuItem>Price (Descending)</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        {products?.map((item) => (
          <GridItem key={item.id} colSpan={{ base: "6", md: "3", lg: "2" }}>
            <VStack
              flexDirection="column"
              bg="white"
              borderRadius="xl"
              p={4}
              border="1px"
              borderColor="white"
              role="group"
              _hover={{
                border: "1px",
                borderColor: "#4D81F1",
                bg: "#E7EEFD9E",
                transitionDuration: "0.4s",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              <Box
                h="12rem"
                w="full"
                mb={2}
                overflow="hidden"
                borderRadius="xl"
              >
                <Image
                  src={`http://localhost:2000/${item.img}`}
                  objectFit="cover"
                  transition="all .25s ease"
                  overflow="hidden"
                  borderRadius="xl"
                  _groupHover={{
                    transform: "scale(1.2)",
                  }}
                />
              </Box>
              <VStack spacing="1rem" alignItems="start" px={1} w="full">
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="0.8rem" textColor="#757575">
                  {item.description}
                </Text>
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  gap={3}
                  // justifyItems="between"
                  justifyContent="space-between"
                  w="full"
                >
                  <Text fontWeight="bold" fontSize="1.2rem" textColor="#4D81F1">
                    Rp {item.price}
                  </Text>
                  <Text
                    fontSize="0.9rem"
                    fontWeight="medium"
                    textColor="#8A8A89"
                  >
                    stock: {item.stock}
                  </Text>
                </Flex>
              </VStack>
              <Button
                bg="#4D81F1"
                w="full"
                mt={2}
                textColor="white"
                fontSize="0.9rem"
                _hover={{
                  bg: "#4675DB",
                }}
                onClick={() => handleAddToCart(item)}
              >
                add to cart
              </Button>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
