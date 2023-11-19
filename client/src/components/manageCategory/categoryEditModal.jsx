import {
    Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast,
} from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { toast } from 'react-toastify';
import { useRef, useState } from "react";

export const CategoryEditModal = ({ isOpen, onClose, getItem, onCategoryUpdate }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const updateCategorySchema = Yup.object().shape({
        categoryName: Yup.string(),
        img: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            categoryName: "",
            img: null
        },
        validationSchema: updateCategorySchema,
        onSubmit: async (values, action) => {
            try {
                const formData = new FormData();
                formData.append("categoryName", values.categoryName);
                formData.append("img", values.img);
                console.log(formData);

                await axios.patch(`http://localhost:2000/categories/${getItem?.id}`, formData);

                onClose()

                if (typeof onCategoryUpdate === 'function') {
                    await onCategoryUpdate();
                }

                // success toast
                toast.success('Category updated successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    // onClose: onClose, // Close modal on toast close
                    autoClose: 2000
                });

                action.resetForm()

            } catch (err) {
                console.log(err);
                // error toast
                toast.error('Error updating category. Please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000
                });
            }
        }
    })

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        formik.setFieldValue('img', event.currentTarget.files[0]);
    };

    console.log(getItem);


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    {/*  */}
                    <ModalBody>
                        <Flex flexDirection="column" gap="2rem" py="1rem" w="full">
                            {/* Img */}
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl>
                                    <Flex
                                        justifyContent="center"
                                        alignItems="center"
                                        cursor="pointer"
                                        h="30vh"
                                        pos="relative"
                                        bg="#f0f2f5"
                                        borderRadius="xl"
                                        border="1px"
                                        borderColor="#f0f2f5"
                                        _hover={{
                                            borderColor: "#b3bdcc",
                                            borderStyle: "dashed",
                                            borderWidth: "2px",
                                            transitionDuration: "0.2s",
                                            transitionTimingFunction: "ease-in-out",
                                        }}
                                        onClick={handleImageClick}
                                    >
                                        {/* Conditional rendering bg image */}
                                        {formik.values.img ? (
                                            <Image src={URL.createObjectURL(formik.values.img)} h="9rem" w="9rem" opacity="55%" borderRadius="xl" objectFit="cover" />
                                        ) : (
                                            <Image src={`http://localhost:2000/${getItem?.img}`} h="9rem" w="9rem" opacity="55%" borderRadius="xl" objectFit="cover" />
                                        )}
                                        <Flex
                                            flexDirection="column"
                                            pos="absolute"
                                            top="40%"
                                            left="32%"
                                            alignItems="center"
                                            gap="1"
                                            opacity="90%"
                                        >
                                            <Text fontSize="1.2rem" fontWeight="semibold">
                                                Upload Image
                                            </Text>
                                            <Text fontSize="0.8rem" fontWeight="medium">
                                                JPG, JPEG, or PNG{" "}
                                            </Text>
                                        </Flex>
                                        <Input
                                            id="dropzone"
                                            type="file"
                                            name="img"
                                            display="none"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </Flex>
                                </FormControl>
                                {/* Category Name */}
                                <FormControl isRequired mt="5">
                                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                                        Category Name
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="categoryName"
                                        value={formik.values.categoryName}
                                        onChange={formik.handleChange}
                                        // 
                                        variant="flushed"
                                        size="sm"
                                        placeholder={getItem?.categoryName}
                                    />
                                </FormControl>
                                {/* Buttons */}
                                <Flex w="full" justifyContent="space-between" gap="3" mt="2.2rem" mb="0.2rem">
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
                    {/* <ModalFooter>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
};
