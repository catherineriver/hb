import {Box, Flex } from "@chakra-ui/react";;
import Navbar from "@/components/ui/navbar";
import Header from "@/components/ui/header";

const MainLayout = ({ children, sidebarContent }: { children: React.ReactNode, sidebarContent?: React.ReactNode }) => {
    return (
        <Flex height="100vh" direction="column">
            <Box>
                <Header withRegionSelector withSorting />
            </Box>

            {/* Main Layout */}
            <Flex flex={1} overflow="hidden">
                {/* Динамический сайдбар */}
                <Box
                    borderRight="1px solid #2E2E3A"
                    w="250px"
                    p={4}
                    display="flex"
                    flexDirection="column"
                    height="100%"
                >
                    {/* Контент сайдбара занимает всю высоту */}
                    <Box flex="1" overflowY="auto">
                        {sidebarContent}
                    </Box>

                    {/* Navbar остается внизу */}
                    <Box mt="auto">
                        <Navbar />
                    </Box>
                </Box>

                {/* Контентная часть */}
                <Box flex={1} overflowY="auto" fontFamily="body">
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};

export default MainLayout;
