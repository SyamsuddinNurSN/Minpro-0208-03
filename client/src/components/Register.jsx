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
  
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  import { Link, useNavigate } from "react-router-dom";
  
  export const RegisterUser =() => {
    const RegisterSchema = Yup.object().shape({
      name: Yup.string().required("Nama tidak boleh kosong"),
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
    });
  
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleSubmitRegister = async (data) => {
      try {
        const response = await axios.post(
          "http://localhost:2000/user/register-user",
          data
        );
        console.log("ini data", data);
        toast({
          title: "Akun Telah Dibuat",
          description: "Anda sekarang dapat menggunakan akun Anda.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login");
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
              initialValues={{ name: "", username: "", email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values, action) => {
                handleSubmitRegister(values);
                action.resetForm();
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                      <Stack spacing={4}>
                        <Box>
                          <FormControl id="firstName" isRequired>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <Field name="name">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Nama Lengkap"
                                  autoComplete="new"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name="name"
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
  
                        <Stack spacing={10} pt={2}>
                          <Button
                            type="submit"
                            bgGradient="linear(to-r, #000000, rgb(16, 69, 181))"
                            loadingText="Submitting"
                            size="lg"
                            color={"white"}
                            _hover={{}}
                          >
                            Daftar
                          </Button>
                        </Stack>
                        <Stack pt={6}>
                          <Text align={"center"}>
                            Apakah sudah punya Akun?{" "}
                            <Text as={Link} to="/login" color={"blue.400"}>
                              Masuk
                            </Text>
                          </Text>
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
  }
  
  
  