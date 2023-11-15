// src/WelcomePage.js
import React, { useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useSelector } from "react-redux";

function HomePage() {

    const user = useSelector((state) => state.user.value);
    console.log(user.role);
    const admin = user.role === "admin";
    const checkUser = () => {
      if (user) {
        return true;
      } else {
        return false;
      }
    };
    useEffect(() => {
      checkUser();
    });

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
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
            Selamat Datang di Home Page!
          </Heading>
          <Text fontSize="lg" mb="8">
            Terima kasih telah mengunjungi halaman kami. Kami siap memberikan
            pengalaman yang luar biasa untuk Anda.
          </Text>
        {(admin &&<Link to="/register-cashier">
        <Button colorScheme="yellow" size="lg">
            Register your cashier
        </Button>
        </Link>)}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
