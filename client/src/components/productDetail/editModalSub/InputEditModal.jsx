import { Flex, FormControl, FormHelperText, FormLabel, Icon, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import CurrencyInput from "react-currency-input-field";

export const InputEditModal = ({ onClose, productData, formik }) => {
    const [categoryList, setCategoryList] = useState([])

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);


    const getCategoryList = async () => {
        try {
            await axios.get('http://localhost:2000/categories').then((response) => {
                setCategoryList(response.data.result.rows)
            })
        } catch (err) {
            console.log("error fetching category data", err);
        }
    }

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

    console.log(categoryList);

    useEffect(() => {
        getCategoryList();
    }, [])

    return (
        <Flex flexDirection="column" gap="7">
            {/* Name & Category */}
            <Flex
                gap="6"
                justifyContent="space-between"
                flexDirection="column"
            >

                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Product Name
                        </FormLabel>
                        <Input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            // variant="flushed"
                            type="text"
                            borderRadius="lg"
                            size="sm"
                            placeholder={productData?.name}
                        />
                    </FormControl>
                </Flex>
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Category
                        </FormLabel>
                        <Select
                            name="categoryId"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                            // 
                            borderRadius="lg"
                            size="sm"
                            placeholder="select a category"
                        >
                            {categoryList.map((item) => (
                                <option id={item?.id} value={item?.id}>{item?.categoryName}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>
            </Flex>
            {/* Price & Stock */}
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                gap="6"
                justifyContent="space-between"
            >
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Price
                        </FormLabel>
                        <Input
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            // 
                            // variant="flushed"
                            borderRadius="lg"
                            size="sm"
                            // type="number"
                            placeholder={productData?.price}
                        // as={CurrencyInput}
                        // intlConfig={{ locale: "id-ID", currency: "IDR" }}
                        />
                        <FormHelperText textColor="#6a7a95">
                            min: Rp 5.000
                        </FormHelperText>
                    </FormControl>
                </Flex>
                {/* Stock */}
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Stock
                        </FormLabel>
                        <Input
                            name="stock"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            // max={100}, min={5}
                            type="number"
                            // variant="flushed"
                            size="sm"
                            placeholder="10"
                            borderRadius="lg"
                        />
                        <FormHelperText textColor="#6a7a95">
                            min: 5, max: 100
                        </FormHelperText>
                    </FormControl>
                </Flex>
            </Flex>
            {/* Desc */}
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Product Description
                    </FormLabel>
                    <Textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        // variant="flushed"
                        borderRadius="lg"
                        size="sm"
                        type="text"
                        placeholder="Add product details..."
                        maxLength="120"
                    />
                    <FormHelperText textColor="#6a7a95">
                        max: 120 characters
                    </FormHelperText>
                </FormControl>
            </Flex>
            {/* Image */}
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl>
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        h="30vh"
                        pos="relative"
                        bg="#f0f2f5"
                        borderRadius="xl"
                        borderWidth="2px"
                        borderColor="#f0f2f5"
                        borderStyle="dashed"
                        _hover={{
                            borderColor: "#b3bdcc",
                            transitionDuration: "0.2s",
                            transitionTimingFunction: "ease-in-out",
                        }}
                        onClick={handleImageClick}
                    >
                        {/* Conditional rendering bg image */}
                        {formik.values.img ? (
                            <Image src={URL.createObjectURL(formik.values.img)} h="100%" w="100%" opacity="65%" borderRadius="xl" objectFit="cover" />
                        ) : (
                            <Image src={`http://localhost:2000/${productData?.img}`} h="100%" w="100%" opacity="65%" borderRadius="xl" objectFit="cover" />
                        )}
                        <Flex
                            flexDirection="column"
                            pos="absolute"
                            top="%"
                            left="32%"
                            alignItems="center"
                            gap="1"
                            opacity="90%"
                        >
                            <Icon
                                as={IoCloudUploadOutline}
                                fontSize="2rem"
                                mb="0.4rem"
                                opacity="70%"
                            />
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
            </Flex>
        </Flex>
    )
}