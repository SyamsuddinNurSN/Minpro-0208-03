import { Flex, FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"

export const NameCategoryCreate = ({ formik }) => {
    const [categoryList, setCategoryList] = useState([])

    // fetching category list data
    const getCategoryList = async () => {
        try {
            await axios.get('http://localhost:2000/categories').then((response) => {
                setCategoryList(response.data.result.rows)
            })
        } catch (err) {
            console.log("error fetching data:", err);
        }
    }

    console.log(categoryList);

    useEffect(() => {
        getCategoryList();
    }, [])

    return (
        <Flex
            gap="6"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
        >
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl isRequired>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Product Name
                    </FormLabel>
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && formik.errors.name}
                        // 
                        type="text"
                        variant="flushed"
                        size="sm"
                        placeholder="Cappucino"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <Text textColor="red.500" fontSize="sm">
                            {formik.errors.name}
                        </Text>
                    ) : null}
                </FormControl>
            </Flex>
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl isRequired>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Category
                    </FormLabel>
                    <Select
                        name="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        error={formik.touched.categoryId && formik.errors.categoryId}
                        // 
                        variant="flushed"
                        size="sm"
                        placeholder="select a category"
                    >
                        {categoryList?.map((item) => (
                            <option id={item?.id} value={item?.id}>{item?.categoryName}</option>
                        ))}
                    </Select>
                </FormControl>
            </Flex>
        </Flex>
    )
}