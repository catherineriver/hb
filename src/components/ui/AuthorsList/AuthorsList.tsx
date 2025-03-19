import {Box, Heading, Text, SimpleGrid, HStack, VStack} from "@chakra-ui/react";
import React from "react";
import List from '@/components/ui/List/List';
import {Author} from "@/hooks/useMockData";
import {Avatar} from "@/components/ui/avatar";
import Link from "next/link";

interface AuthorsListProps {
    authors: Author[];
    loading: boolean;
    error: string | null;
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors, loading, error }) => {
    // const { filters } = useAuthorsFilter();
    // const router = useRouter();

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text>Ошибка: {error}</Text>;

    const filteredAuthors = authors.filter(() => {
        // if (filters.search && !author.name.toLowerCase().includes(filters.search.toLowerCase())) {
        //     return false;
        // }
        // if (filters.format && !author.formats.includes(filters.format)) {
        //     return false;
        // }
        // if (filters.urgent && !author.ready_for_urgent) {
        //     return false;
        // }
        // if (filters.travel && !author.ready_for_travel) {
        //     return false;
        // }
        // if (filters.experience && !author.experience) {
        //     return false;
        // }
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
                    <Link href={`/authors/${author.id}`} passHref>
                    <Box
                        key={author.id}
                        p={4}
                        borderRadius="lg"
                        width="100%"
                        background="{colors.gray}"
                    >
                        <HStack p={2} justifyContent="space-between">
                            <HStack>
                                <Avatar size="xl" src={author.avatar_url} />
                                <VStack alignItems="start">
                                    <Heading size="md">{author.name}</Heading>
                                    <Text fontSize="xs" color="gray.600">{author.location}</Text>
                                </VStack>
                            </HStack>
                            <HStack gap='16px'>
                                {author.ready_for_urgent && <Text>⚡️</Text>}
                                {author.ready_for_travel && <Text>✈️</Text>}
                                {author.experience && <Text>✅</Text>}
                            </HStack>
                        </HStack>
                        <Text color="gray.600">{author.bio}</Text>
                    </Box>
                    </Link>
                )}
            />
        </SimpleGrid>
    );
};

export default AuthorsList;
