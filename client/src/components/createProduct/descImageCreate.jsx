import { Flex, FormControl, FormHelperText, FormLabel, HStack, Input, Textarea } from "@chakra-ui/react"

export const DescImageCreate = () => {
    return (
        <>
            <HStack>
                <Flex flexDirection="column" gap={1} w="full">
                    <FormControl>
                        <FormLabel fontSize="0.9rem" fontWeight="medium">
                            Product Description
                        </FormLabel>
                        <Textarea
                            variant="flushed"
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
            </HStack>
            {/* Image */}
            <HStack>
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
            </HStack>
        </>
    )
}