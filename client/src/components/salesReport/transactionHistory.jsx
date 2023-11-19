import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios, { Axios } from "axios"
import { useEffect, useState } from "react"

// const transactionData = [
//     { id: 284, date: "27 June 2023", totProducts: 5, totAmount: 54000, cashier: "cashier 1" },
//     { id: 566, date: "24 June 2023", totProducts: 7, totAmount: 82000, cashier: "cashier 2" },
//     { id: 224, date: "23 June 2023", totProducts: 4, totAmount: 34000, cashier: "cashier 1" },
// ]

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

    const newStartDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // 
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
            <TableContainer bg="white"
                px="2rem"
                py="0.8rem"
                borderRadius="xl"
                border="1px"
                borderColor="#E2E8F0">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Transaction ID</Th>
                            <Th>Date</Th>
                            <Th>Total Products</Th>
                            <Th>Total Amount</Th>
                            <Th isNumeric>Cashier</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactionData.map((item) => (
                            <Tr>
                                <Td>{item.id}</Td>
                                <Td>{newStartDate(item.createdAt)}</Td>
                                <Td>{item.totProducts}</Td>
                                <Td>Rp {item.total_amount}</Td>
                                <Td isNumeric>{item.User?.fullname}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}