"use client";

import {Box, Link as ChakraLink, Stack} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navigationData = [
    { href: "/authors", label: "Авторы" },
    { href: "/settings", label: "Ваша организация" },
];

export default function Navbar(props: { inline?: boolean; }) {
    const pathname = usePathname();

    return (
        <Box as="nav" p={4}>
            <Stack direction={props.inline ? 'row' : 'column'}>
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
            </Stack>
        </Box>
    );
}
