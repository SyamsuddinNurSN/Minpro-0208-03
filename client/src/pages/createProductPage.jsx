import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";

import avaDummy from "../assets/ava-dummy.png";
import { CiSettings } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

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

export const CreateProductPage = () => {
  return (
    <>
      <SimpleSidebar />
      <Flex
        templateColumns="repeat(9, 1fr)"
        pl={{ base: "0", lg: "3.8vw" }}
        // h="100vh"
        bg="#F9F8FB"
      >
        <VStack w="full" bg="#F9F8FB" pl="12vw" py="7">
          <Flex
            flexDirection="column"
            w="50vw"
            bg="white"
            py="2.6rem"
            px="4rem"
            borderRadius="xl"
            alignItems="stretch"
          >
            <HStack justifyContent="space-between" w="full">
              <Text
                fontSize={{ base: "1.3rem", lg: "1.6rem" }}
                fontWeight="semibold"
                textColor="#1C2537"
              >
                Create Product
              </Text>
              <Icon
                as={IoCreateOutline}
                fontSize="1.8rem"
                textColor="#A4A4A4"
              />
            </HStack>
            <VStack mt="10" alignItems="stretch" spacing="10">
              {/* Name & Category */}
              <HStack gap="6" justifyContent="space-between">
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
              </HStack>
              {/* Price & Stock  */}
              <HStack gap="6" justifyContent="space-between">
                <Flex flexDirection="column" gap={1} w="full">
                  <FormControl isRequired>
                    <FormLabel fontSize="0.9rem" fontWeight="medium">
                      Price
                    </FormLabel>
                    <Input
                      variant="flushed"
                      size="sm"
                      type="number"
                      placeholder="Rp 15.000"
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
                    <NumberInput max={100} min={5} variant="flushed">
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
              </HStack>
              {/* Description */}
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
              <Button
                bg="#4D81F1"
                w="full"
                mt={2}
                textColor="white"
                fontSize="0.9rem"
                _hover={{
                  bg: "#4675DB",
                }}
              >
                Submit
              </Button>
            </VStack>
          </Flex>
        </VStack>
        {/* Right bar */}
        <Flex pr="6" py="7" w="full" justifyContent="start" ml="6">
          <Flex flexDirection={"column"}>
            {/* User */}
            <Flex
              justifyContent="space-between"
              alignItems="center"
              w="full"
              gap={7}
              p="4"
              bg="white"
              borderRadius="xl"
            >
              <Image src={avaDummy} h="3rem" w="3rem" rounded="lg"></Image>
              <Flex
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <Text color="#717171" fontSize="0.9rem">
                  I'm a Cashier
                </Text>
                <Text fontWeight="semibold">John Doe</Text>
              </Flex>
              <Flex flexGrow="1" justifyContent="end" h="full">
                <Icon
                  as={CiSettings}
                  h="3rem"
                  w="3rem"
                  p="0.4rem"
                  textColor="#A4A4A4"
                  _hover={{
                    bg: "#4D81F1",
                    color: "white",
                  }}
                  rounded="lg"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
