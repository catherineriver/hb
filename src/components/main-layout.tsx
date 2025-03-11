import {Box, Flex } from "@chakra-ui/react";;
import Navbar from "@/components/ui/navbar";
import Header from "@/components/ui/header";
import TopFilterPanel from "@/components/ui/TopFilterPanel";

const MainLayout = ({ children, sidebarContent }: { children: React.ReactNode, sidebarContent?: React.ReactNode }) => {
    return (
        <Flex height="100vh" direction="column">
            <Box>
                <Header withNav />
                <TopFilterPanel />
            </Box>

            {/* Main Layout */}
            <Flex flex={1} overflow="hidden" mx='100px'>
                {/* Контентная часть */}
                <Box flex={1} overflowY="auto" fontFamily="body">
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};

export default MainLayout;
