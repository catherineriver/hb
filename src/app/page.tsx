import { Box, Container, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const App = () => {
    return (
        <Container maxW="100vw" minH="-webkit-fill-available">
            <Flex h={{ base: "100vh" }}
                  direction={{ base: "column", md: "row" }}
                  alignItems="center"
                  justifyContent={{ base: "space-between", md: "center" }}
                  px={{ base: 4, md: 10 }}
                  py={{ base: 6, md: 0 }}>
                {/* Левая секция (61.8%) */}
                <Box w={{ base: "100%", md: "61.8%" }}
                     h="100%"
                     textAlign={{ base: "left", md: "left" }}
                     display="flex"
                     flexDirection="column"
                     justifyContent="center"
                     position="relative"
                     _after={{
                         content: '""',
                         backgroundImage: "radial-gradient(circle, #CCC 1px, transparent 1px)",
                         backgroundRepeat: "repeat-y",
                         backgroundSize: "2px 4px",
                         position: 'absolute',
                         right: '0',
                         width: '2px',
                         top: '0',
                         bottom: '0'
                     }}
                >
                    <Flex alignItems="center" mb={5}>
                        <Box w={{ base: "48px", md: "86px" }} h={{ base: "48px", md: "86px" }} bg="blue.800" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                            <svg width="85" height="86" viewBox="0 0 85 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M84.0163 43C84.0163 54.1429 79.5905 64.8294 71.7124 72.7086C63.8343 80.5878 53.1494 85.0142 42.0082 85.0142C33.6997 85.0142 25.5779 82.5501 18.6697 77.9336C11.7615 73.317 6.3772 66.7553 3.1977 59.0782C0.0182056 51.4011 -0.813701 42.9534 0.807192 34.8035C2.42809 26.6535 6.42898 19.1673 12.3039 13.2915C18.1789 7.41574 25.664 3.41427 33.8128 1.79315C41.9616 0.172022 50.408 1.00405 58.084 4.184C65.76 7.36396 72.3207 12.749 76.9367 19.6582C81.5526 26.5674 84.0163 34.6904 84.0163 43Z" fill="#000086"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M47.3915 47.0513L12.7115 27.3721L29.8775 62.463L47.3915 47.0513Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M74.0053 43.0724L39.3252 23.3931L56.4913 58.484L74.0053 43.0724Z" fill="white"/>
                            </svg>

                        </Box>
                    </Flex>
                    <Heading as="h1" fontSize={{ base: "38px", md: "74px" }} fontWeight="bold" lineHeight="1.1" fontFamily="Futura" maxW="1020px">
                        Связываем журналистов и&nbsp;фотографов с&nbsp;независимыми медиа по всему миру.
                    </Heading>
                </Box>

                {/* Правая секция (38.2%) */}
                <Box
                    w={{ base: "100%", md: "38.2%" }}
                    display="flex"
                    flexDirection="column"
                    textAlign={{ base: "center", md: "left" }}
                    mt={{ base: "auto", md: 0 }}
                    p={4}
                >
                    <Flex direction="column" alignItems={{ base: "flex-end", md: "flex-start" }}>
                        <Link
                            as={NextLink}
                            href="/authors"
                            fontWeight="medium"
                            display="flex"
                            alignItems="center"
                            position="relative"
                            fontSize={{ base: "24px", md: "38px" }}
                            _hover={{
                                _after: {
                                    content: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_232_3031)'%3E%3Cpath d='M33.292 31.2919L38.586 25.9999H6V23.9999H38.586L33.292 18.7079L34.706 17.2939L42.414 24.9999L34.706 32.7079L33.292 31.2919Z' fill='black'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_232_3031'%3E%3Crect width='48' height='48' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
                                    position: "absolute",
                                    right: "-58px",
                                    transition: "right 0.2s ease-in-out",
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    height: '48px',
                                },
                            }}
                        >
                            Найти автора
                        </Link>
                        <Link
                            as={NextLink}
                            href="/pitches"
                            fontWeight="medium"
                            display="flex"
                            alignItems="center"
                            position="relative"
                            fontSize={{ base: "24px", md: "38px" }}
                            _hover={{
                                _after: {
                                    content: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_232_3031)'%3E%3Cpath d='M33.292 31.2919L38.586 25.9999H6V23.9999H38.586L33.292 18.7079L34.706 17.2939L42.414 24.9999L34.706 32.7079L33.292 31.2919Z' fill='black'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_232_3031'%3E%3Crect width='48' height='48' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
                                    position: "absolute",
                                    right: "-58px",
                                    transition: "right 0.2s ease-in-out",
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    height: '48px',
                                },
                            }}
                        >
                            Посмотреть питчи
                        </Link>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
};

export default App;
