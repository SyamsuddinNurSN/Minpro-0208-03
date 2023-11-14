// src/components/Navbar.js
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Avatar,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const profilePicture = user.profile_picture
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
            <Menu>
              <MenuButton>
                <Avatar
                  size="md"
                  src={`http://localhost:2000/${profilePicture}`}
                />
              </MenuButton>
              <MenuList>
                <Link to="/profile">
                  <MenuItem>Your Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
