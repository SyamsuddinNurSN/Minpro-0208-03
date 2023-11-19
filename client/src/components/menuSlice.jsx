import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";

import { CiSearch } from "react-icons/ci";
import { MenuGrid } from "./menuGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import allImg from "../assets/restaurant-menu.png";
import { BeatLoader } from 'react-spinners';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ProductPagination } from "./productList/productPagination";

export const MenuSlice = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10) // adjust the limit

  const [categoryData, setCategoryData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false); // Loading state react-spinners
  const [selectedSortOption, setSelectedSortOption] = useState('')

  // Fetch all category
  const fetchCategoryData = async () => {
    try {
      await axios.get('http://localhost:2000/categories').then((response) => {
        setCategoryData(response.data.result.rows)
      })
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch all product
  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:2000/products?page=${page}&limit=${limit}`);
      setProductData(response.data.allProduct)
      setLoading(false)
    } catch (err) {
      console.log("Error fetching all product", err);
      setLoading(false)
    }
  }

  // Function to handle product filter by category
  const handleCategoryClick = async (categoryId) => {
    try {
      setLoading(true);

      // Fetch all products if "All" is clicked
      if (categoryId === 'all') {
        await fetchAllProducts();
      } else {
        // Fetch products by categoryId if category is clicked
        const response = await axios.get(`http://localhost:2000/products/category/${categoryId}`);
        setProductData(response.data.products);
      }

      setLoading(false);
    } catch (err) {
      console.log("Error fetching products", err);
      setLoading(false);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/products/search?keyword=${searchTerm}`);
      setProductData(response.data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };


  // Function to handle sort selection
  const handleSortSelection = async (sortOption) => {
    try {
      setSelectedSortOption(sortOption); // Update the selected sort option

      // Update the selected sort option
      const response = await axios.get(`http://localhost:2000/products/sort?sort=${sortOption}`);

      setProductData(response.data.sortedProducts);

    } catch (err) {
      console.log("Error sorting products:", err);
    }
  }

  // console.log(productData);
  // console.log(categoryData);

  useEffect(() => {
    // Set default view to "All" category (fetch all products initially)
    fetchAllProducts();
    // Fetch category data if needed
    fetchCategoryData();
  }, []);

  // Trigger fetching data when page or limit changes
  useEffect(() => {
    fetchAllProducts();
  }, [page, limit]);

  // Functions to handle pagination controls
  const goToNextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    setPage(page - 1 > 0 ? page - 1 : 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllCategoryClick = () => {
    handleCategoryClick('all')
  }

  return (
    <VStack align="stretch" spacing={{ base: "3", lg: "6" }}>
      {/* Search bar */}
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        gap={{ base: "3" }}
      >
        <Text
          fontSize={{ base: "1.3rem", lg: "1.6rem" }}
          fontWeight="semibold"
          textColor="#1C2537"
          ml="1"
        >
          Product List
        </Text>
        {/* Search Bar */}
        <InputGroup
          w={{ base: "full", lg: "20rem" }}
          bg="white"
          borderRadius="lg"
          borderColor="#E2E8F0"
        >
          <Input
            placeholder="Search a menu.."
            textColor="#92929E"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <InputRightElement>
            <Flex
              p="0.3rem"
              borderRadius="lg"
              _hover={{ bg: "#4D81F1", cursor: "pointer" }}
              onClick={handleSearch}
            >
              <Icon
                as={CiSearch}
                color="#92929E"
                h="1.3rem"
                w="1.3rem"
                _hover={{ color: "white" }}
              />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Flex>
      {/* Category list slider */}
      <HStack>
        <Flex
          pl={{ base: "145vw", md: "51vw", lg: "15vw" }}
          flexWrap="nowrap"
          w="full"
          alignItems="center"
          justifyContent="center"
          gap={3}
          overflowX="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {/* All category */}
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            border="1px"
            borderColor="#E2E8F0"
            bgColor="#FFFFFF"
            gap={4}
            px={6}
            py={2}
            borderRadius="xl"
            _hover={{
              borderColor: "#4D81F1",
              bg: "#E7EEFD9E",
              transitionDuration: "0.4s",
              transitionTimingFunction: "ease-in-out",
              cursor: "pointer",
            }}
            onClick={handleAllCategoryClick}
          >
            <Image src={allImg} h="2rem" w="2rem" mt={2}></Image>
            <Text
              fontSize="0.9rem"
              textColor="#999db2"
              fontWeight="medium"
            // height="0.9rem"
            >
              All...
            </Text>
          </Flex>
          {/* Category Data Map */}
          {categoryData.map((item) => (
            <Flex
              key={item.id} // unique key for filtering
              onClick={() => handleCategoryClick(item.id)} //Handle cateogry click
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              border="1px"
              borderColor="#E2E8F0"
              bgColor="#FFFFFF"
              gap={4}
              px={6}
              py={2}
              borderRadius="xl"
              _hover={{
                borderColor: "#4D81F1",
                bg: "#E7EEFD9E",
                transitionDuration: "0.4s",
                transitionTimingFunction: "ease-in-out",
                cursor: "pointer",
              }}
            >
              <Image
                src={`http://localhost:2000/${item.img}`}
                h="2rem"
                w="2rem"
                mt={2}
              ></Image>
              <Text
                fontSize="0.9rem"
                textColor="#999db2"
                fontWeight="medium"
              // height="0.9rem"
              >
                {item.categoryName}
              </Text>
            </Flex>
          ))}
        </Flex>
      </HStack>
      {/* Loading spinners */}
      {loading && (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100px"
          mt="10rem"
        >
          <BeatLoader color="#4D81F1" margin={5} size={25} width={8} />
        </Flex>
      )}
      <HStack mt={{ base: "2", lg: "3" }} justifyContent="space-between">
        <Text
          fontSize={{ base: "1.1rem", lg: "1.3rem" }}
          fontWeight="semibold"
          textColor="#55606D"
        >
          Result
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            fontWeight="medium"
            textColor="#55606D"
            rightIcon={<ChevronDownIcon />}
          >
            Sort by
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleSortSelection("name_asc")}>
              Name (A-Z)
            </MenuItem>
            <MenuItem onClick={() => handleSortSelection("name_desc")}>
              Name (Z-A)
            </MenuItem>
            <MenuItem onClick={() => handleSortSelection("price_asc")}>
              Price (Ascending)
            </MenuItem>
            <MenuItem onClick={() => handleSortSelection("price_desc")}>
              Price (Descending)
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      {/* Menu Grid */}
      <MenuGrid productData={productData} setProductData={setProductData} />
      <ProductPagination page={page} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} />
    </VStack>
  );
};
