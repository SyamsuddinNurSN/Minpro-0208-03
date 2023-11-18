import { Button, Flex, Grid, GridItem, HStack, Icon, Text, VStack, useToast } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";
import { UserBarInfo } from "../components/userBarInfo";
import { NameCategoryCreate } from "../components/createProduct/nameCategoryCreate";
import { PriceStockCreate } from "../components/createProduct/priceStockCreate";
import { DescImageCreate } from "../components/createProduct/descImageCreate";
import { IoCreateOutline } from "react-icons/io5";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from "react";

export const CreateProductPage = () => {
  // get token from localstorage---

  const toast = useToast();

  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    categoryId: Yup.number().required("Category is required"),
    price: Yup.number().min(5000).required("Price is required"),
    stock: Yup.number().min(5).max(100).required("Stock is requred"),
    description: Yup.string().max(200),
    img: Yup.string().required("You must upload an image")
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: null,
      price: null,
      stock: null,
      description: "",
      img: ""
    },
    validationSchema: createProductSchema,
    onSubmit: async (values, action) => {
      try {
        console.log("Form values:", values);
        // 

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("categoryId", values.categoryId);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("description", values.description);
        formData.append("img", values.img);

        // console.log(formData);
        await axios.post('http://localhost:2000/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // add token bearer later
          },
        });

        action.resetForm();
        toast({
          title: "Success creating product",
          description: `Product has been created`,
          status: "success",
          duration: 3000,
          position: "top"
        })

      } catch (err) {
        console.log("error creating product:", err);
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
          position: "top",
        });
      }
    }
  })

  // useEffect(() => {
  //   console.log({ formik }, formik.values);
  // })

  return (
    <>
      <SimpleSidebar />
      <Grid templateColumns="repeat(10, 1fr)" h="100vh">
        <GridItem
          w="full"
          bg="#F6FAFEFF"
          // bg="#F9F8FB"
          px="5"
          colSpan={{ base: "10", lg: "7" }}
          pl={{ base: "0", md: "3vw", lg: "10vw" }}
          py={{ base: "5", md: "9" }}
        >
          <VStack w="full" bg="#F9F8FB" pl={{ base: "0", md: "8vw" }}>
            <Flex
              flexDirection="column"
              bg="white"
              py="2.6rem"
              alignItems="stretch"
              borderRadius="xl"
              w={{ base: "92vw", md: "78vw", lg: "50vw" }}
              px={{ base: "1.8rem", md: "4rem" }}
            >
              <HStack justifyContent="space-between" w="full">
                <Text
                  fontSize={{ base: "1.3rem", lg: "1.6rem" }}
                  fontWeight="semibold"
                  textColor="#1C2537"
                >
                  Create Product
                </Text>
                <Icon
                  as={IoCreateOutline}
                  fontSize="1.8rem"
                  textColor="#999999"
                />
              </HStack>
              <form onSubmit={formik.handleSubmit}>
                <VStack mt="10" alignItems="stretch" spacing="12">
                  {/* Name & Category */}
                  <NameCategoryCreate formik={formik} />
                  {/* Price & Stock  */}
                  <PriceStockCreate formik={formik} />
                  {/* Description & Image*/}
                  <DescImageCreate formik={formik} />
                </VStack>
                <Button
                  type="submit"
                  bg="#4D81F1"
                  w="full"
                  textColor="white"
                  fontSize="0.9rem"
                  mt="1.6rem"
                  _hover={{
                    bg: "#4675DB",
                  }}
                >
                  Submit
                </Button>
              </form>
            </Flex>
          </VStack>
        </GridItem>
        {/* Right bar */}
        <GridItem
          colSpan="3"
          w="full"
          bg="#F6FAFEFF"
          // bg="#F9F8FB"
          py="9"
          pl="1.5rem"
          pr="4rem"
          display={{ base: "none", lg: "block" }}
        >
          <UserBarInfo />
        </GridItem>
      </Grid>
    </>
  );
};
