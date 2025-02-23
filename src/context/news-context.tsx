"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// Типы состояния
interface NewsContextType {
    selectedTags: string[];
    selectedFormat: string | null;
    setSelectedTags: (tags: (prevTags: string[]) => string[]) => void; // Исправлено: ожидаем массив
    setSelectedFormat: (format: string | null) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}

// Создание контекста
const NewsContext = createContext<NewsContextType>({
    selectedTags: [],
    selectedFormat: null,
    sortBy: "newest",
    setSortBy: () => {},
    setSelectedTags: () => {},
    setSelectedFormat: () => {},
});

// Провайдер контекста
export const NewsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("newest");

    return (
        <NewsContext.Provider value={{ selectedTags, selectedFormat, setSelectedTags, setSelectedFormat, sortBy, setSortBy }}>
            {children}
        </NewsContext.Provider>
    );
};

// Хук для использования контекста
export const useNews = () => useContext(NewsContext);
