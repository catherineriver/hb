"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import useMockData from "@/hooks/useMockData";
import { useNews } from "@/context/news-context";

const Tags = () => {
    const { selectedTags, setSelectedTags } = useNews();
    const { mockData } = useMockData();

    if (!mockData) return <Text textAlign="center" py={4}>Загрузка...</Text>;

    const toggleTag = (tag: string) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

    return (
        <Box borderBottom="2px solid black" py={2}>
            <HStack gap={4} justify="center">
                {mockData.tags.map((tag, index) => (
                    <HStack key={tag} gap={2}>
                        <Text
                            fontSize="lg"
                            fontWeight={selectedTags.includes(tag) ? "bold" : "normal"}
                            color={selectedTags.includes(tag) ? "black" : "gray.600"}
                            _hover={{ cursor: "pointer", color: "blue" }}
                            textTransform="uppercase"
                            onClick={() => toggleTag(tag)}
                        >
                            <HStack>
                                {tag}
                                {selectedTags.includes(tag) && (
                                    <Text fontSize="xs">⛌</Text>
                                )}
                            </HStack>
                        </Text>
                        {index < mockData.tags.length - 1 && <Text color="gray.500">•</Text>}
                    </HStack>
                ))}
            </HStack>
        </Box>
    );
};

export default Tags;
