import { Button, Flex, Grid, GridItem, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserBarInfo } from "../components/userBarInfo";
import { BiCategoryAlt } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { CategoryMap } from "../components/manageCategory/categoryMap";
import { CategoryAddModal } from "../components/manageCategory/categoryAddModal";

export const CategoryManagePage = () => {
    const [categoryData, setCategoryData] = useState([]) // set data from database

    const [isAddModalOpen, setAddModalOpen] = useState(false)

    const openAddModal = () => {
        setAddModalOpen(true)
    }
    const closeAddModal = () => {
        setAddModalOpen(false)
    }

    const getCategory = async () => {
        try {
            await axios.get(`http://localhost:2000/categories`).then((response) => {
                setCategoryData(response.data.result.rows)
                console.log(response.data.result.rows);
            })
        } catch (err) {
            console.log("error fetching data", err);
        }
    }

    // Fetch the updated category data after deletion
    const handleCategoryDeleted = async () => {
        await getCategory();
    };

    // Fetch the updated category data after editing
    const handleCategoryUpdated = async () => {
        await getCategory();
    };

    console.log(categoryData);

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <SimpleSidebar />
            <Grid templateColumns="repeat(10, 1fr)" h="100vh">
                <GridItem
                    w="full"
                    // bg="#F9F8FB"
                    bg="#F6FAFEFF"
                    px="5"
                    colSpan={{ base: "10", lg: "7" }}
                    pl={{ md: "3vw", lg: "10vw" }}
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
                                    fontSize={{ base: "1.3rem", lg: "1.5rem" }}
                                    fontWeight="semibold"
                                    textColor="#1C2537"
                                >
                                    Manage Product Category
                                </Text>
                                <Icon
                                    as={BiCategoryAlt}
                                    fontSize="2.2rem"
                                    textColor="#999999"
                                />
                            </HStack>
                            <Flex flexDirection="column" pt="2.4rem" gap="3">
                                {/* map */}
                                {categoryData.map((item) => (
                                    <CategoryMap getItem={item} onCategoryDeleted={handleCategoryDeleted} onCategoryUpdate={handleCategoryUpdated} />
                                ))}
                                <Button
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="white"
                                    borderRadius="xl"
                                    border="1px"
                                    borderColor="#719BF4"
                                    borderStyle="dashed"
                                    py="2.3rem"
                                    boxShadow="sm"
                                    gap="3"
                                    _hover={{
                                        bg: "#E7EEFD9E",
                                        transitionDuration: "0.4s",
                                        transitionTimingFunction: "ease-in-out",
                                        cursor: "pointer",
                                    }}
                                    onClick={openAddModal}
                                >
                                    <Icon
                                        as={IoAdd}
                                        fontSize="1.2rem"
                                        textColor="#719BF4"
                                    ></Icon>
                                    <Text fontWeight="medium" textColor="#719BF4">
                                        Add new
                                    </Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </VStack>
                </GridItem>
                {/* Right bar */}
                <GridItem
                    colSpan="3"
                    w="full"
                    // bg="#F9F8FB"
                    bg="#F9F8FB"
                    py="9"
                    pl="1.5rem"
                    pr="4rem"
                    display={{ base: "none", lg: "block" }}
                >
                    <UserBarInfo />
                </GridItem>
            </Grid>
            {/* ------- Modals Rendering -------- */}
            <CategoryAddModal isOpen={isAddModalOpen} onClose={closeAddModal} />
        </>
    );
};
