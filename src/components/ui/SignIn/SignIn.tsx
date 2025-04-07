import { Button, Box, Flex } from '@chakra-ui/react';

export default function SignIn({ handleLogin }: { handleLogin: () => void }) {
    return (
        <Flex direction="column" justifyContent='center' alignItems={{ base: "flex-end", md: "flex-start" }} h="100%" w={{ base: "auto", md: "38.2%" }}>
            <Box w="100%" display="flex" justifyContent={{ base: 'flex-end', md: 'center' }}>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    colorScheme="gray"
                    variant="outline"
                    px={3}
                >
                    <svg width="20" height="20" viewBox="0 0 533.5 544.3" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4"
                            d="M533.5 278.4c0-17.4-1.5-34.2-4.3-50.4H272v95.3h147.4c-6.3 33.7-25 62.3-53.3 81.3v67.4h86.2c50.4-46.4 80.2-114.9 80.2-193.6z" />
                        <path fill="#34A853"
                            d="M272 544.3c72.3 0 133-23.9 177.3-64.9l-86.2-67.4c-23.9 16.2-54.5 25.8-91.1 25.8-69.9 0-129.2-47.2-150.5-110.5H33.5v69.5c44.3 88 135.1 147.5 238.5 147.5z" />
                        <path fill="#FBBC05"
                            d="M121.5 327.3c-10.2-30.1-10.2-62.3 0-92.4v-69.5H33.5c-35.5 70.9-35.5 160.5 0 231.4l88-69.5z" />
                        <path fill="#EA4335"
                            d="M272 107.7c39.4 0 75 13.6 102.8 40.5l77.2-77.2C405 26 344.3 0 272 0 168.6 0 77.8 59.5 33.5 147.5l88 69.5C142.8 154.9 202.1 107.7 272 107.7z" />
                    </svg>
                    Войти через Google
                </Button>
            </Box>
        </Flex>
    );
}
