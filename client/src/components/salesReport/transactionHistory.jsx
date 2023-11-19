import { Box, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { MdStickyNote2 } from "react-icons/md";


export const TransactionHistory = () => {
    // const token = localStorage.getItem("token")

    const [transactionData, setTransactionData] = useState([])

    const fetchTransactionData = async () => {
        try {
            await axios.get("http://localhost:2000/sales-report").then((response) => {
                setTransactionData(response.data.rows)
                console.log(response.data.rows);
            })
        } catch (err) {
            console.log("Error fetching transaction data", err);
        }
    }

    console.log(transactionData);

    // convert date format
    const formatDate = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

        return formattedDate;
    }
    // convert price format
    const convertToIDR = (price) => {
        const priceStr = price.toString().split('');

        for (let i = priceStr.length - 3; i > 0; i -= 3) {
            priceStr.splice(i, 0, '.');
        }
        const formattedPrice = priceStr.join('');
        return formattedPrice;
    }


    useEffect(() => {
        fetchTransactionData()
    }, [])

    return (
        <Box>
            <Text fontSize="1.2rem" fontWeight="semibold" mb="1rem">
                Transaction History
            </Text>
            <TableContainer
                bg="white"
                px="2rem"
                py="0.8rem"
                borderRadius="xl"
                border="1px"
                borderColor="#E2E8F0"
            >
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Transaction ID</Th>
                            <Th>Date</Th>
                            <Th>Total Products</Th>
                            <Th>Total Amount</Th>
                            <Th>Cashier</Th>
                            <Th isNumeric>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactionData.map((item) => (
                            <Tr>
                                <Td fontWeight="semibold" textColor="#425270">{item.id}</Td>
                                <Td>{formatDate(item.createdAt)}</Td>
                                <Td>{item.Transaction_details?.length}</Td>
                                <Td>Rp {convertToIDR(item.total_amount)}</Td>
                                <Td>{item.User?.fullname}</Td>
                                <Td isNumeric>
                                    <Flex justifyContent="space-between">
                                        <Flex></Flex>
                                        <Flex
                                            bg="#719BF4"
                                            p="0.3rem"
                                            borderRadius="md"
                                            _hover={{
                                                bg: "#4D81F1",
                                                cursor: "pointer",
                                                transitionDuration: "0.4s",
                                                transitionTimingFunction: "ease-in-out",
                                            }}
                                        >
                                            <Icon
                                                as={MdStickyNote2}
                                                fontSize="1rem"
                                                textColor="white"
                                            ></Icon>
                                        </Flex>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}