import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import loginimage from "../asset/TASmart.png";

export function LoginUser() {
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Password minimal 3 karakter")
      .required("Password tidak boleh kosong"),
    
  });

  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  const handleSubmitLogin = async (data) => {
    try {
      console.log(data, "ini data");
      console.log(data, "ini data");
      if (data.data_input.includes("@")) {
        data.email = data.data_input;
        delete data.data_input;
        const response = await axios.post(
          `http://localhost:2000/users/login`,
          data
        );
        console.log(response.data);
        if (response.data == false) {
          toast({
            title: "Gagal Masuk",
            description: "Akun di NonAktifkan Admin yang tampan",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          setUser(response.data[0]);
          dispatch(setData(response.data));
          localStorage.setItem("token", response.data?.token);
          navigate("/home");
          window.location.reload();
        }
      } else {
        data.username = data.data_input;
        delete data.data_input;
        const response = await axios.post(
          `http://localhost:2000/users/login`,
          data
        );
        console.log(response.data);
        if (response.data == false) {
          toast({
            title: "Gagal Masuk",
            description: "Email not verified",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          setUser(response.data[0]);
          dispatch(setData(response.data));
          localStorage.setItem("token", response.data?.token);
          navigate("/home");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Gagal Masuk",
        description:
          "Email/Username atau password ada yang salah. silahkan coba lagi",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack w={"200vw"} spacing={8} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <Link to={"/"}>
            <Image
              src={loginimage}
              w="60px"
              h="60px"
              objectFit="cover"
              alt="Logo TASmart"
            />
          </Link>
          <Heading fontSize={"4xl"}>Masukkan Akun anda</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Selamat Datang di TASmart 👋😁
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ data_input: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, action) => {
                handleSubmitLogin(values);
                action.resetForm();
              }}
            >
              {(props) => {
                return (
                  <>
                    <Form>
                      <FormControl id="email">
                        <FormLabel>Email/Username</FormLabel>
                        <Field name="data_input">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              placeholder="Email/Username"
                              autoComplete="off"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Field name="password">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="password"
                              placeholder="Password"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                      {/* <FormControl id="role" isRequired>
                        <FormLabel>Role</FormLabel>
                        <Field name="role">
                          {({ field }) => (
                            <select {...field} placeholder="Tipe Pengguna">
                              <option value="admin">Admin</option>
                              <option value="cashier">Cashier</option>
                            </select>
                          )}
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl> */}
                      <Stack spacing={10} mt="5">
                        <Flex
                          direction={{ base: "column", sm: "column" }}
                          align="stretch"
                          justify={"space-between"}
                          gap="3"
                        >
                          <Flex justify={"space-between"}>
                            <Text align={"center"}>Lupa password? </Text>
                            <Text>
                              <Text
                                as={Link}
                                to="/resetpasswordemail"
                                color={"blue.400"}
                              >
                                Reset
                              </Text>
                            </Text>
                          </Flex>
                        </Flex>
                        <Button
                          type="submit"
                          bgGradient="linear(to-r,rgb(16, 69, 181), #fff)"
                          color={"black"}
                          _hover={{}}
                        >
                          Masuk
                        </Button>
                      </Stack>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
