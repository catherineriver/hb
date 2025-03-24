import {VStack, HStack, Text, Button, Heading} from "@chakra-ui/react";
import AuthorLink from "@/components/ui/author-link";
import React from "react";
import {AuthorType} from "@/hooks/useMockData";

interface AuthorDetailsProps {
    author: AuthorType;
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({author}) => {
    const handleSendToTelegram = async () => {
        try {
            const response = await fetch("/api/send-telegram", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author: author.id,
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при отправке в Telegram");
            }

            alert("Успешно отправлено в Telegram");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <VStack gap={4} p={4} bg="blue.100" borderRadius="md" align="center">
            <VStack align="start" gap={2} w="100%">
                <HStack  w="100%">
                    <AuthorLink variant='withAvatar' author={author} />
                </HStack>

                <HStack justify="space-between" w="100%">
                    <Heading fontSize="sm">🗂 Законченых материалов:</Heading>
                    <Text fontSize="sm" color="gray.600">{author.stats.completed_posts ? author.stats.completed_posts : '-'}</Text>
                </HStack>

                <HStack justify="space-between" w="100%">
                    <Heading fontSize="sm">📍Регион/город:</Heading>
                    <Text fontSize="sm" color="gray.600">{author.location ? author.location : '-'}</Text>
                </HStack>
            </VStack>
            <VStack align="start" gap={1} w="100%">
                <Button w="100%" background="{colors.secondary}" color="white" size="md"
                        onClick={(e) => {
                    e.stopPropagation();
                    handleSendToTelegram();
                }}>Связаться</Button>
            </VStack>
        </VStack>
    );
};

export default AuthorDetails;
