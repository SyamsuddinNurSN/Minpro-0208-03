import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { IoIosWarning } from "react-icons/io";

export const StatusProductModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mt="30vh" borderWidth="1px" borderColor="#E5E7E">
                    <ModalHeader>
                        <Flex justifyContent="center">
                            <Text>Change Product Status</Text>
                            <ModalCloseButton />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexDirection="column" alignItems="center" gap="6" mt="1">
                            <Flex bg="#FEF9C3" borderRadius="full" p="4">
                                <Icon as={IoIosWarning} fontSize="3.5rem" textColor="#EAB308"></Icon>
                            </Flex>
                            <Text textColor="#6B7280" fontWeight="medium" fontSize="0.9rem">Are you sure you want to <strong style={{ color: "#e25050" }}>deactivate</strong>  this product?</Text>

                        </Flex>
                    </ModalBody>
                    {/*  */}
                    <ModalFooter>
                        <Flex w="full" justifyContent="space-between" gap="3" px="4" mb="2">
                            <Button w="full" bg="#DC2626" textColor="white" _hover={{ bg: "#c52020" }}>Confirm</Button>
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