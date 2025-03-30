'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (session) {
                setIsAuthenticated(true);
            } else {
                router.push('/');
            }

            setLoading(false);
        };

        checkSession();
    }, [router]);

    if (loading) return null;

    return isAuthenticated ? <>{children}</> : null;
}
