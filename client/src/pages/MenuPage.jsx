import { Box, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";

import { BillsBar } from "../components/billsBar";
import { MenuSlice } from "../components/menuSlice";
import { UserBarInfo } from "../components/userBarInfo";
export const MenuPage = () => {
  return (
    <>
      <SimpleSidebar />
      <Grid
        templateColumns="repeat(9, 1fr)"
        pl={{ base: "0", md: "5.6vw", lg: "3.8vw" }}
      >
        {/* Menu Main */}
        <GridItem
          // colSpan={7}
          colSpan={{ base: "9", lg: "7" }}
          // h="100vh"
          w="full"
          bg="#F9F8FB"
          pl="6vw"
          py="7"
          pr="3vw"
        >
          <MenuSlice />
        </GridItem>
        {/* Bills */}
        <GridItem
          py="7"
          colSpan={2}
          // h="100vh"
          // w="full"
          bg="#F9F8FB"
          display={{ base: "none", lg: "block" }}
          gap="4"
        >
          {/* <BillsBar /> */}
          <Box pos="fixed" w="20%">
            <UserBarInfo />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};
