"use client";

import React, { useEffect } from "react";
import {
    Box,
    Text,
    Flex,
    Spinner,
} from "@chakra-ui/react";
import AuthorsList from "@/components/ui/AuthorsList/AuthorsList";
import FiltersLayout from "@/components/filters-layout";
import {useAuthorsFilter} from "@/context/authors-context";

const AuthorsPage = () => {
    return (
        <FiltersLayout>
            <AuthorsContent />
        </FiltersLayout>
    );
};

const AuthorsContent = () => {
    const { fetchInitialAuthors, authors, loading, error, notFound } = useAuthorsFilter();

    useEffect(() => {
        fetchInitialAuthors();
    }, []);

    return (
        <Flex height="100%" gap={4} p={4}>
            <Box display="flex">

                <Box overflowY="auto">
                    {loading ? (
                        <Flex justify="center" align="center" height="100%" p={5}>
                            <Spinner size="xl" color="blue.500" borderWidth="4px" />
                        </Flex>
                    ) : error ? (
                        <Text>{error}</Text>
                    ) : notFound ? (
                        <Text>Ничего не найдено</Text>
                    ) : (
                        <AuthorsList authors={authors} />
                    )}
                </Box>
            </Box>
        </Flex>
    );
};

export default AuthorsPage;
