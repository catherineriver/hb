"use client"

import React from "react";
import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    SimpleGrid,
    Flex
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import useMockData from "@/hooks/useMockData";
import {useRouter} from "next/navigation";

const SidebarAuthors = () => (
    <VStack align="start" spacing={3}>
        <Button size="lg" variant="plain" color="black">Популярные авторы</Button>
        <Button size="lg" variant="plain" color="black">Новые авторы</Button>
        <Button size="lg" variant="plain" color="black">По рейтингу</Button>
    </VStack>
);

const AuthorsPage = () => {

    const { mockData } = useMockData();
    const router = useRouter();
    return (
        <MainLayout sidebarContent={<SidebarAuthors />}>
            <Flex height="100%" gap={4}>
                {/* Список авторов */}
                <Box overflowY="auto">
                    <SimpleGrid gap="40px">
                        {mockData && mockData.authors.map((author) => (
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
                </Box>


            </Flex>
        </MainLayout>
    );
};

export default AuthorsPage;
