"use client";

import {VStack, Box, Link as ChakraLink, Text} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <Box as="nav" p={4}>
            <VStack spacing={2}>
                <ChakraLink
                    as={Link}
                    href="/"
                    fontWeight={pathname === "/" ? "bold" : "normal"}
                    textDecoration={pathname === "/" ? "underline" : "none"}
                    _hover={{ textDecoration: "underline" }}
                >
                    <Text fontSize="lg">Главная</Text>
                </ChakraLink>
                <ChakraLink
                    as={Link}
                    href="/authors"
                    fontWeight={pathname === "/authors" ? "bold" : "normal"}
                    textDecoration={pathname === "/authors" ? "underline" : "none"}
                    _hover={{ textDecoration: "underline" }}
                >
                    <Text fontSize="lg">Авторы</Text>
                </ChakraLink>
                <ChakraLink
                    as={Link}
                    href="/organizations"
                    fontWeight={pathname === "/organizations" ? "bold" : "normal"}
                    textDecoration={pathname === "/organizations" ? "underline" : "none"}
                    _hover={{ textDecoration: "underline" }}
                >
                    <Text fontSize="lg">Организации</Text>
                </ChakraLink>
                <ChakraLink
                    as={Link}
                    href="/settings"
                    fontWeight={pathname === "/settings" ? "bold" : "normal"}
                    textDecoration={pathname === "/settings" ? "underline" : "none"}
                    _hover={{ textDecoration: "underline" }}
                >
                    <Text fontSize="lg">Настройки</Text>
                </ChakraLink>
            </VStack>
        </Box>
    );
}
