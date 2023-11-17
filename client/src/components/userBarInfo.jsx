import { Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import avaDummy from "../assets/ava-dummy.png";
import { CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const UserBarInfo = () => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const profilePicture = user.profile_picture;

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Flex flexDirection={"column"}>
      {/* User */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="full"
        gap={7}
        p="4"
        bg="white"
        borderRadius="xl"
      >
        {/* <Image src={`http://localhost:2000/${profilePicture}`} h="3rem" w="3rem" rounded="lg"></Image> */}
        <Flex flexDirection="column" justifyContent="start" alignItems="start">
          <Text color="#717171" fontSize="0.9rem">
            I'm an {user.role}
          </Text>
          <Text fontWeight="semibold">{user.fullname}</Text>
        </Flex>
        <Flex flexGrow="1" justifyContent="end" h="full">
        <Menu>
          <MenuButton>
          <Icon
            as={CiSettings}
            h="3rem"
            w="3rem"
            p="0.4rem"
            textColor="#A4A4A4"
            _hover={{
              bg: "#4D81F1",
              color: "white",
            }}
            rounded="lg"
          />
          </MenuButton>
          <MenuList>
            <Link to="/profile">
              <MenuItem>
              Your Profile
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              Sign Out
              </MenuItem>
          </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};
