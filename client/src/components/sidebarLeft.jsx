"use client";
import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
  VStack,
} from "@chakra-ui/react";

import { FiMenu } from "react-icons/fi";

import { GoHome } from "react-icons/go";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
import { IoBagAddOutline } from "react-icons/io5";

import logoApp from "../assets/logo-alt2(2).png";

const LinkItems = [
  { name: "Home", icon: GoHome },
  { name: "Menu", icon: IoRestaurantOutline },
  { name: "Create", icon: IoBagAddOutline },
  { name: "Report", icon: IoAnalytics },
  //   { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{/* Content */}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "9vw", lg: "7vw" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx={{ base: "5", md: "4", lg: "8" }}
        mb="0.8rem"
        justifyContent={{ base: "space-between", md: "center" }}
      >
        <Image
          h="3rem"
          w="3rem"
          objectFit="contain"
          src={logoApp}
          mt={{ base: "0", lg: "3" }}
        ></Image>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          textColor="#A4A4A4"
          fontSize={{ base: "0.9rem", md: "0", lg: "0.9rem" }}
          fontWeight="medium"
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        // justifyContent="center"
        p="4"
        mx="4"
        borderRadius="2xl"
        role="group"
        cursor="pointer"
        flexDirection={{ base: "row", md: "column" }}
        // alignItems={{ base: "center" }}
        _hover={{
          bg: "#4D81F1",
          color: "white",
          transitionDuration: "0.4s",
          transitionTimingFunction: "ease-in-out",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mb={{ base: "0", lg: "3" }}
            fontSize="1.6rem"
            textColor="#A4A4A4"
            mr={{ base: "2rem", md: "0" }}
            _groupHover={{
              color: "white",
              transitionDuration: "0.4s",
              transitionTimingFunction: "ease-in-out",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image h="3rem" w="3rem" objectFit="contain" src={logoApp}></Image>

      {/* <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text> */}
    </Flex>
  );
};
