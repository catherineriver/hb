"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Heading, Text, VStack, HStack, Link } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import useMockData, { Pitch, Author } from "@/hooks/useMockData";
import PageLayout from "@/components/page-layout";

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
                {/* Информация об авторе */}
                <HStack align="center">
                    <Avatar size="lg" />
                    <VStack align="start">
                        <Heading>{author.name}</Heading>
                        <Text fontSize="sm" color="gray.600">
                            {author.articles.length} опубликованных материалов
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            Работал с {author.organizations?.length || 0} организациями
                        </Text>
                        {author.organizations && author.organizations.length > 0 && (
                            <Text fontSize="sm">
                                Организации:{" "}
                                {author.organizations.map((org, index) => (
                                    <Link key={index} href={`/organizations/${org.id}`} color="blue.500">
                                        {org.name}
                                    </Link>
                                ))}
                            </Text>
                        )}
                    </VStack>
                </HStack>

                {/* Список питчей автора */}
                <Heading size="md" mb={3}>
                    Питчи автора
                </Heading>
                <VStack align="start">
                    {pitches.length > 0 ? (
                        pitches.map((pitch) => (
                            <Box key={pitch.id} p={4} border="1px solid gray" borderRadius="md" width="100%">
                                <Link href={`/pitches/${pitch.id}`}>
                                    <Heading size="sm" color="blue.600" _hover={{ textDecoration: "underline" }}>
                                        {pitch.title}
                                    </Heading>
                                </Link>
                                <Text fontSize="sm" color="gray.600">{pitch.description}</Text>
                            </Box>
                        ))
                    ) : (
                        <Text>У этого автора пока нет питчей.</Text>
                    )}
                </VStack>
        </PageLayout>
    );
};

export default AuthorPage;
