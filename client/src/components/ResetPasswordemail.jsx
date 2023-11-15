import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import axios from "axios"; // Import Axios

const ResetPasswordForm = () => {
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      // Kirim permintaan reset password ke backend
      const response = await axios.post("http://localhost:2000/users/reset-password", values);
      // Handle respon dari server jika diperlukan
      console.log("Password reset success:", response.data);
    } catch (error) {
      // Handle kesalahan jika ada
      console.error("Password reset error:", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <>
            <Form>
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                width="300px"
                margin="auto"
              >
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Field name="email">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                placeholder="Email"
                                autoComplete="new"
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                  
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit" width="100%">
                  Kirim
                </Button>
              </Box>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default ResetPasswordForm;
