"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Text,
    SimpleGrid,
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import SidebarCategories from "@/components/ui/side-bar";
import { useNews } from "@/context/news-context";
import useMockData, { Pitch } from "@/hooks/useMockData";
import PitchCard from "@/components/ui/pitch-card";


const App = () => {
    const { selectedTags, selectedFormat, sortBy } = useNews();
    const { mockData, loading, error } = useMockData();
    const [news, setNews] = useState<Pitch[]>([]);

    useEffect(() => {
        if (mockData) {
            let filteredNews = mockData.data;

            if (selectedFormat) {
                filteredNews = filteredNews.filter((news) => news.category === selectedFormat);
            }

            if (selectedTags) {
                filteredNews = filteredNews.filter(news =>
                    selectedTags.length === 0 || selectedTags.some(tag => news.tags.includes(tag)))
            }

            if (sortBy) {
                filteredNews = filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }

            setNews(filteredNews);
        }
    }, [mockData, sortBy, selectedTags, selectedFormat]);

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text color="red.500">Ошибка: {error}</Text>;

    return (
        <MainLayout sidebarContent={<SidebarCategories />}>
            <Flex height="100%">
                <Box flex={2} overflowY="auto">
                    {news.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            Ничего не найдено
                        </Text>
                    ) : (
                        <SimpleGrid columns={[1, null, 2]} position="relative">
                            {news.map((item, index) => (
                                <Box
                                    key={item.id}
                                    bg={(index % 2 === 0) === (Math.floor(index / 2) % 2 === 0) ? "rgba(223, 220,219, 0.2)" : "white"}
                                    px="16px"
                                    py="20px"
                                    borderRadius="md"
                                >
                                    <PitchCard item={item} />
                                </Box>
                            ))}
                            <Box
                                position="absolute"
                                left="50%"
                                top={0}
                                bottom={0}
                                width="2px"
                                backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition= "left top"
                                backgroundRepeat= "repeat-y"
                                backgroundSize= "2px 4px"
                                transform="translateX(-50%)"
                                display={{ base: "none", md: "block" }}
                            />
                        </SimpleGrid>
                    )}
                </Box>
            </Flex>
        </MainLayout>
    );
};

export default App;
