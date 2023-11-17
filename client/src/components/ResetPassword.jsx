import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import axios from 'axios'; // Import Axios
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'; // Import useToast

const ResetPasswordForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // Inisialisasi useToast

  const handleSubmit = async (data) => {
    try {
      data.email = params.email;
      console.log("ini data", data);
      setLoading(true);
      const response = await axios.patch('http://localhost:2000/users/update-password', data);
      console.log('Password reset success:', response.data);
      setLoading(false);

      // Tampilkan toast setelah reset password berhasil
      toast({
        title: "Reset Password Berhasil",
        description: "Anda sekarang dapat menggunakan akun Anda.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      navigate('/login');
    } catch (error) {
      console.error('Password reset error:', error);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', newPassword: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        newPassword: Yup.string().required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          .required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box p={4} borderWidth="1px" borderRadius="md" width="300px" margin="auto">
          <FormControl id="newPassword" isRequired>
            <FormLabel>New Password</FormLabel>
            <Field as={Input} type="password" name="newPassword" placeholder="New Password" />
            <ErrorMessage name="newPassword" component={FormErrorMessage} />
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Field as={Input} type="password" name="confirmPassword" placeholder="Confirm Password" />
            <ErrorMessage name="confirmPassword" component={FormErrorMessage} />
          </FormControl>
          <Button mt={4} colorScheme="blue" isLoading={loading} loadingText="loading" type="submit" width="100%">
            Reset Password
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
