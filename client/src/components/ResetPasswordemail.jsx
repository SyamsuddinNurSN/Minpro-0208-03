import React, { useState } from "react";
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
import { useToast } from "@chakra-ui/react";

const ResetPasswordFormEmail = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        "http://localhost:2000/users/reset-password",
        values
      );

      toast({
        title: "Pergi ke Halaman Email",
        description: "Tekan Tombol Reset di Email.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      console.log("Password reset success:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Password reset error:", error);
      setLoading(false);
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
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={loading}
                  loadingText="loading"
                  type="submit"
                  width="100%"
                >
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

export default ResetPasswordFormEmail;
