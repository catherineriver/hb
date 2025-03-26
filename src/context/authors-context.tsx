import {createContext, useContext, useState, useCallback, useMemo} from "react";
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

    const fetchInitialAuthors = useCallback(async () => {
        try {
            const res = await fetch("/api/authors");
            console.log("fetchInitialAuthors called")
            const data = await res.json();
            setAuthors(data.authors);
        } catch (e) {
            console.error(e);
            setError("Ошибка при загрузке");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSearchedAuthors = useCallback(async (query: string = "", filters: Record<string, any> = {}) => {
        try {
            setLoading(true);
            let url = "/api/authors?";
            if(query) {
                url += `search=${encodeURIComponent(query)}&`;
            }
            if(filters.experience) url += `experience=true&`;
            if(filters.travel) url += `travel=true&`;
            if(filters.urgent) url += `urgent=true&`;
            if (filters.formats && filters.formats.length > 0) {
                url += `formats=${filters.formats.join(",")}&`;
            }
            if (filters.topics && filters.topics.length > 0) {
                url += `topics=${filters.topics.join(",")}&`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setAuthors(data.authors);
            setNotFound(data.authors.length === 0);
        } catch (e) {
            console.error(e);
            setError("Ошибка при поиске");
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        filters,
        setFilters,
        authors,
        loading,
        error,
        fetchSearchedAuthors,
        fetchInitialAuthors,
        notFound
    }), [
        filters,
        authors,
        loading,
        error,
        fetchSearchedAuthors,
        fetchInitialAuthors,
        notFound
    ]);

    return (
        <AuthorsContext.Provider value={contextValue}>
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
