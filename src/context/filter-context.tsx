import { createContext, useContext, useState } from "react";

type Filters = object

interface FilterContextProps {
    filters: Filters;
    setFilters: (filters: Partial<Filters>) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [filters, setFilters] = useState({});
    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useAuthorsFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useAuthorsFilter must be used within an FilterProvider");
    }
    return context;
};
