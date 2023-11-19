import { Flex, Image, Text } from "@chakra-ui/react";

import allImg from "../assets/restaurant-menu.png";
import { useEffect, useState } from "react";
import axios, { all } from "axios";


export const CategoryMenu = () => {
  const [categoryData, setCategoryData] = useState([])

  const fetchCategoryData = async () => {
    try {
      await axios.get('http://localhost:2000/categories').then((response) => {
        setCategoryData(response.data.result.rows)
      })
    } catch (err) {
      console.log(err);
    }
  }

  console.log(categoryData);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <Flex
      pl={{ base: "145vw", md: "51vw", lg: "15vw" }}
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
      {/* All category */}
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
        <Image src={allImg} h="2rem" w="2rem" mt={2}></Image>
        <Text
          fontSize="0.9rem"
          textColor="#999db2"
          fontWeight="medium"
        // height="0.9rem"
        >
          All...
        </Text>
      </Flex>
      {/* Map categories */}
      {categoryData.map((item) => (
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
          <Image src={`http://localhost:2000/${item.img}`} h="2rem" w="2rem" mt={2}></Image>
          <Text
            fontSize="0.9rem"
            textColor="#999db2"
            fontWeight="medium"
          // height="0.9rem"
          >
            {item.categoryName}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
