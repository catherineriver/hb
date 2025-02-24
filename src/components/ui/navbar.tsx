"use client";

import {VStack, Box, Link as ChakraLink} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navigationData = [
    { href: "/authors", label: "Авторы" },
    { href: "/organizations", label: "Организации" },
    { href: "/settings", label: "Ваша организация" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <Box as="nav" p={4}>
            <VStack>
                {navigationData.map(({ href, label }) => (
                    <ChakraLink
                        key={href}
                        as={Link}
                        href={href}
                        fontWeight={pathname === href ? "bold" : "normal"}
                        textDecoration={pathname === href ? "underline" : "none"}
                        _hover={{ textDecoration: "underline" }}
                    >
                        {label}
                    </ChakraLink>
                ))}
            </VStack>
        </Box>
    );
}
