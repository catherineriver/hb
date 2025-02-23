"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid, Link,
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import SidebarCategories from "@/components/ui/side-bar";
import { useNews } from "@/context/news-context";
import useMockData, { Pitch } from "@/hooks/useMockData";
import {Avatar} from "@/components/ui/avatar";
import {useRouter} from "next/navigation";


const App = () => {
    const { selectedTags, selectedFormat, sortBy } = useNews();
    const { mockData, loading, error } = useMockData();
    const [news, setNews] = useState<Pitch[]>([]);
    const router = useRouter();

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
            <Flex height="100%" gap={4}>
                <Box flex={2} overflowY="auto">
                    {news.length === 0 ? (
                        <Text textAlign="center" py={4} fontSize="lg" color="gray.500">
                            Ничего не найдено
                        </Text>
                    ) : (
                        <SimpleGrid columns={[1, null, 2]} gap="40px">
                            {news.map((item, index) => (
                                <Box
                                    key={index}
                                    w="100%"
                                    px={4}
                                    py={2}
                                    cursor="pointer"
                                    onClick={() => router.push(`/pitches/${item.id}`)}
                                >
                                    <VStack align="start" spacing={1}>
                                        <Heading size="xl">{item.title}</Heading>
                                        <Text textStyle="sm">{item.description}</Text>
                                        <HStack w="100%" justify="space-between">
                                            <HStack align="center" w="100%" spacing={1}>
                                                <HStack align="center" w="100%" spacing={1}>
                                                    <Link href={`/authors/${item.author.id}`} color="blue.500">
                                                        <Avatar size="xxs"></Avatar>
                                                        <Text fontSize="sm">{item.author.name}</Text>
                                                    </Link>
                                                </HStack>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
            </Flex>
        </MainLayout>
    );
};

export default App;
