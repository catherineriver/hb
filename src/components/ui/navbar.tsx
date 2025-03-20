"use client";

import { Box, Link as ChakraLink, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navigationData = [
    { href: "/authors", label: "Авторы" },
    { href: "/pitches", label: "Питчи" },
    { href: "/settings", label: "Ваша организация" },
];

export default function Navbar(props: { inline?: boolean }) {
    const pathname = usePathname();

    return (
        <Box as="nav" p={4}>
            <Stack direction={props.inline ? "row" : "column"} gap={5}>
                {navigationData
                    .filter(({ href }) => href !== pathname) // Скрываем текущий роут
                    .map(({ href, label }) => (
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
            </Stack>
        </Box>
    );
}
