'use client';

import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
    };

    return (
        <Center height="100vh">
            <Stack textAlign="center">
                <Heading size="lg">Вход в систему</Heading>
                <Button onClick={handleLogin} colorScheme="blue">
                    Войти через Google
                </Button>
            </Stack>
        </Center>
    );
}
