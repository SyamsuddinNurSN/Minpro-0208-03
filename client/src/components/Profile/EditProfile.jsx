import React from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const EditProfileForm = ({ initialValues, onSubmit }) => {
  const updateSchema = Yup.object().shape({
    fullname: Yup.string(),
    username: Yup.string(),
    profile_picture: Yup.mixed().test(
      "fileSize",
      "Ukuran foto terlalu besar (maks 1 MB)",
      (value) => {
        if (!value) return true; // Allow empty file (user might not want to change the photo)
        return value.size <= 1 * 1024 * 1024; // 2 MB
      }
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: updateSchema, // Changed from `updateSchema` to `validationSchema`
    onSubmit,
  });

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg="white"
    >
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          id="profile_picture"
          mt={4}
          isInvalid={
            formik.touched.profile_picture && formik.errors.profile_picture
          } // Updated from `photo` to `profile_picture`
        >
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            name="profile_picture"
            onChange={(event) =>
              formik.setFieldValue(
                "profile_picture",
                event.currentTarget.files[0]
              )
            }
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.profile_picture}</FormErrorMessage>
        </FormControl>
        <FormControl id="fullname">
          <FormLabel>Fullname</FormLabel>
          <Input
            type="text"
            name="fullname"
            placeholder="Masukkan fullname Anda"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullname}
          />
        </FormControl>

        <FormControl id="username" mt={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="Pilih username Anda"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </FormControl>

        <Box mt={6}>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formik.isSubmitting}
          >
            Simpan Perubahan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

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
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat menyimpan perubahan profil:",
        error
      );
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
