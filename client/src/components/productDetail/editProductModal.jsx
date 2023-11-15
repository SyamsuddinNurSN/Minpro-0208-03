import { Button, Flex, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { NameCategoryCreate } from "../createProduct/nameCategoryCreate"
import { PriceStockCreate } from "../createProduct/priceStockCreate"
import { DescImageCreate } from "../createProduct/descImageCreate"
import { NameCategoryModal } from "./editModalSub/NameCategoryModal"

export const EditProductModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            flexDirection="column"
                            bg="white"
                            py="1rem"
                            alignItems="stretch"
                            borderRadius="xl"
                            gap="4"
                        >
                            {/* Name & Category */}
                            <NameCategoryModal />
                        </Flex>
                    </ModalBody>
                    {/*  */}
                    <ModalFooter>
                        <Flex w="full" justifyContent="space-between" gap="3" mb="2">
                            <Button w="full" bg="#4D81F1" textColor="white" _hover={{ bg: "#4675DB" }}>Save</Button>
                            <Button w="full" bg="white" textColor="#6B7280" border="1px" borderColor="#E5E7EB" onClick={onClose}>
                                Close
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}