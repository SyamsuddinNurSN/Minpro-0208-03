import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import avaDummy from "../assets/ava-dummy.png";
import { useDispatch, useSelector } from "react-redux";
import espressoImg from "../assets/menuDummy/espresso-1.jpg";
import { removeFromCart, selectCart, updateQuantity } from "../redux/cartSlice";


  


export const BillsBar = () => {
const dispatch = useDispatch();
const cart = useSelector(selectCart)
const cartItems = cart?.items?? []
 
const handleUpdateQuantity = (id, newQuantity) => {
  dispatch(updateQuantity({ id, quantity: newQuantity }));
};

const handleRemoveFromCart = (id) => {
  dispatch(removeFromCart(id));
};
  return (
    <Flex
      flexDirection="column"
      pos={{ base: "none", lg: "fixed" }}
      pl="1.4rem"
      pr="1rem"
      gap="6"
    >
      <Flex flexDirection={"column"}>
        {/* User Info */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="full"
          gap={7}
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
              fontSize="3rem"
              p="0.4rem"
              textColor="#A4A4A4"
              _hover={{
                transitionDuration: "0.4s",
                transitionTimingFunction: "ease-in-out",
                bg: "#4D81F1",
                color: "white",
                cursor: "pointer",
              }}
              rounded="lg"
            />
          </Flex>
        </Flex>
      </Flex>
      {/* Bills */}
      <Text fontSize="1.3rem" fontWeight="semibold">
        Bills
      </Text>
      {/* Product map */}
      <Flex
        flexDirection="column"
        gap="8"
        overflowY="auto"
        // flexWrap="nowrap"
        pr="0.7rem"
        h="58vh"
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "10px",
            bg: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            bg: "#bfbfbf",
          },
        }}
      >
        {cartItems.map((item) => (
          <Flex key={item.id}justifyContent="space-between" alignItems="stretch">
            <Flex alignItems="center">
              <Image
                src={item.img}
                h="4rem"
                w="5rem"
                objectFit="cover"
                borderRadius="xl"
              ></Image>
            </Flex>
            <Flex
              flexDirection="column"
              flexGrow="1"
              ml="4"
              justifyContent="space-between"
              py="0.2rem"
            >
              <Text fontWeight="semibold" fontSize="0.9rem">
                {item.name}
              </Text>
              <Flex>
                <Text
                  mr="1"
                  fontWeight="medium"
                  textColor="#8A8A89"
                  fontSize="0.9rem"
                >
                 {item.price} x
                </Text>
                <Text fontWeight="medium" fontSize="0.9rem">
                 quantity: {item.quantity}
                </Text>
              </Flex>
            </Flex>
            <Flex alignSelf="end" py="0.2rem">
              <Text
                align="start"
                mr="2"
                fontSize="0.7rem"
                fontWeight="semibold"
                textColor="#8A8A89"
              >
                
              </Text>
              <Text fontWeight="medium" textColor="#8A8A89" fontSize="1rem">
                {}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      {/* Total & Checkout*/}
      <Flex
        flexDirection="column"
        flexGrow="1"
        mt="1rem"
        gap="2"
        borderTop="1px"
        borderTopStyle="dashed"
        borderTopColor="#b3b3b3"
        pt="3"
      >
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold">Total</Text>
          <Text fontWeight="semibold">Rp 60.000</Text>
        </Flex>
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
          Checkout
        </Button>
      </Flex>
    </Flex>
  );
};
