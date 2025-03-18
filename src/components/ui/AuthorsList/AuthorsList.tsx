import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useAuthorsFilter } from "@/context/filter-context";
import React from "react";
import { useRouter } from "next/navigation";
import List from '@/components/ui/List/List';
import {Author} from "@/hooks/useMockData";

interface AuthorsListProps {
    authors: Author[];
    loading: boolean;
    error: string | null;
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors, loading, error }) => {
    const { filters } = useAuthorsFilter();
    const router = useRouter();

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text>Ошибка: {error}</Text>;

    const filteredAuthors = authors.filter((author) => {
        if (filters.search && !author.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        if (filters.format && !author.formats.includes(filters.format)) {
            return false;
        }
        if (filters.urgent && !author.ready_for_urgent) {
            return false;
        }
        if (filters.travel && !author.ready_for_travel) {
            return false;
        }
        if (filters.experience && !author.experience) {
            return false;
        }
        return true;
    });

    return (
        <SimpleGrid gap="40px">
            <List
                data={filteredAuthors}
                loading={loading}
                error={error}
                emptyMessage="Нет авторов по заданным параметрам"
                renderItem={(author) => (
                    <Box
                        key={author.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        width="100%"
                        onClick={() => router.push(`/authors/${author.id}`)}
                    >
                        <Heading size="md">{author.name}</Heading>
                        <Text color="gray.600">{author.bio}</Text>
                        <Text fontSize="sm" color="gray.500">Статьи: {author.articles.join(", ")}</Text>
                    </Box>
                )}
            />
        </SimpleGrid>
    );
};

export default AuthorsList;
