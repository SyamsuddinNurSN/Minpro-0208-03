// src/components/Navbar.js
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Avatar,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ isAuthenticated }) => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const id = user.id;
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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Box>
          <Link to="/">
            <Button colorScheme="whiteAlpha" variant="link" borderColor="white">
              Home
            </Button>
          </Link>
        </Box>
        <Spacer />
        {!id ? (
          <>
            <Box>
              <Link to="/login">
                <Button colorScheme="teal" borderColor="teal" ml={2}>
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="teal" borderColor="teal" ml={2}>
                  Sign Up
                </Button>
              </Link>
            </Box>
          </>
        ) : (
            <>
            <Box>
              <Avatar size="sm" name={user.username} />
            </Box>
            <Box ml={2}>
              <Button
                colorScheme="red"
                borderColor="red"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Box>
          </>
        )
    }
      </Flex>
    </Box>
  );
};

export default Navbar;
