import { Box, Heading, Text, Button, Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Profile = () => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const profilePicture = user.profile_picture;

  const user = useSelector((state) => state.user.value);
  console.log(user);
  const profilePicture = user.profile_picture;

  return (
    <Box
      p={{ base: "4", md: "8" }}
      mt={{ base: "12", md: "20" }}
      maxW="600px"
      mx="auto"
      boxShadow="xl"
      borderRadius="lg"
      bg="blue.100"
      color="blue.900"
    >
      <Heading size="xl" align="center" mb="4">
        My Profile
      </Heading>
      <Flex direction="column" align="center" textAlign="center">
        <Avatar size="xl" src={`http://localhost:2000/${profilePicture}`} />

        <Heading size="xl" my="2">
          {user.fullname}
        </Heading>
        <Text fontSize="lg" color="gray.600">
          {user.username}
        </Text>
      </Flex>
      <Flex direction="column" mt="4" align="center">
        <Button
          as={Link}
          to="/profile-setting"
          colorScheme="teal"
          size="lg"
          mb="2"
          w={{ base: "100%", md: "50%" }}
        >
          Edit Profil
        </Button>
        <Link
          to="/home"
          display="block"
          color="teal.500"
          textDecoration="underline"
          textAlign="center"
        >
          Kembali ke Beranda
        </Link>
      </Flex>
    </Box>
  );
};
