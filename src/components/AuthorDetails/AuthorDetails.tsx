import {VStack, HStack, Box, Text, Button, Heading} from "@chakra-ui/react";
import AuthorLink from "@/components/ui/author-link";
import React from "react";
import {Avatar} from "@/components/ui/avatar";
import {bgGreen} from "next/dist/lib/picocolors";

interface AuthorDetailsProps {
    author: {
        name: string;
        total_pitches: number;
        in_progress: number;
        completed: number;
        location: string;
        id: number;
    };
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ author }) => {
    return (
        <VStack gap={4} p={4} bg="blue.100" borderRadius="md" align="center">
            <VStack align="start" gap={2} w="100%">
                <HStack  w="100%">
                    <AuthorLink withAvatar={true} author={author} />
                </HStack>

                <HStack justify="space-between" w="100%">
                    <Heading fontSize="sm">🗂 Законченых материалов:</Heading>
                    <Text fontSize="sm" color="gray.600">{author.completed}</Text>
                </HStack>

                <HStack justify="space-between" w="100%">
                    <Heading fontSize="sm">📍Регион/город:</Heading>
                    <Text fontSize="sm" color="gray.600">{author.location}</Text>
                </HStack>
            </VStack>
            <VStack align="start" gap={1} w="100%">
                <Button w="100%" background='green' color="white" size="md">Связаться</Button>
            </VStack>
        </VStack>
    );
};

export default AuthorDetails;
