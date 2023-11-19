import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BsCalendarDate } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { CategoryDelModal } from "./categoryDelModal";
import { CategoryEditModal } from "./categoryEditModal";
import { useState } from "react";

export const CategoryMap = ({ getItem, onCategoryDeleted, onCategoryUpdate }) => {
    const [isDelModalOpen, setDelModalOpen] = useState(false) // state modal for deleting category
    const [isEditModalOpen, setEditModalOpen] = useState(false) // state modal for editin category

    const openDelModal = () => {
        setDelModalOpen(true);
    }
    const openEditModal = () => {
        setEditModalOpen(true);
    }

    const closeDelModal = () => {
        setDelModalOpen(false);
    }
    const closeEditModal = () => {
        setEditModalOpen(false)
    }

    const newStartDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <>
            <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                py="0.8rem"
                px="1.2rem"
                bg="#F6FAFEFF"
                borderRadius="xl"
                border="1px"
                borderColor="#F6FAFEFF"
                boxShadow="sm"
                _hover={{
                    borderColor: "#719BF4",
                    transitionDuration: "0.4s",
                    transitionTimingFunction: "ease-in-out",
                }}
            >
                <Flex
                    bg="white"
                    p="0.6rem"
                    borderRadius="lg"
                    boxShadow="sm"
                >
                    <Image
                        src={`http://localhost:2000/${getItem?.img}`}
                        h="2rem"
                        w="2rem"
                        objectFit="cover"
                    ></Image>
                </Flex>
                <Text fontWeight="medium">{getItem?.categoryName}</Text>
                <Flex
                    alignItems="center"
                    gap="3"
                    mt="1"
                    // w="8vw"
                    display={{ base: "none", md: "flex" }}
                >
                    <Icon
                        as={BsCalendarDate}
                        fontSize="0.9rem"
                        textColor="#a6a6a6"
                        mb="0.2rem"
                    ></Icon>
                    <Text
                        fontWeight="medium"
                        fontSize="0.9rem"
                        textColor="#a6a6a6"
                    >
                        {newStartDate(getItem?.createdAt)}
                    </Text>
                </Flex>
                <Flex gap="0.7rem">
                    <Flex
                        p="0.6rem"
                        borderRadius="lg"
                        bg="#719bf4"
                        _hover={{
                            bg: "#4D81F1",
                            cursor: "pointer",
                            transitionDuration: "0.4s",
                            transitionTimingFunction: "ease-in-out",
                        }}
                        // onClick={() => {
                        //     handleEditModalClicked(getItem);
                        // }}
                        onClick={openEditModal}
                    >
                        <Icon as={HiPencil} textColor="white"></Icon>
                    </Flex>
                    <Flex
                        p="0.6rem"
                        borderRadius="lg"
                        bg="#e25050"
                        _hover={{
                            bg: "#dc2626",
                            cursor: "pointer",
                            transitionDuration: "0.4s",
                            transitionTimingFunction: "ease-in-out",
                        }}
                        // onClick={() => {
                        //     handleDelModalClicked(getItem);
                        // }}
                        onClick={openDelModal}
                    >
                        <Icon as={MdDelete} textColor="white"></Icon>
                    </Flex>
                </Flex>
            </Flex>
            {/* ------- Modals Rendering -------- */}
            <CategoryDelModal isOpen={isDelModalOpen} onClose={closeDelModal} getItem={getItem} onCategoryDeleted={onCategoryDeleted} />
            <CategoryEditModal isOpen={isEditModalOpen} onClose={closeEditModal} getItem={getItem} onCategoryUpdate={onCategoryUpdate} />
        </>
    )
}