import { Grid, GridItem } from "@chakra-ui/react";
import SimpleSidebar from "../components/sidebarLeft";

import { BillsBar } from "../components/billsBar";
import { MenuSlice } from "../components/menuSlice";
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
          w="full"
          bg="#FFFFFF"
          borderLeft="1px"
          borderLeftColor="#E2E8F0"
          display={{ base: "none", lg: "block" }}
          gap="4"
        >
          <BillsBar />
        </GridItem>
      </Grid>
      {/* <Grid templateColumns="repeat(8, 1fr)" gap={6}>
        <GridItem colSpan={6} h="100vh" w="full" bg="blue.500" />
        <GridItem  />
      </Grid> */}
    </>
  );
};
