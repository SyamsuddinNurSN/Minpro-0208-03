import { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  Icon,
  Button,
  Radio,
  RadioGroup,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ListCashier = () => {
  const [cashiers, setCashiers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedCashierId, setSelectedCashierId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [originalStatus, setOriginalStatus] = useState(null);
  const toast = useToast();

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

  // const [selectedValue, setSelectedValue] = useState("2");

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id, ">>>>>>>>ID");
    try {
      await axios.delete(`http://localhost:2000/users/delete-cashier/${id}`);
      setCashiers((prevCashiers) =>
        prevCashiers.filter((cashier) => cashier.id !== id)
      );

      showToast(
        "success",
        "Akun cashier dihapus",
        "Akun cashier telah berhasil dihapus."
      );
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(false);
  };

  const handleEnableCashier = async (cashierId, isEnabled) => {
    setSelectedCashierId(cashierId);
    setSelectedStatus(isEnabled);
    setIsConfirmationModalOpen(true);
    const selectedCashierIndex = cashiers.findIndex(
      (cashier) => cashier.id === cashierId
    );
    const selectedCashier = cashiers[selectedCashierIndex];
    setOriginalStatus(selectedCashier.isEnabled);

    try {
      const result = await axios.patch(
        `http://localhost:2000/users/enable-Cashier/${cashierId}`,
        { isEnabled }
      );

      // Update local state after successful patch
      setCashiers((prevCashiers) => {
        const updatedCashiers = [...prevCashiers];
        updatedCashiers[selectedCashierIndex] = {
          ...selectedCashier,
          isEnabled,
        };
        return updatedCashiers;
      });

      console.log(result);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleConfirmModal = (confirm) => {
    if (confirm) {
      handleEnableCashier(selectedCashierId, selectedStatus);
      showToast(
        "success",
        "Cashier diaktifkan",
        "Cashier dapat menggunakan akun."
      );
    } else {
      showToast(
        "warning",
        "Cashier dinonaktifkan",
        "Cashier tidak dapat menggunakan akun ."
      );
    }

    setIsConfirmationModalOpen(false);
  };

  const showToast = (status, title, description) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

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

        <Link to="/home">Beranda</Link>
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
              <RadioGroup value={cashier.isEnabled ? "1" : "2"}>
                <HStack spacing={5}>
                  <Radio
                    colorScheme="blue"
                    value="1"
                    onChange={() => handleEnableCashier(cashier.id, true)}
                    isChecked={
                      selectedCashierId === cashier.id &&
                      selectedStatus === true
                    }
                  >
                    Aktif
                  </Radio>
                  <Radio
                    colorScheme="red"
                    value="2"
                    onChange={() => handleEnableCashier(cashier.id, false)}
                    isChecked={
                      selectedCashierId === cashier.id &&
                      selectedStatus === false
                    }
                  >
                    Tidak Aktif
                  </Radio>
                </HStack>
              </RadioGroup>

              <Modal
                isOpen={isConfirmationModalOpen}
                onClose={() => handleConfirmModal(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Segera Lakukan?</ModalHeader>
                  <ModalFooter>
                    {/* <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => handleConfirmModal(false)}
                    >
                      Tidak
                    </Button> */}
                    <Button
                      bg="red.300"
                      textColor="white"
                      onClick={() => handleConfirmModal(true)}
                    >
                      Ya
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Button
                onClick={() => setIsModalOpen(true)}
                bg="red.300"
                p="0.5rem"
              >
                <Icon as={MdDelete} textColor="white" borderRadius="lg" />
              </Button>

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Anda Yakin?</ModalHeader>
                  <ModalCloseButton />
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => setIsModalOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      bg="red.300"
                      textColor="white"
                      onClick={() => handleDelete(cashier.id)}
                    >
                      Ya, Hapus
                      <Icon as={MdDelete} textColor="white" borderRadius="lg" />
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </>
        ))}
      </Flex>
    </Flex>
  );
};

export default ListCashier;
