"use client"

import React, {useEffect, useState} from "react";
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Flex, Spinner
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import {Author} from "@/hooks/useMockData";
import {useRouter} from "next/navigation";

const AuthorsPage = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/mockData.json");
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                const data = await response.json();

                setAuthors(data.authors);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <MainLayout>
            <Flex height="100%" gap={4}>
                <Box overflowY="auto">
                    {loading ? (
                        <Flex justify="center" align="center" height="100%" p={5}>
                            <Spinner size="xl" color="{colors.primary}" borderWidth="4px" />
                        </Flex>
                    ) : authors.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            Ничего не найдено
                        </Text>
                    ) : error ? (
                        <Text>{error.message}</Text>
                    ) : (
                        <SimpleGrid gap="40px">
                            {authors.map((author) => (
                                <Box
                                    key={author.id}
                                    p={4} borderWidth="1px" borderRadius="lg" width="100%"
                                    onClick={() => router.push(`/authors/${author.id}`)}>

                                    <Heading size="md">{author.name}</Heading>
                                    <Text color="gray.600">{author.bio}</Text>
                                    <Text fontSize="sm" color="gray.500">Статьи: {author.articles.join(", ")}</Text>
                                </Box>
                            ))}

                        </SimpleGrid>
                    )}
                </Box>


            </Flex>
        </MainLayout>
    );
};

export default AuthorsPage;
