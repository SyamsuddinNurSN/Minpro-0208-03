import { Box, Button, Flex, GridItem, Icon, Image, Text, VStack } from "@chakra-ui/react"
import { FaCircleInfo } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ProductDataMap = ({ getItem }) => {
    const navigate = useNavigate()

    return (
        <>
            <GridItem colSpan={{ base: "6", md: "3", lg: "2" }}>
                <VStack
                    flexDirection="column"
                    bg="white"
                    borderRadius="xl"
                    p={4}
                    border="1px"
                    borderColor="white"
                    role="group"
                    _hover={{
                        border: "1px",
                        borderColor: "#4D81F1",
                        bg: "#E7EEFD9E",
                        transitionDuration: "0.4s",
                        transitionTimingFunction: "ease-in-out",
                    }}
                >
                    <Box
                        h="12rem"
                        w="full"
                        mb={2}
                        overflow="hidden"
                        borderRadius="xl"
                    >
                        <Image
                            src={`http://localhost:2000/${getItem.img}`}
                            objectFit="cover"
                            transition="all .25s ease"
                            overflow="hidden"
                            borderRadius="xl"
                            _groupHover={{
                                transform: "scale(1.2)",
                            }}
                        />
                    </Box>
                    <VStack spacing="1rem" alignItems="start" px={1} w="full">
                        <Flex flexDirection="column" gap="0.3rem">
                            <Text fontWeight="semibold">{getItem.name}</Text>
                            <Flex gap="0.5rem" alignItems="center">
                                <Icon
                                    as={FiTag}
                                    fontSize="0.9rem"
                                    textColor="#757575"
                                    mb="0.1rem"
                                ></Icon>
                                <Text
                                    fontWeight="medium"
                                    fontSize="0.9rem"
                                    textColor="#757575"
                                >
                                    {getItem?.Category?.categoryName}
                                </Text>
                            </Flex>
                        </Flex>
                        <Text fontSize="0.8rem" textColor="#757575">
                            {getItem.description}
                        </Text>
                        <Flex alignItems="center" gap="2">
                            {getItem.isActive ? (
                                <>
                                    <Icon
                                        as={FaCircleInfo}
                                        fontSize="0.9rem"
                                        textColor="#46C8C1"
                                        mb="0.1rem"
                                    ></Icon>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize="0.9rem"
                                        textColor="#46C8C1"
                                    >
                                        Active
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Icon
                                        as={FaCircleInfo}
                                        fontSize="0.9rem"
                                        textColor="#ea7b7b"
                                        mb="0.1rem"
                                    ></Icon>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize="0.9rem"
                                        textColor="#ea7b7b"
                                    >
                                        Disabled
                                    </Text>
                                </>
                            )}
                        </Flex>
                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            gap={3}
                            justifyContent="space-between"
                            w="full"
                        >
                            <Text fontWeight="bold" fontSize="1.2rem" textColor="#4D81F1">
                                Rp {getItem.price}
                            </Text>
                            <Text
                                fontSize="0.9rem"
                                fontWeight="medium"
                                textColor="#8A8A89"
                            >
                                stock: {getItem.stock}
                            </Text>
                        </Flex>
                    </VStack>
                    <Button
                        bg="#4D81F1"
                        w="full"
                        mt={2}
                        textColor="white"
                        fontSize="0.9rem"
                        _hover={{
                            bg: "#4675DB",
                        }}
                        onClick={() => navigate(`/product-detail/${getItem.id}`)}
                    >
                        Update
                    </Button>
                </VStack>
            </GridItem >
        </>
    )
}