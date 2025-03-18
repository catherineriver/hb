"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Flex,
    Spinner,
} from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import { Author } from "@/hooks/useMockData";
import {FilterProvider, useAuthorsFilter} from "@/context/filter-context";
import AuthorsList from "@/components/ui/AuthorsList/AuthorsList";
import SideFilterPanel from "@/components/ui/SideFiltersPanel/SideFiltersPanel";

const AuthorsPage = () => {
    return (
        <FilterProvider>
            <AuthorsContent />
        </FilterProvider>
    );
};

const AuthorsContent = () => {
    const { filters } = useAuthorsFilter();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                const response = await fetch(`/api/authors`);

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
    }, [filters]);

    return (
        <MainLayout>
            <Flex height="100%" gap={4} p={4}>
                <Box display="flex">
                    <SideFilterPanel />
                    <Box overflowY="auto">
                        {loading ? (
                            <Flex justify="center" align="center" height="100%" p={5}>
                                <Spinner size="xl" color="blue.500" borderWidth="4px" />
                            </Flex>
                        ) : error ? (
                            <Text>{error}</Text>
                        ) : (
                            <AuthorsList authors={authors} loading={false} error={null} />
                        )}
                    </Box>
                </Box>
            </Flex>
        </MainLayout>
    );
};

export default AuthorsPage;
