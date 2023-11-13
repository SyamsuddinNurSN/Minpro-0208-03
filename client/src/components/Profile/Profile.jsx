import { Box, Heading, Text, Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UploadProfile } from "./UploadModal";

export const Profile = () => {
  return (
    <Box p="8" mt="20" maxW="600px" mx="auto" boxShadow="xl" borderRadius="lg" bg="blue.100" color="blue.900">
      <Flex direction="column" align="center" textAlign="center">
        <Image
          src=""
          alt="Foto Profil"
          boxSize="150px"
          objectFit="cover"
          borderRadius="full"
          mb="4"
        />
        <UploadProfile />
        <Heading size="xl" my="2">Cashier 1</Heading>
        <Text fontSize="lg" color="gray.600">cashier1@gmail.com</Text>
      </Flex>
      <Flex direction="column" mt="4" align="center" >
      <Button as={ Link } to="/EditProfile" colorScheme="teal" size="lg" mb="2" w="50%">
      Edit Profil
    </Button>
        <Link to="/" display="block" color="teal.500" textDecoration="underline" textAlign="center">
          Kembali ke Beranda
        </Link>
      </Flex>
    </Box>
  );
};
