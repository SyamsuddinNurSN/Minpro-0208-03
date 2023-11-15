import { Flex, FormControl, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import CurrencyInput from "react-currency-input-field";


export const PriceStockCreate = () => {
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
                        as={CurrencyInput}
                        variant="flushed"
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
                        variant="flushed"
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
    )
}