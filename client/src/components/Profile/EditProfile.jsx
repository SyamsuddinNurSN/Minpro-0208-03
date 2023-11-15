import React from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import axios from "axios";
import EditProfileForm from "./EditForm";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.value);
  console.log(user);
  let profilePicture = user.profile_picture;
  console.log(profilePicture);
  const id = user.id;
  console.log(id);

  const initialValues = {
    fullname: user.fullname || "",
    username: user.username || "",
    profile_picture: null,
  };
  const navigate = useNavigate();

  const handleSubmit = async (data, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("profile_picture", data.profile_picture);

    try {
      // request API untuk menyimpan perubahan profil
      const response = await axios.patch(
        `http://localhost:2000/users/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );
      console.log(formData);
      if (response.status === 200) {
        profilePicture = response.data.profile_picture;
        navigate("/profile");
        window.location.reload();
      } else {
        console.error("Failed to save data to the database");
      }

      // Setelah selesai, beri tahu Formik bahwa proses submit telah selesai
      // setSubmitting(false);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat menyimpan perubahan profil:",
        error
      );
      // Jika terjadi kesalahan, Anda dapat menangani error di sini
      // setSubmitting(false); // Pastikan untuk menghentikan loading meskipun terjadi kesalahan
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Container
        maxW="container.md"
        mt={5}
        bg="skyblue"
        p={8}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6} align="center">
          Edit Profile
        </Heading>
        <EditProfileForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </Container>
    </Flex>
  );
};

export default EditProfilePage;
