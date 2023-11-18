import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { IoIosWarning } from "react-icons/io";
import axios from "axios";
import { toast } from 'react-toastify';

export const StatusProductModal = ({ isOpen, onClose, productData, onStatusUpdate }) => {

    const handleStatusChange = async () => {
        try {
            console.log("changing status...");
            const response = await axios.patch(`http://localhost:2000/products/${productData.id}`, {
                isActive: !productData.isActive,
            });

            console.log(response);
            onClose()

            if (typeof onStatusUpdate === 'function') {
                await onStatusUpdate();
            }

            // success toast
            toast.success('Product Status updated successfully!', {
                position: toast.POSITION.TOP_CENTER,
                // onClose: onClose, // Close modal on toast close
                autoClose: 2000
            });
        } catch (err) {
            console.log("Error updating product status", err);
            toast.error('Error updating product. Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000
            });
        }
    }

    return (
        <>
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
                                <Icon
                                    as={IoIosWarning}
                                    fontSize="3.5rem"
                                    textColor="#EAB308"
                                ></Icon>
                            </Flex>
                            <Text textColor="#6B7280" fontWeight="medium" fontSize="0.9rem">
                                Are you sure you want to {!productData.isActive ? (<strong style={{ color: "#35b1ab" }}>activate</strong>) : (<strong style={{ color: "#e25050" }}>deactivate</strong>)} {productData.name} ?
                            </Text>
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
                                bg={!productData.isActive ? ("#298985") : ("#DC2626")}
                                textColor="white"
                                onClick={handleStatusChange}
                            // #237672
                            >
                                Confirm
                            </Button>
                            <Button
                                w="full"
                                bg="white"
                                textColor="#6B7280"
                                border="1px"
                                borderColor="#E5E7EB"
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