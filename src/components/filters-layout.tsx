import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import SideFilterPanel from "@/components/ui/SideFiltersPanel/SideFiltersPanel";

import React from "react";
import {FilterProvider} from "@/context/authors-context";

const FiltersLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <FilterProvider>
            <Flex direction="column" height="100vh">
                <Box position="fixed" top="0" left="0" w="100%" zIndex="10" bg="white">
                    <Header withNav />
                    <Box display={{ base: 'flex', md: 'none'}} w="100%" justifyContent="center" overflowY="scroll" maxHeight="calc(100dvh - 70px)">
                        <SideFilterPanel />
                    </Box>
                </Box>

                <Flex mt="70px" w="100%" flex="1" minHeight="0" height="fit-content">
                    <Box w="300px" overflowY="auto" minHeight="0" display={{ base: 'none', md: 'flex' }}>
                        <SideFilterPanel />
                    </Box>

                    <Box flex="1" maxW={{ base: 'none', md: '900px'}} m="0 auto" overflowY="auto" minHeight="0">
                        {children}
                    </Box>
                </Flex>

            </Flex>
        </FilterProvider>
    );
};

export default FiltersLayout;
