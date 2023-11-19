import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const ProductPagination = ({ page, goToPreviousPage, goToNextPage }) => {
    return (
        <Flex justifyContent="center" alignItems="center" mt="2" gap="0.6rem">
            <Flex
                onClick={goToPreviousPage}
                alignItems="center"
                gap="0.3rem"
                border="2px"
                borderColor="#E2E8F0"
                // bg="#eef2f6"
                pr="3"
                pl="2"
                py="0.4rem"
                borderRadius="lg"
                role="group"
                _hover={{
                    cursor: "pointer",
                    borderColor: "#4D81F1",
                    bg: "#E7EEFD9E",
                    transitionDuration: "0.4s",
                    transitionTimingFunction: "ease-in-out",
                }}
            >
                <Icon as={IoIosArrowBack} textColor="#6e7491"></Icon>
                <Text textColor="#6e7491" fontWeight="medium">
                    Prev
                </Text>
            </Flex>
            <Flex
                border="2px"
                borderColor="#E2E8F0"
                px="4"
                py="0.4rem"
                borderRadius="lg"
            >
                <Text textColor="#585c74" fontWeight="medium">
                    {page}
                </Text>
            </Flex>
            <Flex
                onClick={goToNextPage}
                alignItems="center"
                gap="0.3rem"
                border="2px"
                borderColor="#E2E8F0"
                pr="2"
                pl="3"
                py="0.4rem"
                borderRadius="lg"
                role="group"
                _hover={{
                    cursor: "pointer",
                    borderColor: "#4D81F1",
                    bg: "#E7EEFD9E",
                    transitionDuration: "0.4s",
                    transitionTimingFunction: "ease-in-out",
                }}
            >
                <Text textColor="#6e7491" fontWeight="medium">
                    Next
                </Text>
                <Icon as={IoIosArrowForward} textColor="#6e7491"></Icon>
            </Flex>
        </Flex>
    );
};

// #E5E7EB
