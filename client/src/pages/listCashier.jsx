import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListIcon,
  IconButton,
  Grid,
  Flex,
  Text,
  Image,
  Divider,
  Icon,
  Button,
  Radio,
  RadioGroup,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { MdCheckCircle, MdDelete, MdEdit } from "react-icons/md";

const Listcashier = () => {
  const [cashiers, setCashiers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/users/list-cashier"
      );
      setCashiers(response.data.rows);
      console.log(response.data.rows);
    } catch (error) {
      console.error("Error fetching cashier data:", error);
    }
  };

  // const handleActive = async (cashierId) => {
  //   try {
  //     await axios.patch(`http://localhost:2000/users/${id}`, {
  //       isActive: true,
  //     });
  //     console.log(`Cashier with ID ${cashierId} has been activated`);
  //   } catch (error) {
  //     console.error('Error activating cashier:', error.message);
  //   }
  // };

  const [selectedValue, setSelectedValue] = useState("2");

  const handleRadioChange = async (value) => {
    setSelectedValue(value);

    // Lakukan tindakan atau panggil fungsi sesuai kebutuhan
    if (value === "1") {
      // Tindakan ketika radio "Aktif" dipilih
      console.log("Aktif dipilih");
      // Panggil fungsi handleActive atau yang sesuai
    } else if (value === "2") {
      // Tindakan ketika radio "Tidak Aktif" dipilih
      console.log("Tidak Aktif dipilih");
      // Panggil fungsi handleNonActive atau yang sesuai
    }
  };

  const handleDelete = async (id) => {
    console.log(id, ">>>>>>>>ID");
    try {
      await axios.delete(`http://localhost:2000/users/delete-cashier/${id}`);
      setCashiers((prevCashiers) => prevCashiers.filter((cashier) => cashier.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <Flex justifyContent="center" alignItems="center" mt="20vh">
      <Flex
        bg="gray.300"
        flexDirection="column"
        p="6"
        borderRadius="xl"
        px="4rem"
      >
        <Flex
          gap="3rem"
          justifyContent="space-between"
          alignItems="center"
          py="0.6rem"
          borderBottom="1px"
          borderColor=" #8585ad"
        >
          <Text fontWeight="semibold" w="8rem">
            Full name
          </Text>
          <Text fontWeight="semibold" w="8rem">
            Username
          </Text>
          <Text fontWeight="semibold" w="6rem">
            Role
          </Text>
          <Text fontWeight="semibold" w="12rem">
            Profile picture
          </Text>
          <Text fontWeight="semibold" w="9rem">
            Status
          </Text>
          <Text fontWeight="semibold">Delete</Text>
        </Flex>
        {cashiers.map((cashier, index) => (
          <>
            <Flex
              gap="3rem"
              justifyContent="space-between"
              alignItems="center"
              py="0.6rem"
              borderBottom="1px"
              borderColor=" #a3a3c2"
            >
              <Text fontWeight="medium" w="8rem">
                {cashier.fullname}
              </Text>
              <Text w="8rem">{cashier.username}</Text>
              <Text w="8rem">{cashier.role}</Text>
              <Flex w="8rem">
                <Image
                  src={`http://localhost:2000/${cashier.profile_picture}`}
                  h="4rem"
                  w="4rem"
                  objectFit="cover"
                  borderRadius="lg"
                ></Image>
              </Flex>
              <RadioGroup defaultValue="2">
                <HStack spacing={5}>
                  <Radio colorScheme="blue" value="1">
                    Aktif
                  </Radio>
                  <Radio colorScheme="red" value="2">
                    Tidak Aktif
                  </Radio>
                </HStack>
              </RadioGroup>

              <Button
                onClick={() => handleDelete(cashier.id)}
                bg="red.300"
                p="0.5rem"
              >
                <Icon as={MdDelete} textColor="white" borderRadius="lg" />
              </Button>
            </Flex>
          </>
        ))}
      </Flex>
    </Flex>
  );
};

export default Listcashier;
