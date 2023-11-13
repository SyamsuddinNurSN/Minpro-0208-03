import React from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Link,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Thead
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const MenuHistory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePayment = () => {
    console.log("Payment Method Selected");
  };

  const data = [
    {
      name: "Caramel Frappuccino",
      price: 395,
      quantity: 1,
      notes: "Notes: test notes",
    },
    {
      name: "Chocolate Frappuccino",
      price: 479,
      quantity: 2,
      notes: "Notes: test notes",
    },
    {
      name: "Peppermint Macchiato",
      price: 534,
      quantity: 1,
      notes: "Notes: test notes",
    },
  ];

  return (
    <Box>
      <Heading mb={5}>Menu History</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>${item.price}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.notes}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" mt={5}>
        <Button leftIcon={<StarIcon />}>Add to Favorites</Button>
        <Button colorScheme="blue" onClick={onOpen}>
          Pay with Cash App
        </Button>
      </Flex>

      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader >Pay with Cash App</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button colorScheme="green" onClick={handlePayment}>
                Select Payment Method
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default MenuHistory;
