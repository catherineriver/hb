"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Box, Heading, Text, VStack, HStack, Link, Button, Icon, Stack} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import useMockData, { Pitch, Author } from "@/hooks/useMockData";
import PageLayout from "@/components/page-layout";
import {FaCheckCircle} from "react-icons/fa";

const AuthorPage = () => {
    const { id } = useParams();
    const { mockData, loading, error } = useMockData();
    const [author, setAuthor] = useState<Author | null>(null);
    const [pitches, setPitches] = useState<Pitch[]>([]);

    useEffect(() => {
        if (mockData) {
            const foundAuthor = mockData.authors.find((item) => item.id.toString() === id);
            setAuthor(foundAuthor ?? null);

            const authorPitches = mockData.data.filter((pitch) => pitch.author.id.toString() === id);
            setPitches(authorPitches);
        }
    }, [mockData, id]);

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text color="red.500">Ошибка: {error}</Text>;
    if (!author) return <Text textAlign="center">Автор не найден</Text>;

    return (
        <PageLayout>
            <VStack m={4} maxW="800px" mx="auto" my={6}>
                <Avatar size="xl" />
                <Heading size="lg" textAlign="center">{author.name}</Heading>

                {/* Контейнер с кнопкой */}
                <Button background="green" color="#fff" size="sm" variant="solid" px={2}>
                    Связаться
                </Button>

                {/* Метаданные */}
                <VStack align="start" width="100%">
                    <HStack justify="space-between" width="100%">
                        <Text fontSize="sm">📂 Успешных материалов:</Text>
                        <Text colorScheme="blue">{author.articles.length}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Text fontSize="sm">🏢 Работал с организациями:</Text>
                        <Text colorScheme="purple">{author.organizations?.length || 0}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Text fontSize="sm">📍 Регион/город:</Text>
                        <Text  fontSize="sm">{author.location}</Text>
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Text fontSize="sm">✈️ Готов к командировкам:</Text>
                        <Icon as={FaCheckCircle} color="green.500" />
                    </HStack>
                    <HStack justify="space-between" width="100%">
                        <Text fontSize="sm">⚡ Готов к срочной работе:</Text>
                        <Icon as={FaCheckCircle} color="green.500" />
                    </HStack>
                </VStack>

                {/* Темы и регионы */}
                <HStack  width="100%" my={4}>
                    <Text fontSize="sm">
                        Пишет на темы{" "}
                        {author.topics.map((topic: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                            <Link key={index} color="blue.500" href="#">
                                {topic}
                            </Link>
                        ))}
                    </Text>
                    <Text fontSize="sm">
                        В регионах{" "}
                        {author.regions.map((region: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                            <Link key={index} color="blue.500" href="#">
                                {region}
                            </Link>
                        ))}
                    </Text>
                </HStack>


                {/* Описание автора */}
                <Box p={4} bg="gray.50" borderRadius="md" w="100%">
                    <Heading size="sm" mb={2}>
                        Автор о себе:
                    </Heading>
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
                    <Heading size="md">Открытые питчи:</Heading>
                    {pitches.length > 0 ? (
                        pitches.map((pitch) => (
                            <Box key={pitch.id} p={4} border="1px solid gray" borderRadius="md" width="100%">
                                <Link href={`/pitches/${pitch.id}`}>
                                    <Heading size="sm" color="blue.600" _hover={{ textDecoration: "underline" }}>
                                        {pitch.title}
                                    </Heading>
                                </Link>
                                <Text fontSize="sm" color="gray.600">
                                    {pitch.description}
                                </Text>
                            </Box>
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
