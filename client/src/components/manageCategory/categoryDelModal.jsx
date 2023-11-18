import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { IoIosWarning } from "react-icons/io";

export const CategoryDelModal = ({ isOpen, onClose, getItem, onCategoryDeleted }) => {
    const toast = useToast();

    const [isDeleting, setIsDeleting] = useState(false)

    const handleCategoryDelete = async () => {
        setIsDeleting(true)

        try {
            await axios.delete(`http://localhost:2000/categories/${getItem?.id}`);
            setIsDeleting(false)
            onClose(); // closing modal after deletion
            // Trigger a callback or fetch updated data after deletion

            if (typeof onCategoryDeleted === 'function') {
                await onCategoryDeleted();
            }

            toast({
                title: `Success deleting ${getItem?.categoryName} category`,
                status: "success",
                duration: 3000,
                position: "top"
            })


        } catch (err) {
            console.log("Error deleting category", err);
            setIsDeleting(false)

            toast({
                title: "Error deleting category",
                status: "error",
                duration: 3000,
                position: "top",
            });

            // Handle error

        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mt="20vh" borderWidth="1px" borderColor="#E5E7E">
                    <ModalHeader>
                        <Flex justifyContent="center">
                            <Text>Delete Category</Text>
                            <ModalCloseButton />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexDirection="column" alignItems="center" gap="6" mt="1">
                            <Flex bg="#FEF9C3" borderRadius="full" p="4">
                                <Icon
                                    as={IoIosWarning}
                                    fontSize="3.5rem"
                                    textColor="#EAB308"
                                ></Icon>
                            </Flex>
                            <Text textColor="#6B7280" fontWeight="medium" fontSize="0.9rem">
                                Are you sure you want to delete{" "}
                                <strong style={{ color: "#3a3e45" }}>
                                    {getItem?.categoryName}
                                </strong>{" "}
                                category?
                            </Text>
                            <Text>{getItem?.id}</Text>
                        </Flex>
                    </ModalBody>
                    {/*  */}
                    <ModalFooter>
                        <Flex
                            w="full"
                            justifyContent="space-between"
                            gap="3"
                            px="4"
                            mb="2"
                        >
                            <Button
                                w="full"
                                bg="#DC2626"
                                textColor="white"
                                _hover={{ bg: "#c52020" }}
                                onClick={handleCategoryDelete}
                                isLoading={isDeleting}
                                loadingText="Deleting"
                                disabled={isDeleting}
                            >
                                Confirm
                            </Button>
                            <Button
                                w="full"
                                bg="white"
                                textColor="#6B7280"
                                border="1px"
                                borderColor="#E5E7EB"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}