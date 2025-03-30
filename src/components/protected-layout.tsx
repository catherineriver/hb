'use client';

import {useCheckSession} from "@/hooks/useCheckSession";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useCheckSession();

    if (loading) return null;

    return isAuthenticated ? <>{children}</> : null;
}
