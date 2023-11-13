import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
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

const menuItem = [
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
  {
    name: "Caramel Macchiato",
    img: coffee1,
    price: "20.000",
    stock: "2",
    desc: "Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice. ",
  },
];

export const MenuGrid = () => {
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
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {menuItem.map((item) => (
          <GridItem colSpan={{ base: "6", md: "3", lg: "2" }}>
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
              // justifyContent="start"
            >
              <Box
                h="10rem"
                w="full"
                mb={2}
                overflow="hidden"
                borderRadius="xl"
              >
                <Image
                  src={item.img}
                  objectFit="cover"
                  transition="all .25s ease"
                  overflow="hidden"
                  borderRadius="xl"
                  _groupHover={{
                    transform: "scale(1.2)",
                  }}
                />
              </Box>
              <VStack spacing={4} alignItems="start" px={1}>
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="0.8rem" textColor="#757575">
                  {item.desc}
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
                    Qty: {item.stock}
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
              >
                Add to Billing
              </Button>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
