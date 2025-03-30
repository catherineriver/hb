import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import TopFilterPanel from "@/components/ui/TopFilterPanel";
import ProtectedLayout from "@/components/protected-layout";

const MainLayout = ({ children, withTopPanel }: { children: React.ReactNode, withTopPanel?: boolean }) => {
    return (
        <ProtectedLayout>
            <Flex direction="column">
                {/* Закрепленный хедер и панель фильтров */}
                <Box position="fixed" top="0" left="0" w="100%" zIndex="10" bg="white">
                    <Header withNav />
                    {withTopPanel && <TopFilterPanel />}
                </Box>

                {/* Основной контент с отступом */}
                <Flex flex={1} overflowY="auto" fontFamily="body" maxWidth="1200px" margin="0 auto" pt="140px">
                    {children}
                </Flex>
            </Flex>
        </ProtectedLayout>
    );
};

export default MainLayout;
