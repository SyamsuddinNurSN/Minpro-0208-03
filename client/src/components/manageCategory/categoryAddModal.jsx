import { Button, Flex, FormControl, FormLabel, Icon, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react"
import { IoCloudUploadOutline } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from "axios";

export const CategoryAddModal = ({ isOpen, onClose }) => {
    const toast = useToast();

    const handleFileSelect = (e) => {
        // Set the file within Formik's state
        formik.setFieldValue("img", e.currentTarget.files[0]);

        // Optional: If you want to preview the selected image
        const reader = new FileReader();
        reader.onload = (event) => {
            // Update the image preview when a file is selected
            const imgPreview = document.getElementById("image-preview");
            if (imgPreview) {
                imgPreview.src = event.target.result;
            }
        };
        reader.readAsDataURL(e.currentTarget.files[0]);

    };

    const addCategorySchema = Yup.object().shape({
        categoryName: Yup.string().required("Category name is required"),
        img: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            categoryName: "",
            img: null,
        },
        validationSchema: addCategorySchema,
        onSubmit: async (values, action) => {
            try {
                const formData = new FormData();
                formData.append("categoryName", values.categoryName);
                formData.append("img", values.img)
                console.log(formData);

                await axios.post('http://localhost:2000/categories', formData);

                toast({
                    title: "Success adding new category",
                    status: "success",
                    duration: 3000,
                    position: "top"
                })
                action.resetForm()
                window.location.reload()

            } catch (err) {
                // handle error
                console.log(err);
                toast({
                    title: "Error",
                    status: "error",
                    duration: 3000,
                    position: "top",
                });
            }
        }
    })


    return (
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
                                <label htmlFor="dropzone" style={{ display: "none" }}>
                                    Upload Image
                                </label>
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
                                    onClick={() => document.getElementById("dropzone").click()} // Open file dialog on div click
                                >
                                    {/* Image preview */}
                                    {formik.values.img && (
                                        <Image
                                            id="image-preview"
                                            src={URL.createObjectURL(formik.values.img)}
                                            h="8rem"
                                            w="8rem"
                                            objectFit="cover"
                                            borderRadius="xl"
                                            opacity="60%"
                                        />
                                    )}{" "}
                                    <Flex
                                        flexDirection="column"
                                        pos="absolute"
                                        top="32%"
                                        left="32%"
                                        alignItems="center"
                                        gap="1"
                                    >
                                        <Icon
                                            as={IoCloudUploadOutline}
                                            fontSize="2rem"
                                            mb="0.4rem"
                                            opacity="70%"
                                        />
                                        <Text fontSize="1.2rem" fontWeight="semibold">
                                            {formik.values.img ? "Change Image" : "Upload Image"}
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
                                        onChange={(e) => {
                                            formik.setFieldValue("img", e.currentTarget.files[0]);
                                            handleFileSelect(e); // Call handleFileSelect to handle additional functionalities
                                        }}
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
                                    placeholder="new category"
                                />
                            </FormControl>
                            {/* Buttons */}
                            <Flex
                                w="full"
                                justifyContent="space-between"
                                gap="3"
                                mt="2.2rem"
                                mb="0.2rem"
                            >
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
    );
}