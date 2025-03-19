import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import SideFilterPanel from "@/components/ui/SideFiltersPanel/SideFiltersPanel";

import React from "react";
import {FilterProvider} from "@/context/filter-context";

const FiltersLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <FilterProvider>
            <Flex direction="column" height="100vh">
                <Box position="fixed" top="0" left="0" w="100%" zIndex="10" bg="white">
                    <Header withNav />
                </Box>

                <Flex mt="70px" w="100%" h="100vh">
                    <Box position="sticky" top="70px" w="300px" h="100%">
                        <SideFilterPanel />
                    </Box>

                    <Box flex="1" maxW="900px" m="0 auto">
                        {children}
                    </Box>
                </Flex>

            </Flex>
        </FilterProvider>


    );
};

export default FiltersLayout;
