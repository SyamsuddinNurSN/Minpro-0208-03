import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  
  export const WelcomePage = () => {
    return (
      <Flex
        flex="1"
        flexDirection="column"
        h="100vh"
        justify="center"
        align="center"
        bg="gray.100"
      >
        <Stack spacing={5} maxW={"md"} w={"full"} p={4} bg="white" rounded="md" boxShadow="md">
          <Heading fontSize="2xl">Selamat Datang!</Heading>
          <Text>
            Selamat datang di aplikasi kami. Jika Anda sudah memiliki akun, silakan masuk. Jika belum, Anda dapat mendaftar.
          </Text>
          <Link to="/register">
            <Button colorScheme="blue" size="md">
              Daftar
            </Button>
          </Link>
          <Text>Atau</Text>
          <Link to="/login">
            <Button colorScheme="green" size="md">
              Masuk
            </Button>
          </Link>
        </Stack>
      </Flex>
    );
  };
  