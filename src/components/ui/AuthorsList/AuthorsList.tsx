import {Box, Heading, Text, SimpleGrid, HStack, VStack} from "@chakra-ui/react";
import React from "react";
import List from '@/components/ui/List/List';
import {AuthorType} from "@/hooks/useMockData";
import {Avatar} from "@/components/ui/avatar";
import Link from "next/link";

interface AuthorsListProps {
    authors: AuthorType[];
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {

    return (
        <SimpleGrid gap="40px">
            <List
                data={authors}
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
                                {author.experience_with_hb && <Text>✅</Text>}
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
