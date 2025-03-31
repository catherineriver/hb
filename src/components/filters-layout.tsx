import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import ProtectedLayout from "@/components/protected-layout";

import React from "react";
import {AuthorsFilterProvider} from "@/context/authors-context";
import {PitchesFilterProvider} from "@/context/pitches-context";

const FiltersLayout = ({ children, filterPanel }: { children: React.ReactNode,  filterPanel: React.ReactNode; }) => {
    return (
        <ProtectedLayout>
            <AuthorsFilterProvider>
                <PitchesFilterProvider>
                <Flex direction="column" maxHeight="100vh">
                    <Box position="fixed" top="0" left="0" w="100%" zIndex="10" bg="white">
                        <Header withNav />
                        <Box display={{ base: 'flex', md: 'none'}} w="100%" justifyContent="center" overflowY="scroll" maxHeight="calc(100dvh - 70px)">
                            {filterPanel}
                        </Box>
                    </Box>

                    <Flex mt="82px" w="100%" flex="1" minHeight="0" height="fit-content">
                        <Box w="300px" overflowY="scroll" minHeight="0" display={{ base: 'none', md: 'flex' }} borderRight="1px solid #ddd">
                            {filterPanel}
                        </Box>

                        <Box flex="1" maxW={{ base: 'none', md: ''}} m="0 auto" overflowY="auto" minHeight="0">
                            {children}
                        </Box>
                    </Flex>

                </Flex>
                </PitchesFilterProvider>
            </AuthorsFilterProvider>

        </ProtectedLayout>
    );
};

export default FiltersLayout;
