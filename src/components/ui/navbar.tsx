"use client";

import {Box, Link as ChakraLink, Stack} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

export const navigationData = [
    { href: "/authors", label: "Авторы" },
    { href: "/pitches", label: "Питчи" },
    { href: "/settings", label: "Ваша организация" },
];

export default function Navbar(props: { inline?: boolean }) {
    const pathname = usePathname();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    if (!session) return null;

    return (
        <Box as="nav" p={4}>
            <Stack direction={props.inline ? "row" : "column"} gap={5}>
                {navigationData
                    .filter(({ href }) => href !== pathname)
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
                <ChakraLink onClick={handleLogout} colorScheme="blue">
                    выйти
                </ChakraLink>
            </Stack>
        </Box>
    );
}
