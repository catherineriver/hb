import {createContext, useCallback, useContext, useState} from "react";
import {AuthorType} from "@/hooks/useMockData";

interface Filters {
    search?: string;
    format?: string;
    tags?: string[];
    location?: string;
    region?: string;
    urgent?: boolean;
    travel?: boolean;
    experience?: boolean;
}

interface FilterContextProps {
    filters: Filters;
    setFilters: (filters: Partial<Filters>) => void;
    authors: AuthorType[];
    loading: boolean;
    error: string | null;
    fetchSearchedAuthors: (query: string, filters: Record<string, any>) => Promise<void>;
    fetchInitialAuthors: () => Promise<void>;
    notFound: boolean;
}

const AuthorsContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [authors, setAuthors] = useState<AuthorType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [notFound, setNotFound] = useState(false);

    const fetchInitialAuthors = async () => {
        try {
            const res = await fetch("/api/authors");
            const data = await res.json();
            setAuthors(data.authors);
        } catch (e) {
            setError("Ошибка при загрузке");
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchedAuthors = async (query: string = "", filters: Record<string, any> = {}) => {
        try {
            setLoading(true);
            let url = "/api/authors?";
            if(query) {
                url += `search=${encodeURIComponent(query)}&`;
            }
            if(filters.experience) url += `experience=true&`;
            if(filters.travel) url += `travel=true&`;
            if(filters.urgent) url += `urgent=true&`;
            const res = await fetch(url);
            const data = await res.json();
            setAuthors(data.authors);
            setNotFound(data.authors.length === 0);
        } catch (e) {
            setError("Ошибка при поиске");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthorsContext.Provider value={{ filters, setFilters, authors, loading, error, fetchSearchedAuthors, fetchInitialAuthors, notFound }}>
            {children}
        </AuthorsContext.Provider>
    );
};

export const useAuthorsFilter = () => {
    const context = useContext(AuthorsContext);
    if (!context) {
        throw new Error("useAuthorsFilter must be used within an FilterProvider");
    }
    return context as FilterContextProps;
};

export type { Filters };
