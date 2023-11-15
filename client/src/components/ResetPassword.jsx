import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';

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
      <Box p={4} borderWidth="1px" borderRadius="md" width="300px" margin="auto">
          
          <FormControl id="newPassword" isRequired>
            <FormLabel>New Password</FormLabel>
            <Field as={Input} type="password" name="newPassword" placeholder="New Pasword" />
            
            <ErrorMessage name="newPassword" component={FormErrorMessage} />
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Field as={Input} type="password" name="confirmPassword" placeholder="confrim Password" />
            <ErrorMessage name="confirmPassword" component={FormErrorMessage} />
          </FormControl>
          <Button mt={4} as={Link} to="/login" colorScheme="blue" type="submit" width="100%">
            Reset Password
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
