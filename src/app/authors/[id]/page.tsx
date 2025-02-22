"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import useMockData, {NewsItem} from "@/hooks/useMockData";
import PageLayout from "@/components/page-layout";

const PitchPage = () => {
    const { id } = useParams();
    const { mockData, loading, error } = useMockData();
    const [pitch, setPitch] = useState<NewsItem>(null);

    useEffect(() => {
        if (mockData) {
            const foundPitch = mockData.data.find((item) => item.id.toString() === id);
            setPitch(foundPitch);
        }
    }, [mockData, id]);

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text color="red.500">Ошибка: {error}</Text>;
    if (!pitch) return <Text textAlign="center">Питч не найден</Text>;

    return (
        <PageLayout>
        <Box p={6}>
            <Heading>{pitch.title}</Heading>
            <HStack mt={2}>
                <Avatar size="sm" />
                <Text>{pitch.author}</Text>
            </HStack>
            <Text mt={4}>{pitch.full}</Text>
        </Box>
        </PageLayout>
    );
};

export default PitchPage;
