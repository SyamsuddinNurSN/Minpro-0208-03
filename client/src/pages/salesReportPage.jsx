import { Box, Flex, Grid, GridItem, Icon, Image, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import SimpleSidebar from "../components/sidebarLeft"
import { UserBarInfo } from "../components/userBarInfo"
import avaDummy from "../assets/ava-dummy.png";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdShoppingCart } from "react-icons/md";

const gridReport = [
    { icon: RiMoneyDollarCircleFill, bills: "Rp 25.000.000", title: "Total Earnings", bg: "#3D05DE" },
    { icon: BsFillBoxSeamFill, bills: 200, title: "Total Product Sold", bg: "#FF6A6A" },
    { icon: MdShoppingCart, bills: 134, title: "Total Orders", bg: "#FF8759" },
]

const transactionData = [
    { id: 284, date: "27 June 2023", totProducts: 5, totAmount: 54000, cashier: "cashier 1" },
    { id: 566, date: "24 June 2023", totProducts: 7, totAmount: 82000, cashier: "cashier 2" },
    { id: 224, date: "23 June 2023", totProducts: 4, totAmount: 34000, cashier: "cashier 1" },
]

export const SalesReportPage = () => {
    // react date picker
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    console.log(dateRange);

    console.log(startDate);
    console.log(endDate);

    return (
        <>
            <SimpleSidebar />
            <Flex w="full" h="100vh">
                <Flex
                    bg="#F6FAFEFF"
                    w="full"
                    flexDirection="column"
                    pl={{ base: "3", md: "11vw", lg: "14vw" }}
                    pr={{ base: "3", md: "1", lg: "10vw" }}
                    py="7"
                    gap="1rem"
                >
                    {/* Page Title & User Info */}
                    <Flex justifyContent="space-between" alignItems="center" w="full">
                        <Text
                            fontSize={{ base: "1.3rem", md: "1.6rem", lg: "1.8rem" }}
                            fontWeight="bold"
                            textColor="#1C2537"
                        >
                            Sales Report
                        </Text>
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            gap="0.4rem"
                            bg="white"
                            pl="1rem"
                            pr="1.8rem"
                            py="0.6rem"
                            borderRadius="lg"
                        >
                            <Flex>
                                <Image
                                    src={avaDummy}
                                    h="2.4rem"
                                    w="2.4rem"
                                    rounded="lg"
                                ></Image>
                            </Flex>
                            <Flex
                                flexDirection="column"
                                justifyContent="start"
                                alignItems="start"
                                flexGrow="1"
                                ml={{ md: "0.5rem", lg: "1.4rem" }}
                            >
                                <Text fontSize="0.9rem" color="#717171">
                                    I'm Admin
                                </Text>
                                <Text fontSize="0.9rem" fontWeight="semibold">
                                    John Doe
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* Insight & Datepicker */}
                    <Flex justifyContent="space-between" alignItems="center" mt="1rem">
                        <Text fontSize="1.2rem" fontWeight="semibold">
                            Insight
                        </Text>
                        {/* Datepicker */}
                        <Flex
                            alignItems="center"
                            gap="0.8rem"
                            bg="white"
                            pl="1rem"
                            pr="0.5rem"
                            py="0.4rem"
                            borderRadius="lg"
                            border="1px"
                            borderColor="#E2E8F0"
                        >
                            <Text fontSize="0.9rem" fontWeight="medium" textColor="#757575">
                                Date range :
                            </Text>
                            <Flex>
                                {/* react datepicker */}
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => {
                                        setDateRange(update);
                                    }}
                                    withPortal
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* Sales Report by Date Range Block */}
                    <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
                        {gridReport.map((item) => (
                            <GridItem
                                colSpan={1}
                                bg="white"
                                borderRadius="xl"
                                py="6"
                                px="2rem"
                                border="1px"
                                borderColor="#E2E8F0"
                                role="group"
                                _hover={{
                                    border: "1px",
                                    borderColor: "#4D81F1",
                                    bg: "#E7EEFD9E",
                                    transitionDuration: "0.4s",
                                    transitionTimingFunction: "ease-in-out",
                                    cursor: "pointer",
                                }}
                            >
                                <Flex flexDirection="row" alignItems="center" gap="1.4rem">
                                    <Flex borderRadius="full" bg={item.bg} p="0.9rem">
                                        <Icon
                                            as={item.icon}
                                            textColor="white"
                                            h="1.6rem"
                                            w="1.6rem"
                                        ></Icon>
                                    </Flex>
                                    <Flex flexDirection="column" pl="0.2rem">
                                        <Flex>{/* {startDate} */}</Flex>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize="1.4rem"
                                            textColor="#040206"
                                        >
                                            {item.bills}
                                        </Text>
                                        <Text fontWeight="medium" textColor="#a2aac3">
                                            {item.title}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </GridItem>
                        ))}
                    </Grid>
                    {/* Table Transaction History */}
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
                                            <Td>{item.date}</Td>
                                            <Td>{item.totProducts}</Td>
                                            <Td>Rp {item.totAmount}</Td>
                                            <Td isNumeric>{item.cashier}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}