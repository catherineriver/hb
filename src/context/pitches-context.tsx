import {createContext, useContext, useState, useCallback, useMemo} from "react";
import {PitchType} from "@/hooks/useMockData";

interface Filters {
    format?: string;
    region?: string;
}

interface PitchesFilterContextProps {
    filters: Filters;
    setFilters: (filters: Partial<Filters>) => void;
    pitches: PitchType[];
    loading: boolean;
    error: string | null;
    fetchFilteredPitches: (filters: Record<string, any>) => Promise<void>;
    fetchInitialPitches: () => Promise<void>;
    notFound: boolean;
}

const PitchesContext = createContext<PitchesFilterContextProps | undefined>(undefined);

export const PitchesFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [pitches, setPitches] = useState<PitchType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({});
    const [notFound, setNotFound] = useState(false);

    const fetchInitialPitches = useCallback(async () => {
        try {
            const res = await fetch("/api/pitches");
            const data = await res.json();
            setPitches(data.data);
        } catch (e) {
            console.error(e);
            setError("Ошибка при загрузке");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchFilteredPitches = useCallback(async (filters: Record<string, any> = {}) => {
        try {
            setLoading(true);
            let url = "/api/pitches?";
            if (filters.formats && filters.formats.length > 0) {
                url += `formats=${filters.formats.join(",")}&`;
            }
            if (filters.topics && filters.topics.length > 0) {
                url += `topics=${filters.topics.join(",")}&`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setPitches(data.authors);
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
        pitches,
        loading,
        error,
        fetchInitialPitches,
        fetchFilteredPitches,
        notFound
    }), [
        filters,
        pitches,
        loading,
        error,
        fetchInitialPitches,
        fetchFilteredPitches,
        notFound
    ]);

    return (
        <PitchesContext.Provider value={contextValue}>
            {children}
        </PitchesContext.Provider>
    );
};


export const usePitchesFilter = () => {
    const context = useContext(PitchesContext);
    if (!context) {
        throw new Error("usePitchesFilter must be used within an FilterProvider");
    }
    return context as PitchesFilterContextProps;
};

export type { Filters };
