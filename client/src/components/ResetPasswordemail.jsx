import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import axios from 'axios'; // Import Axios

const ResetPasswordForm = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Kirim permintaan reset password ke backend
      const response = await axios.post('/api/reset-password', values);
      // Handle respon dari server jika diperlukan
      console.log('Password reset success:', response.data);
    } catch (error) {
      // Handle kesalahan jika ada
      console.error('Password reset error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', newPassword: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        newPassword: Yup.string().required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          .required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box p={4}>
          
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Field as={Input} type="email" name="email" />
            <ErrorMessage name="email" component={FormErrorMessage} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Kirim
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
