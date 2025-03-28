'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleAuth = async () => {
            const {
                data: { session },
                error
            } = await supabase.auth.getSession();

            if (session) {
                router.push('/'); // перенаправление после входа
            } else if (error) {
                console.error(error);
            }
        };

        handleAuth();
    }, [router]);

    return <p>Завершаем вход...</p>;
}
