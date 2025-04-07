"use client";

import React, { useEffect } from "react";
import {
    Text,
    Flex,
    Spinner,
} from "@chakra-ui/react";
import AuthorsList from "@/components/ui/AuthorsList/AuthorsList";
import FiltersLayout from "@/components/filters-layout";
import {useAuthorsFilter} from "@/context/authors-context";
import AuthorsFilterPanel from "@/components/ui/AuthorsFilterPanel/AuthorsFilterPanel";

const AuthorsPage = () => {
    return (
        <FiltersLayout filterPanel={<AuthorsFilterPanel />}>
            <AuthorsContent />
        </FiltersLayout>
    );
};

const AuthorsContent = () => {
    const { fetchInitialAuthors, authors, loading, error, notFound } = useAuthorsFilter();

    useEffect(() => {
        fetchInitialAuthors();
    }, [fetchInitialAuthors]);

    return (
        <Flex gap={4} p={4} justifyContent="center">
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
        </Flex>
    );
};

export default AuthorsPage;
