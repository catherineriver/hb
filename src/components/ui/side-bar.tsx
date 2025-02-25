import {VStack, Button, Text} from "@chakra-ui/react";
import { useNews } from "@/context/news-context"; // Используем глобальный контекст
import React from "react";
import useMockData from "@/hooks/useMockData";


const SidebarCategories = () => {
    const { selectedTags, setSelectedTags } = useNews();
    const { mockData } = useMockData();
    if (!mockData) return null;


    const tagsCount = mockData.tags.reduce((acc, tag) => {
        acc[tag] = mockData.data.filter(news => news.tags.includes(tag)).length;
        return acc;
    }, {} as Record<string, number>);

    const toggleTag = (tag: string) => {
        setSelectedTags((prevTags: string[]) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag) // Удаляем, если уже выбран
                : [...prevTags, tag] // Добавляем новый тег
        );
    };

    const resetTags = () => {
        setSelectedTags(() => []);
    };
    return (
        <VStack align="start" gap="0">
            <Button
                size="sm"
                variant="plain"
                color={selectedTags.length === 0 ? "#2E2E3A" : "#D9D9E3"}
                textDecoration={selectedTags.length === 0 ? "underline" : "none"}
                onClick={() =>resetTags()}
            >
                <Text fontFamily="heading" textTransform="uppercase">Все темы</Text>
            </Button>
            {mockData.tags.map(tag => (
                <Button
                    textTransform="uppercase"
                    key={tag}
                    size="sm"
                    variant="plain"
                    color={selectedTags.includes(tag)? "#2E2E3A" : "#D9D9E3"}
                    onClick={() => toggleTag(tag)}
                >
                    <Text fontFamily="heading" textDecoration={selectedTags.includes(tag)? "underline" : "none"}>{tag}</Text>
                    <Text color="{colors.neutral}">({tagsCount[tag]})</Text>
                    {selectedTags.includes(tag) && "⛌"}
                </Button>
            ))}

        </VStack>
    );
};

export default SidebarCategories;
