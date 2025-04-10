import {Box, Flex, Button, HStack} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/header";
import {FaArrowLeft} from "react-icons/fa";
import ProtectedLayout from "@/components/protected-layout";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    return (
        <ProtectedLayout>
            <Flex height="100vh" direction="column">
                <Box>
                    <Header withNav />
                </Box>

                {/* Main Layout */}
                <Flex flex={1} overflow="hidden" justifyContent="center" w="100%">
                    <HStack py="3" alignItems="flex-start" w="100%" justifyContent="center">
                        <Box p={6}
                             position={{ base: 'absolute', md: 'relative' }}
                             left={{ base: '0', md: 'auto' }}
                             zIndex="10"
                             display={{ base: 'none', md: 'block'}}
                        >
                            <Button onClick={() => router.back()} variant="solid" borderRadius={50} background="#000086" color="white" size={{ base: 'sm', md: 'lg'}}>
                                <FaArrowLeft />
                            </Button>
                        </Box>
                        <Box overflowY="auto" fontFamily="body" w="100%" h='-webkit-fill-available'>
                            {children}
                        </Box>
                    </HStack>
                </Flex>
            </Flex>
        </ProtectedLayout>
    );
};

export default PageLayout;
