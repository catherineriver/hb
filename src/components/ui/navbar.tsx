"use client";

import {Box, Link as ChakraLink, Stack, Checkbox} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useManagerContext } from "@/context/mock-context";

export const navigationData = [
    { href: "/authors", label: "Авторы" },
    { href: "/pitches", label: "Питчи" },
    { href: "/organisation", label: "Ваша организация" },
];

export default function Navbar(props: { inline?: boolean }) {
    const pathname = usePathname();
    const [session, setSession] = useState<Session | null>(null);
    const { isManager, setIsManager } = useManagerContext();

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
                <Checkbox.Root
                    checked={isManager}
                    onCheckedChange={(e) => setIsManager(!!e.checked)}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control
                        css={{
                            '&[data-state="unchecked"]': {
                                borderColor: "{borders.input}",
                                background: 'white',
                                color: "{colors.lightGray}"
                            },
                            '&[data-state="checked"]': {
                                borderColor: "{borders.input}",
                                background: 'white',
                            },
                        }}
                    >
                        <Checkbox.Indicator>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path
                                    fill="currentColor"
                                    d="M6.173 11.414L3.293 8.536a1 1 0 011.414-1.414l1.466 1.466 4.293-4.293a1 1 0 011.414 1.414L6.173 11.414z"
                                />
                            </svg>
                        </Checkbox.Indicator>
                    </Checkbox.Control>
                    <Checkbox.Label>Я Менеджер</Checkbox.Label>
                </Checkbox.Root>
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
