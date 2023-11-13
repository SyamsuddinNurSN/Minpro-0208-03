import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";

export const RegisterCashier = () => {
  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string().required("Nama tidak boleh kosong"),
    username: Yup.string().required("Username tidak boleh kosong"),
    email: Yup.string()
      .email("Format email salah")
      .required("Email tidak boleh kosong"),
    password: Yup.string()
      .min(3, "Password minimal 3 karakter")
      .required("Password tidak boleh kosong"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Password harus sama dengan konfirmasi password"
      ) // Validasi konfirmasi password
      .required("Confirm Password tidak boleh kosong"),
    role: Yup.string()
      .oneOf(["admin", "cashier"], "Pilih tipe pengguna: admin atau cashier")
      .required("Tipe pengguna tidak boleh kosong"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const RegisterCashier = async (data) => {
    try {
        const token = localStorage.getItem("token")
        console.log(token);
      console.log(data, "ini data");
      await axios.post("http://localhost:2000/users/cashiers", data,
      {
        headers :{
            Authorization: `Bearer ${token}`
          }
      }
      );

      // toast({
      //   title: "Akun Telah Dibuat",
      //   description: "Anda sekarang dapat menggunakan akun Anda.",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack w={"200vw"} spacing={8} mx={"auto"} maxW={"lg"}>
          <Formik
            initialValues={{
              fullname: "",
              username: "",
              email: "",
              password: "",
              role: "cashier",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, action) => {
              RegisterCashier(values);
              action.resetForm();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                      <Box>
                        <FormControl id="fullName" isRequired>
                          <FormLabel>Fullname</FormLabel>
                          <Field name="fullname">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                placeholder="Fullname"
                                autoComplete="new"
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="fullname"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="userName" isRequired>
                          <FormLabel>Username</FormLabel>
                          <Field name="username">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                placeholder="Username"
                                autoComplete="off"
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="username"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </FormControl>
                      </Box>

                      <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Field name="email">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="email"
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
                      <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Field name="password">
                            {({ field }) => (
                              <Input
                                {...field}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                              />
                            )}
                          </Field>
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <ErrorMessage
                        name="password"
                        component="div"
                        style={{ color: "red" }}
                      />
                      <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <InputGroup>
                          <Field name="confirmPassword">
                            {({ field }) => (
                              <Input
                                {...field}
                                placeholder="Konfirmasi Password"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="off"
                              />
                            )}
                          </Field>
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowConfirmPassword(
                                  (showConfirmPassword) => !showConfirmPassword
                                )
                              }
                            >
                              {showConfirmPassword ? (
                                <ViewIcon />
                              ) : (
                                <ViewOffIcon />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        style={{ color: "red" }}
                      />
                      <Box>
                        <FormControl id="role" isRequired>
                          <FormLabel>Role</FormLabel>
                          <Field name="role">
                            {({ field }) => (
                              <Input
                                {...field}
                                type="text"
                                placeholder="Role"
                                autoComplete="off"
                                readOnly
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="role"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </FormControl>
                      </Box>

                      <Stack spacing={10} pt={2}>
                        <Button
                          type="submit"
                          bgGradient="linear(to-r, #4000, rgb(16, 69, 400))"
                          loadingText="Submitting"
                          size="lg"
                          color={"black"}
                          _hover={{}}
                        >
                          Daftar
                        </Button>
                      </Stack>
                     
                    </Stack>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Flex>
    </>
  );
};