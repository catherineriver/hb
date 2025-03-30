'use client';

import { Box, Container, Flex, Heading, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React, {useEffect, useState} from "react";
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js'

const App = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();
            setSession(session);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return (
        <Container maxW="100vw" minH="-webkit-fill-available">
            <Flex h={{ base: "100vh" }}
                  direction={{ base: "column", md: "row" }}
                  alignItems="center"
                  justifyContent={{ base: "space-between", md: "center" }}
                  >
                {/* Левая секция (61.8%) */}
                <Box w={{ base: "100%", md: "61.8%" }}
                     flexGrow={{ base: "1", md: "0" }}
                     h="100%"
                     textAlign={{ base: "left", md: "left" }}
                     display="flex"
                     flexDirection="column"
                     justifyContent={{ base: 'flex-start', md: 'center' }}
                     position="relative"
                     px={{ base: 6, md: 6 }}
                     py={{ base: 6, md: 0 }}
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
                    <Heading as="h1" fontSize={{ base: "38px", md: "74px" }} fontWeight="bold" lineHeight="1.1" fontFamily="Futura" maxW="900px">
                        Связываем журналистов и&nbsp;фотографов с&nbsp;независимыми медиа по всему миру.
                    </Heading>
                </Box>

                {/* Правая секция (38.2%) */}
                    {!session ? (
                        <Flex direction="column" justifyContent='center' alignItems={{ base: "flex-end", md: "flex-start" }} h="100%" w={{ base: "100%", md: "38.2%" }}>
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
                                              d="M533.5 278.4c0-17.4-1.5-34.2-4.3-50.4H272v95.3h147.4c-6.3 33.7-25 62.3-53.3 81.3v67.4h86.2c50.4-46.4 80.2-114.9 80.2-193.6z"/>
                                        <path fill="#34A853"
                                              d="M272 544.3c72.3 0 133-23.9 177.3-64.9l-86.2-67.4c-23.9 16.2-54.5 25.8-91.1 25.8-69.9 0-129.2-47.2-150.5-110.5H33.5v69.5c44.3 88 135.1 147.5 238.5 147.5z"/>
                                        <path fill="#FBBC05"
                                              d="M121.5 327.3c-10.2-30.1-10.2-62.3 0-92.4v-69.5H33.5c-35.5 70.9-35.5 160.5 0 231.4l88-69.5z"/>
                                        <path fill="#EA4335"
                                              d="M272 107.7c39.4 0 75 13.6 102.8 40.5l77.2-77.2C405 26 344.3 0 272 0 168.6 0 77.8 59.5 33.5 147.5l88 69.5C142.8 154.9 202.1 107.7 272 107.7z"/>
                                    </svg>
                                    Войти через Google
                                </Button>
                            </Box>
                        </Flex>
                    ) : (
                        <Flex direction="column" alignItems={{ base: "flex-end", md: "flex-start" }} h="100%" w={{ base: "100%", md: "38.2%" }}>
                            <Button onClick={handleLogout} colorScheme="blue">
                                выйти
                            </Button>
                            <Link
                                h={{ base: "100%", md: "61.8%" }}
                                w="100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                alignItems={{ base: 'flex-end', md: "flex-start" }}
                                fontSize={{ base: "24px", md: "38px" }}
                                mt={{ base: "auto", md: 0 }}
                                transition="all 0.2s ease-in-out"
                                px={6}
                                _hover={{
                                    background: '#000086',
                                    color: '#fff',
                                }}
                                as={NextLink}
                                href="/authors"
                                fontWeight="medium"
                            >
                                Найти автора

                            </Link>
                            <Link
                                as={NextLink}
                                href="/pitches"
                                fontWeight="medium"
                                position="relative"
                                fontSize={{ base: "24px", md: "38px" }}
                                h={{ base: "100%", md: "38.2%" }}
                                w="100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems={{ base: 'flex-end', md: "flex-start" }}
                                mt={{ base: "auto", md: 0 }}
                                transition="all 0.2s ease-in-out"
                                px={6}
                                _hover={{
                                    background: '#000086',
                                    color: '#fff',
                                }}
                            >
                                Посмотреть питчи
                            </Link>
                        </Flex>
                    )}
            </Flex>
        </Container>
    );
};

export default App;
