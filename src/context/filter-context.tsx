import { createContext, useContext, useState } from "react";

interface Filters {
    search: string;
    format: string | null;
    topics: string | null;
    location: string | null;
    region: string | null;
    urgent: boolean;
    travel: boolean;
    experience: boolean;
}

interface FilterContextProps {
    filters: Filters;
    setFilters: (filters: Partial<Filters>) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [filters, setFiltersState] = useState<Filters>({
        search: "",
        format: null,
        topics: null,
        location: null,
        region: null,
        urgent: false,
        travel: false,
        experience: false,
    });

    const setFilters = (newFilters: Partial<Filters>) => {
        setFiltersState((prev) => ({ ...prev, ...newFilters }));
    };

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useAuthorsFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useAuthorsFilter must be used within an AuthorsFilterProvider");
    }
    return context;
};
