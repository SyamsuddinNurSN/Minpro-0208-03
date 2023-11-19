// src/HomePage.js
import React, { useEffect } from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useSelector } from "react-redux";
import loginimage from "../asset/TASmart.png";

function HomePage() {
  const user = useSelector((state) => state.user.value);

  const admin = user && user.role === "admin"; // Check if user exists before accessing role
  const checkUser = () => {
    return !!user; // Simplified checkUser function
  };


  
  useEffect(() => {
    checkUser();
  }, []); // Add an empty dependency array to useEffect

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
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={loginimage}
            w="100px"
            h="100px"
            objectFit="cover"
            alt="Logo TASmart"
          />
          <Heading fontSize="4xl" mb="4">
            Selamat Datang di TASmart
          </Heading>
          <Text fontSize="lg" mb="8">
            Terima kasih telah mengunjungi halaman kami. Kami siap memberikan
            pengalaman yang luar biasa untuk Anda.
          </Text>
          {admin && (
            <>
              <Link to="/register-cashier">
                <Button colorScheme="yellow" size="lg" mb="4">
                  Register your Cashier
                </Button>
              </Link>
              <Box mb="4">
                {" "}
                <Link to="/list-cashier">
                  <Button colorScheme="yellow" size="lg">
                    List Cashier
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
