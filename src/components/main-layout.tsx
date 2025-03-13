import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import TopFilterPanel from "@/components/ui/TopFilterPanel";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex direction="column">
            {/* Закрепленный хедер и панель фильтров */}
            <Box position="fixed" top="0" left="0" w="100%" zIndex="10" bg="white">
                <Header withNav />
                <TopFilterPanel />
            </Box>

            {/* Основной контент с отступом */}
            <Flex flex={1} overflowY="auto" fontFamily="body" maxWidth="1200px" margin="0 auto" pt="140px">
                {children}
            </Flex>
        </Flex>
    );
};

export default MainLayout;
