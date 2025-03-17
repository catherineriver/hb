"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Text,
    SimpleGrid,
    Spinner
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import { useNews } from "@/context/news-context";
import { Pitch } from "@/hooks/useMockData";
import PitchCard from "@/components/ui/pitch-card";

const Pitches = () => {
    const { selectedTags, selectedFormat, sortBy } = useNews();
    const [post, setPosts] = useState<Pitch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/mockData.json");
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                const data = await response.json();

                let filteredPosts = data.data;

                if (selectedFormat) {
                    filteredPosts = filteredPosts.filter((post: Pitch) => post.content.format === selectedFormat);
                }

                if (selectedTags.length > 0) {
                    filteredPosts = filteredPosts.filter((post: Pitch) =>
                        selectedTags.some(tag => post.content.tags.includes(tag))
                    );
                }

                if (sortBy) {
                    filteredPosts = filteredPosts.sort((a: Pitch, b: Pitch) =>
                        new Date(b.content.date).getTime() - new Date(a.content.date).getTime()
                    );
                }

                setPosts(filteredPosts);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortBy, selectedTags, selectedFormat]);

    if (error) return <Text color="red.500">Ошибка: {error}</Text>;

    const isHighlighted = (index: number) => {
        return (index % 2 === 0) === (Math.floor(index / 2) % 2 === 0);
    };

    return (
        <MainLayout>
            <Flex height="100%">
                <Box flex={2} overflowY="auto">
                    {loading ? (
                        <Flex justify="center" align="center" height="100%" p={5}>
                            <Spinner size="xl" color="{colors.primary}" borderWidth="4px" />
                        </Flex>
                    ) : post.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            Ничего не найдено
                        </Text>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2 }} position="relative" gridAutoFlow="row" minHeight="100%">
                            {post.map((item, index) => (
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
                                backgroundImage="radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition="left top"
                                backgroundRepeat="repeat-y"
                                backgroundSize="2px 4px"
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
