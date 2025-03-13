"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Text,
    SimpleGrid,
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import { useNews } from "@/context/news-context";
import useMockData, { Pitch } from "@/hooks/useMockData";
import PitchCard from "@/components/ui/pitch-card";

const Pitches = () => {
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

    const isHighlighted = (index: number) => {
        return (index % 2 === 0) === (Math.floor(index / 2) % 2 === 0);
    };

    return (
        <MainLayout>
            <Flex height="100%">
                <Box flex={2} overflowY="auto">
                    {news.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            Ничего не найдено
                        </Text>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2 }} position="relative" gridAutoFlow="row" minHeight="100%">
                            {news.map((item, index) => (
                                <Box key={item.id} height="auto">
                                    <PitchCard isHighlighted={isHighlighted(index)} item={item} />
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

export default Pitches;
