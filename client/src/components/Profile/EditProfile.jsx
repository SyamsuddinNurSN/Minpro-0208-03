// EditProfilePage.js
import React from 'react';
import { Container, Flex, Heading } from '@chakra-ui/react';
import EditProfileForm from './EditForm';

const simulateApiRequest = (data) => {
  return new Promise((resolve) => {
    // Simulasi request API asynchronous
    setTimeout(() => {
      console.log('Data yang disimpan:', data);
      resolve();
    }, 1000); // Waktu simulasi 1 detik
  });
};

const EditProfilePage = () => {
  const initialValues = {
    nama: '',
    username: '',
    email: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Simulasikan request API untuk menyimpan perubahan profil
      await simulateApiRequest(values);

      // Setelah selesai, beri tahu Formik bahwa proses submit telah selesai
      setSubmitting(false);
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan perubahan profil:', error);
      // Jika terjadi kesalahan, Anda dapat menangani error di sini
      setSubmitting(false); // Pastikan untuk menghentikan loading meskipun terjadi kesalahan
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Container maxW="container.md" mt={5} bg="skyblue" p={8} borderRadius={8} boxShadow="lg">
        <Heading mb={6} textAlign="center">Edit Profile</Heading>
        <EditProfileForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Container>
    </Flex>
  );
};

export default EditProfilePage;
