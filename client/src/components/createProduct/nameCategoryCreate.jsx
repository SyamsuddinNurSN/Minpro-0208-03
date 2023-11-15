import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"

const categoryOption = [
    { name: "All" },
    { name: "Coffee" },
    { name: "Frappe" },
    { name: "Juice" },
    { name: "Milk" },
    { name: "Tea" },
    { name: "Mojito" },
    { name: "Snack" },
    { name: "Rice" },
    { name: "Ramen" },
    { name: "Dessert" },
];

export const NameCategoryCreate = () => {
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
                        variant="flushed"
                        size="sm"
                        placeholder="Cappucino"
                    />
                </FormControl>
            </Flex>
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl isRequired>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Category
                    </FormLabel>
                    <Select
                        variant="flushed"
                        size="sm"
                        placeholder="select a category"
                    >
                        {categoryOption.map((item) => (
                            <option value="option1">{item.name}</option>
                        ))}
                    </Select>
                </FormControl>
            </Flex>
        </Flex>
    )
}