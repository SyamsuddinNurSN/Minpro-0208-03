import { Flex, FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea } from "@chakra-ui/react"
import CurrencyInput from "react-currency-input-field";

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

export const NameCategoryModal = () => {
    return (
        <Flex flexDirection="column" gap="7">
            {/* Name & Category */}
            <Flex
                gap="6"
                justifyContent="space-between"
                flexDirection="column"
            >
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl isRequired>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Product Name
                        </FormLabel>
                        <Input
                            // variant="flushed"
                            borderRadius="lg"
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
                            // variant="flushed"
                            borderRadius="lg"
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
            {/* Price & Stock */}
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                gap="6"
                justifyContent="space-between"
            >
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl isRequired>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Price
                        </FormLabel>
                        <Input
                            as={CurrencyInput}
                            // variant="flushed"
                            borderRadius="lg"
                            size="sm"
                            // type="number"
                            placeholder="Rp 15.000"
                            intlConfig={{ locale: "id-ID", currency: "IDR" }}
                        />
                        <FormHelperText textColor="#6a7a95">
                            min: Rp 5.000
                        </FormHelperText>
                    </FormControl>
                </Flex>
                {/* Stock */}
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl isRequired>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Stock
                        </FormLabel>
                        <NumberInput
                            max={100}
                            min={5}
                            defaultValue={1}
                            size="sm"
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText textColor="#6a7a95">
                            min: 5, max: 100
                        </FormHelperText>
                    </FormControl>
                </Flex>
            </Flex>
            {/* Desc & Image */}
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Product Description
                    </FormLabel>
                    <Textarea
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
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Product Image
                    </FormLabel>
                    <Input
                        variant="flushed"
                        size="sm"
                        type="file"
                        placeholder="Add product image"
                    />
                    <FormHelperText textColor="#6a7a95">
                        supported file: JPG, PNG, JPEG
                    </FormHelperText>
                </FormControl>
            </Flex>
        </Flex>
    )
}