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
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export function LoginUser() {
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Password minimal 3 karakter")
      .required("Password tidak boleh kosong"),
    // role: Yup.string()
    //   .oneOf(["admin", "cashier"], "Pilih tipe pengguna: admin atau cashier")
    //   .required("Tipe pengguna tidak boleh kosong"),
  });

  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  const handleSubmitLogin = async (data) => {
    try {
      console.log(data, "ini data");
      if (data.data_input.includes("@")) {
        data.email = data.data_input;
        delete data.data_input;
        const response = await axios.post(
          `http://localhost:2000/users/login`,
          data
        );
        setUser(response.data[0]);
        // dispatch(setData(response.data))
        localStorage.setItem("token", response.data?.token);
        navigate("/home");
        window.location.reload();
      } else {
        data.username = data.data_input;
        delete data.data_input;
        const response = await axios.post(
          `http://localhost:2000/users/login`,
          data
        );
        setUser(response.data[0]);
        // dispatch(setData(response.data))
        localStorage.setItem("token", response.data?.token);
        navigate("/home");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);

      // Display a toast message for login failure
      toast({
        title: "Login Failed",
        description:
          "Email/Username or password is incorrect. Please try again.",
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Masuk ke Akun anda</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Rasakan kemudahan dengan semua fitur canggih kami ✨
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
                      <Stack spacing={10}>
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        >
                          <Text align={"center"}>Belum punya akun? </Text>
                          <Text>
                            <Text as={Link} to="/register" color={"red.400"}>
                              Daftar
                            </Text>
                          </Text>
                        </Stack>
                        <Button
                          type="submit"
                          bgGradient="linear(to-r, #000000, #FF0000)"
                          color={"white"}
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
