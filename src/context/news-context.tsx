import { createContext, useContext, useState, ReactNode } from "react";

// Типы состояния
interface NewsContextType {
    selectedTag: string | null;
    selectedFormat: string | null;
    setSelectedTag: (tag: string | null) => void;
    setSelectedFormat: (format: string | null) => void;
}

// Создание контекста
const NewsContext = createContext<NewsContextType>({
    selectedTag: null,
    selectedFormat: null,
    setSelectedTag: () => {},
    setSelectedFormat: () => {},
});

// Провайдер контекста
export const NewsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

    return (
        <NewsContext.Provider value={{ selectedTag, selectedFormat, setSelectedTag, setSelectedFormat }}>
            {children}
        </NewsContext.Provider>
    );
};

// Хук для использования контекста
export const useNews = () => useContext(NewsContext);
