import {Box, Flex, VStack, Heading, HStack} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import Tags from "@/components/ui/tags";
import {useState} from "react";
import Header from "@/components/ui/Header";

const newsData = {
    global: "Новости о глобальных событиях...",
    local: "Местные новости и репортажи...",
    corruption: "Расследования о коррупции...",
    "human-rights": "Права человека и социальная справедливость...",
    politics: "Политические события и выборы...",
    international: "Международные события и мировая арена...",
};

const MainLayout = ({ children, sidebarContent }: { children: React.ReactNode, sidebarContent?: React.ReactNode }) => {
    return (
        <Flex height="100vh" direction="column">
            <Box>
                <Header />
            </Box>

            {/* Main Layout */}
            <Flex flex={1} overflow="hidden">
                {/* Динамический сайдбар */}
                <Box
                    borderRight="2px solid black"
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
                <Box flex={1} p={6} overflowY="auto" fontFamily="body">
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};

export default MainLayout;
