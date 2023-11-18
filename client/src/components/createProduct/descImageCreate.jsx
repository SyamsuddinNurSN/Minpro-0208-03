import { Flex, FormControl, FormHelperText, FormLabel, HStack, Icon, Image, Input, Text, Textarea } from "@chakra-ui/react"
import { IoCloudUploadOutline } from "react-icons/io5";

export const DescImageCreate = ({ formik }) => {
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


    return (
        <>
            <HStack>
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Product Description
                        </FormLabel>
                        <Textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            // 
                            variant="flushed"
                            size="sm"
                            type="text"
                            placeholder="Add product details..."
                            maxLength="120"
                        />
                        <FormHelperText textColor="#6a7a95">
                            max: 120 characters
                        </FormHelperText>
                        {formik.touched.description && formik.errors.description ? (
                            <Text textColor="red.500" fontSize="sm">
                                {formik.errors.description}
                            </Text>
                        ) : null}
                    </FormControl>
                </Flex>
            </HStack>
            {/* Image */}
            <HStack>
                <Flex flexDirection="column" gap={1} w="full">
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
                            border="2px"
                            borderColor="#b3bdcc"
                            borderStyle="dashed"
                            _hover={{
                                borderColor: "#719bf4",
                                bg: "#e7eefd",
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
                                    h="full"
                                    w="full"
                                    objectFit="cover"
                                    borderRadius="xl"
                                    opacity="70%"
                                />
                            )}{" "}
                            <Flex
                                flexDirection="column"
                                pos="absolute"
                                top="30%"
                                left="38%"
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
                </Flex>
            </HStack>
        </>
    )
}