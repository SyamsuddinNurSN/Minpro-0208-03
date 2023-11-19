import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCart, updateQuantity } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const BillsBar = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartItems = cart?.items ?? [];
  const [payment, setPayment] = useState();
  const [change, setChange] = useState(0);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePaymentChange = (event) => {
    const value = parseFloat(event.target.value);
    setPayment(value);
    calculateChange(value);
  };

  const calculateChange = (cashValue) => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const changeValue = cashValue - totalAmount;
    setChange(changeValue >= 0 ? changeValue : 0);
  };

  const handleCheckout = async () => {
    let totalPrice;
    try {
      totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const data = {
        total_amount: totalPrice,
        customer_amount: payment,
        change: change,
        cartItems: cartItems,
      };

      console.log(data);
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:2000/transactions", data,
      {
        headers :{
            Authorization: `Bearer ${token}`
          }
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
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
          {/* <Image src={avaDummy} h="3rem" w="3rem" rounded="lg"></Image> */}
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
            <Menu>
              <MenuButton>
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
              </MenuButton>
              <MenuList>
                <Link to="/profile">
                  <MenuItem>Your Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
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
        gap="4"
        overflowY="auto"
        // flexWrap="nowrap"
        pr="0.7rem"
        h="49vh"
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
          <Flex
            key={item.id}
            justifyContent="space-between"
            alignItems="stretch"
          >
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
                <ButtonGroup>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </Button>

                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Hapus
                </Button>
              </Flex>
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
                  {item.quantity}
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
              ></Text>
              <Text fontWeight="medium" textColor="#8A8A89" fontSize="1rem">
                {`${item.price * item.quantity}`}
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
          <Text fontWeight="semibold">Amount</Text>
          <Text fontWeight="semibold">
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold">Cash</Text>
          <input
            type="number"
            value={payment}
            onChange={handlePaymentChange}
            style={{
              fontWeight: "semibold",
              width: "4rem",
              textAlign: "right",
            }}
          />
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold">Change</Text>
          <Text fontWeight="semibold">{change}</Text>
        </Flex>
        <Button
          bg="#4D81F1"
          w="full"
          mt={2}
          textColor="white"
          fontSize="0.9rem"
          onClick={handleCheckout} // Add this onClick handler
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
