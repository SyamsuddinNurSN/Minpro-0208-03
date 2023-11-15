import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";
import { UserBarInfo } from "../components/userBarInfo";

import coffee1 from "../assets/menuDummy/coffee-1.jpg";
import { HiPencil } from "react-icons/hi";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiTag } from "react-icons/fi";
import { FaCircleInfo } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";

export const ProductDetailPage = () => {

  return (
    <>
      <SimpleSidebar />
      <Grid templateColumns="repeat(10, 1fr)" h="100vh">
        <GridItem
          colSpan={{ base: "10", md: "6", lg: "7" }}
          w="full"
          bg="#F9F8FB"
          pl={{ base: "3", md: "11vw", lg: "13vw" }}
          pr={{ base: "3", md: "1", lg: "5" }}
          py="7"
        >
          <Flex flexDirection="column" justifyContent={{ base: "start", lg: "center" }} alignItems="start" h="full" gap={{ base: "3", lg: "6" }}>
            {/* BreadCrumb */}
            <Flex>
              <Breadcrumb spacing='8px' bg="#EDF2F7 " py="0.5rem" px="0.8rem " borderRadius="lg" separator={<ChevronRightIcon color='gray.500' fontSize="1.2rem" mb="0.2rem" />}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="product-list" fontWeight="medium" fontSize="0.9rem" textColor="#55606D">Product List</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#' fontSize="0.9rem" fontWeight="medium" textColor="#55606D">Caramel Macchiato</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            {/* Card */}
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              justifyContent="start"
              bg="white"
              borderRadius="xl"
              p="0.6rem"
              gap={{ base: "0.5rem", lg: "2.5rem" }}
              boxShadow="lg"
            >
              <Image
                src={coffee1}
                borderRadius="xl"
                h="18rem"
                w={{ base: "full", lg: "20rem" }}
                objectFit="cover"
              />
              <Flex
                flexDirection="column"
                py="0.7rem"
                pr={{ base: "1rem", lg: "2rem" }}
                pl={{ base: "1rem", lg: "0" }}
                justifyContent="space-between"
                alignItems="start"
                w={{ base: "full", lg: "25rem" }}
                gap={{ base: "8", lg: "4" }}
              >
                <Flex flexDirection="column" gap="2">
                  <Text fontWeight="bold" fontSize="1.5rem" textColor="#263238">
                    Caramel Macchiato
                  </Text>
                  <Text
                    fontWeight="medium"
                    fontSize="0.9rem"
                    textColor="#898989"
                    mt={{ base: "2", lg: "0" }}
                  >
                    Espresso combined with vanilla-flavoured syrup, milk and
                    caramel sauce over ice.
                  </Text>
                </Flex>
                <Flex flexDirection="column" gap="1">
                  <Flex alignItems="center" gap="2">
                    <Icon as={FiTag} fontSize="1rem" textColor="#a6a6a6"></Icon>
                    <Text
                      fontWeight="medium"
                      fontSize="1rem"
                      textColor="#a6a6a6"
                    >
                      Coffee
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="2">
                    {/* CiSquareInfo */}
                    <Icon as={FaCircleInfo} fontSize="1rem" textColor="#46C8C1" ></Icon>
                    <Text
                      fontWeight="semibold"
                      fontSize="1rem"
                      textColor="#46C8C1"
                    >
                      Active
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDirection={{ base: "column", lg: "row" }} justifyContent="space-between" w="full" gap={{ base: "6", lg: "0" }}>
                  <Flex flexDirection="column" gap="2">
                    <Text
                      fontWeight="semibold"
                      fontSize="1rem"
                      textColor="#898989"
                    >
                      Stock: 20
                    </Text>
                    <Flex gap="1" alignItems="end">
                      <Text
                        fontWeight="bold"
                        fontSize="0.7rem"
                        textColor="#4D81F1"
                      >
                        Rp
                      </Text>
                      <Text
                        fontWeight="bold"
                        fontSize="1.3rem"
                        textColor="#4D81F1"
                        lineHeight="none"
                      >
                        20.000
                      </Text>
                    </Flex>
                  </Flex>
                  {/* Status */}
                  <Flex alignItems="end" gap="3">
                    {/* THIS IS THE BUTTON TO OPEN THE MODAL */}
                    <Button
                      alignItems="center"
                      bg="#f2f2f2"
                      py="0.4rem"
                      px={{ base: "6", lg: "5" }}
                      gap="2"
                      borderRadius="lg"
                      role="group"
                      w="full"
                      _hover={{
                        bg: "#263238",
                      }}
                    >
                      <Text textColor="#808080" fontWeight="medium" _groupHover={{ textColor: "white" }}>
                        Status
                      </Text>
                      <Icon as={RxUpdate} textColor="#808080" fontSize="1rem" _groupHover={{ textColor: "white" }}></Icon>
                    </Button>
                    <Button
                      alignItems="center"
                      bg="#DBEAFE"
                      py="0.4rem"
                      px={{ base: "5", lg: "3" }}
                      gap="2"
                      borderRadius="lg"
                      role="group"
                      w="full"
                      _hover={{
                        bg: "#4D81F1",
                      }}
                    >
                      <Text textColor="#4D81F1" fontWeight="medium" _groupHover={{ textColor: "white" }}>
                        Edit
                      </Text>
                      <Icon as={HiPencil} textColor="#4D81F1" _groupHover={{ textColor: "white" }}></Icon>
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={{ md: "4", lg: "3" }}
          w="full"
          bg="#F9F8FB"
          pt={{ md: "7.5vh", lg: "45vh" }}
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
