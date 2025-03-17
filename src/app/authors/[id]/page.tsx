"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Box, Heading, Text, VStack, HStack, Highlight, Button, Stack} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Pitch, Author } from "@/hooks/useMockData";
import PageLayout from "@/components/page-layout";
import PitchCard from "@/components/ui/pitch-card";
import {Tooltip} from "@/components/ui/tooltip";
import {FaInfoCircle} from "react-icons/fa";

const AuthorPage = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState<Author | null>(null);
    const [pitches, setPitches] = useState<Pitch[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/mockData.json"); // Исправлен путь
                if (!response.ok) throw new Error("Ошибка загрузки данных");

                const data = await response.json();
                console.log("ID из useParams:", id);
                console.log("Загруженные данные:", data);

                const foundAuthor = data.authors.find((item: Author) => item.id.toString() === id);
                console.log("Найденный автор:", foundAuthor);

                setAuthor(foundAuthor || null);
                setPitches(foundAuthor.articles)
            } catch (err) {
               setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text color="red.500">Ошибка: {error}</Text>;
    if (!author) return <Text textAlign="center">Автор не найден</Text>;


    return (
        <PageLayout>
            <VStack m={4} maxW="800px" mx="auto" my={6} align="flex-start" p={{ base: "20px", md: '0' }}>
                <HStack justify="center" w="100%">
                    <Avatar size="2xl" />
                </HStack>

                <HStack justify="center" align='center' w="100%">
                    <Heading size="3xl" textAlign="center">{author.name}</Heading>
                    <Tooltip showArrow interactive content="Это псевдоним">
                        <Box p={2} w="16px">
                            <FaInfoCircle />
                        </Box>
                    </Tooltip>

                </HStack>


                {/* Контейнер с кнопкой */}
                <HStack justify="center" w="100%" my="16px">
                    <Button background="#00A676" color="#fff" size="md" variant="solid" px={5}>
                        Связаться
                    </Button>
                </HStack>

                {/* Метаданные */}
                <VStack align="start" width="100%" mt="40px">
                    <HStack justify="space-between" width="100%">
                        <Heading size='sm' fontWeight="bold">📂 Успешных материалов:</Heading>
                        <Text colorScheme="blue">{author.articles.length}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Heading size='sm' fontWeight="bold">🏢 Работал с организациями:</Heading>
                        <Text colorScheme="purple">{author.organizations?.length || 0}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Heading size='sm' fontWeight="bold">📍 Регион/город:</Heading>
                        <Text  fontSize="sm">{author.location}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Heading size='sm' fontWeight="bold">✈️ Готов к командировкам:</Heading>
                        <Text  fontSize="sm">{author.ready_for_travel ? '✅' : '❌'}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Heading size='sm' fontWeight="bold">⚡ Готов к срочной работе:</Heading>
                        <Text  fontSize="sm">{author.ready_for_urgent ? '✅' : '❌'}</Text>
                    </HStack>
                </VStack>

                {/* Темы и регионы */}
                <Box my="12px">
                    <Text fontSize="sm">
                        Пишет на темы{" "}
                        {/*@ts-expect-error: Should expect string*/}
                        {author.topics.map((topic, index) => (
                            <React.Fragment key={topic}>
                                <Highlight query={[topic]} styles={{ color: "#000086" }}>
                                    {topic}
                                </Highlight>
                                {index < author.topics.length - 1 && ", "}
                            </React.Fragment>
                        ))}
                        {" "}в регионах{" "}
                        {author.regions.map((region, index) => (
                            <React.Fragment key={region}>
                                <Highlight ignoreCase query={[region]} styles={{ color: "#000086" }}>
                                    {region}
                                </Highlight>
                                {index < author.regions.length - 1 && ", "}
                            </React.Fragment>
                        ))}
                        .{" "}Предпочитает жанры{" "}
                        {author.formats.map((format, index) => (
                            <React.Fragment key={format}>
                                <Highlight ignoreCase query={[format]} styles={{ color: "#000086" }}>
                                    {format}
                                </Highlight>
                                {index < author.formats.length - 1 && ", "}
                            </React.Fragment>
                        ))}
                    </Text>
                </Box>


                {/* Описание автора */}
                <Box w="100%">
                    <Heading size="xl" mb="20px">Автор о себе:</Heading>
                    <Text fontSize="sm">{author.bio}</Text>
                </Box>

                {/* Разделитель */}
                <Stack my={6} w="100%">
                    <Box
                        w="100%"
                        h="2px"
                        backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                        backgroundPosition= "left bottom"
                        backgroundRepeat= "repeat-x"
                        backgroundSize= "4px 100%"
                    ></Box>
                </Stack>

                {/* Список открытых питчей */}
                <VStack align="start" w="100%">
                    <Heading size="xl" mb="20px">Открытые питчи:</Heading>
                    {pitches.length > 0 ? (
                        pitches.map((pitch, index) => (
                            <PitchCard key={index} item={pitch} />
                        ))
                    ) : (
                        <Text>У этого автора пока нет питчей.</Text>
                    )}
                </VStack>
            </VStack>

        </PageLayout>
    );
};

export default AuthorPage;
