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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        bgGradient="linear(to-r, teal.500, blue.500)"
        color="white"
        textAlign="center"
        padding="4"
      >
        <Box>
          <Heading fontSize="4xl" mb="4">
            Selamat Datang di Tasmart
          </Heading>
          <Text fontSize="lg" mb="8">
            Cashier app andalan anda
          </Text>
          <Link to="/login">
            <Button colorScheme="yellow" size="lg">
              Mulai Petualangan Anda
            </Button>
          </Link>
        </Box>
      </Box>
    );
  };
  