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
        console.log(selectedTags)
    };

    const resetTags = () => {
        setSelectedTags([]); // Clears all selected tags
    };
    return (
        <VStack align="start" spacing={3}>
            <Button
                size="lg"
                variant="plain"
                fontWeight={selectedTags.length === 0 ? "bold" : "normal"}
                onClick={() =>resetTags()}>
                <Text color="#333" fontSize="2xl">Все темы</Text>
            </Button>
            {mockData.tags.map(tag => (
                <Button
                    key={tag}
                    size="lg"
                    variant="plain"
                    fontWeight={selectedTags.includes(tag)? "bold" : "normal"}
                    onClick={() => toggleTag(tag)}
                >
                    <Text color="#333" fontSize="2xl">{tag}</Text>
                    <Text fontSize="lg" color="#333">({tagsCount[tag]})</Text>
                    {selectedTags.includes(tag) && (
                        <Text fontSize="xs" color="#333">⛌</Text>
                    )}
                </Button>
            ))}

        </VStack>
    );
};

export default SidebarCategories;
