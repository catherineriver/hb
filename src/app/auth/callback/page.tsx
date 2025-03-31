'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (session) {
                router.push('/');
            } else {
                router.push('/access-restricted');
            }
        };

        checkSession();
    }, [router]);

    return null;
}
