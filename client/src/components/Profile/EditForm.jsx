// EditProfileForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const EditProfileForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required('Nama wajib diisi'),
    username: Yup.string().required('Username wajib diisi'),
    email: Yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
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
        <FormControl id="nama" isInvalid={formik.touched.nama && formik.errors.nama}>
          <FormLabel>Nama</FormLabel>
          <Input
            type="text"
            name="nama"
            placeholder='Masukkan nama Anda'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nama}
          />
          <FormErrorMessage>{formik.errors.nama}</FormErrorMessage>
        </FormControl>

        <FormControl id="username" mt={4} isInvalid={formik.touched.username && formik.errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder='Pilih username Anda'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl id="email" mt={4} isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder='Masukkan alamat email Anda'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <Box mt={6}>
          <Button type="submit" colorScheme="blue" isLoading={formik.isSubmitting}>
            Simpan Perubahan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfileForm;
