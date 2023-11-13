
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
    profile_picture: Yup.mixed().test('fileSize', 'Ukuran foto terlalu besar (maks 2 MB)', (value) => {
      if (!value) return true; // Allow empty file (user might not want to change the photo)
      return value.size <= 2 * 1024 * 1024; // 2 MB
    }),
  });

  const formik = useFormik({
    initialValues,
    updateSchema,
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

        <FormControl id="profile_picture" mt={4} isInvalid={formik.touched.photo && formik.errors.photo}>
        <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            name="profile_picture"
            onChange={(event) => formik.setFieldValue('profile_picture', event.currentTarget.files[0])}
            onBlur={formik.handleBlur}
            // value={formik.values.profile_picture}
          />
          <FormErrorMessage>{formik.errors.profile_picture}</FormErrorMessage>
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

export default EditProfileForm;
