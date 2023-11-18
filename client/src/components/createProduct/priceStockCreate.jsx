import { Flex, FormControl, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react"
import CurrencyInput from "react-currency-input-field";


export const PriceStockCreate = ({ formik }) => {
    return (
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
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && formik.errors.price}
                        // 
                        // as={CurrencyInput}
                        variant="flushed"
                        size="sm"
                        placeholder="Rp 15.000"
                    // intlConfig={{ locale: "id-ID", currency: "IDR" }}
                    />
                    <FormHelperText textColor="#6a7a95">
                        min: Rp 5.000
                    </FormHelperText>
                    {formik.touched.price && formik.errors.price ? (
                        <Text textColor="red.500" fontSize="sm">
                            {formik.errors.price}
                        </Text>
                    ) : null}
                </FormControl>
            </Flex>
            {/* Stock */}
            <Flex flexDirection="column" gap={1} w="full">
                <FormControl isRequired>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                        Stock
                    </FormLabel>
                    <Input
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        error={formik.touched.stock && formik.errors.stock}
                        // 
                        // max={100}
                        // min={5}
                        type="number"
                        variant="flushed"
                        size="sm"
                        placeholder="10"
                    />
                    <FormHelperText textColor="#6a7a95">
                        min: 5, max: 100
                    </FormHelperText>
                    {formik.touched.stock && formik.errors.stock ? (
                        <Text textColor="red.500" fontSize="sm">
                            {formik.errors.stock}
                        </Text>
                    ) : null}
                </FormControl>
            </Flex>
        </Flex>
    )
}