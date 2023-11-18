import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { InputEditModal } from "./editModalSub/InputEditModal"
import { useEffect, useState } from "react"
import axios from "axios"
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useFormik } from "formik";

export const EditProductModal = ({ isOpen, onClose, productData, onProductEdit }) => {

    const editProductSchema = Yup.object().shape({
        name: Yup.string(),
        categoryId: Yup.number(),
        price: Yup.number().min(5000),
        stock: Yup.number().min(5).max(100),
        description: Yup.string().max(200),
        img: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            categoryId: null,
            price: null,
            stock: null,
            description: "",
            img: ""
        },
        validationSchema: editProductSchema,
        onSubmit: async (values, action) => {
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("categoryId", values.categoryId);
                formData.append("price", values.price);
                formData.append("stock", values.stock);
                formData.append("description", values.description);
                formData.append("img", values.img);

                await axios.patch(`http://localhost:2000/products/update/${productData.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                action.resetForm();
                onClose()

                if (typeof onProductEdit === 'function') {
                    await onProductEdit();
                }

                // success toast
                toast.success('Product Update Success', {
                    position: toast.POSITION.TOP_CENTER,
                    // onClose: onClose, // Close modal on toast close
                    autoClose: 2000
                });

            } catch (err) {
                console.log(err);
                toast.error('Error updating product. Please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000
                });
            }
        }
    })

    return (
        <>
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
                            <form onSubmit={formik.handleSubmit}>
                                {/* Inputs */}
                                <InputEditModal productData={productData} formik={formik} />
                                <Flex w="full" justifyContent="space-between" gap="3" mt="2rem">
                                    <Button
                                        w="full"
                                        bg="#4D81F1"
                                        textColor="white"
                                        _hover={{ bg: "#4675DB" }}
                                        type="submit"
                                    >
                                        Save
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
                            </form>
                        </Flex>
                    </ModalBody>
                    {/*  */}
                </ModalContent>
            </Modal>
        </>
    );
}