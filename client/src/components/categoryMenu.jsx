import { Flex, Image, Text } from "@chakra-ui/react";

import allImg from "../assets/restaurant-menu.png";
import coffeImg from "../assets/coffee-cup.png";
import mojitoImg from "../assets/mojito.png";
import bobaImg from "../assets/bubble-tea.png";
import frappeImg from "../assets/frappe.png";
import snackImg from "../assets/kebab.png";
import milkshakeImg from "../assets/milkshake.png";
import ramenImg from "../assets/ramen.png";
import riceImg from "../assets/curry.png";
import teaImg from "../assets/tea.png";
import juiceImg from "../assets/sangria.png";
import dessertImg from "../assets/mochi.png";

const categoryItem = [
  { img: allImg, name: "All..." },
  { img: coffeImg, name: "Coffee" },
  { img: frappeImg, name: "Frappe" },
  { img: juiceImg, name: "Juice" },
  { img: milkshakeImg, name: "Milk" },
  { img: teaImg, name: "Tea" },
  { img: mojitoImg, name: "Mojito" },
  { img: snackImg, name: "Snack" },
  { img: riceImg, name: "Rice" },
  { img: ramenImg, name: "Ramen" },
  { img: dessertImg, name: "Dessert" },
];

export const CategoryMenu = () => {
  return (
    <Flex
      pl={{ base: "145vw", md: "51vw", lg: "9vw" }}
      flexWrap="nowrap"
      w="full"
      alignItems="center"
      justifyContent="center"
      gap={3}
      overflowX="auto"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      {categoryItem.map((item) => (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          border="1px"
          borderColor="#E2E8F0"
          bgColor="#FFFFFF"
          gap={4}
          px={6}
          py={2}
          borderRadius="xl"
          _hover={{
            borderColor: "#4D81F1",
            bg: "#E7EEFD9E",
            transitionDuration: "0.4s",
            transitionTimingFunction: "ease-in-out",
            cursor: "pointer",
          }}
        >
          <Image src={item.img} h="2rem" w="2rem" mt={2}></Image>
          <Text
            fontSize="0.9rem"
            textColor="#999db2"
            fontWeight="medium"
            // height="0.9rem"
          >
            {item.name}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
