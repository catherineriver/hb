import {Button, Heading, HStack, Text, VStack, Show, LinkBox, LinkOverlay} from "@chakra-ui/react";
import React from "react";
import { PitchType } from "@/hooks/useMockData";
import {FaPaperPlane} from "react-icons/fa";
import AuthorLink from "@/components/ui/author-link";;
import Overlay from "@/components/ui/Overlay/Overlay";
import NextLink from "next/link";

interface CardProps {
    item: PitchType;
    isHighlighted?: boolean;
    isPreviewCard?: boolean;
}

const PitchCard = ({ item, isHighlighted, isPreviewCard }: CardProps) => {
    const potsBooked = item.is_booked;
    const post = item.content
    if (!item) return null;

    const handleSendToTelegram = async () => {
        try {
            const response = await fetch(`/authors/${item.author.id}/contact`, {
                method: "POST",
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
        <LinkBox
            px="16px"
            py="20px"
            position="relative"
            bg={isHighlighted ? "rgba(223, 220,219, 0.2)" : "white"}
            cursor="pointer"
            w='100%'
        >
            <VStack align="start" gap={1} filter={potsBooked ? 'opacity(0.5)' : 'none'}>
                <Heading fontSize="18px" lineHeight="24px" textTransform="uppercase" mb={2}>
                    <LinkOverlay as={NextLink} href={`/pitches/${item.id}`}>
                        {post.title}
                    </LinkOverlay>
                </Heading>
                <Text fontSize="16px" lineHeight="150%">{post.key_description}</Text>
                {!isPreviewCard && <HStack w="100%" justify="space-between" mt={3}>
                    <HStack align="start" gap={1} w="100%" alignItems="center">
                        <AuthorLink author={item.author} />
                        <Text fontFamily="heading" fontSize="14px">•</Text>
                        <Text fontFamily="heading" fontSize="14px">{post.format}</Text>
                    </HStack>
                    {!potsBooked && (
                        <Button
                            variant="plain"
                            color="{colors.primary}"
                            size="xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSendToTelegram();
                            }}
                        >
                            <FaPaperPlane />
                        </Button>
                    )}
                </HStack>
                }
            </VStack>

            <Show when={potsBooked}>
                <Overlay isVisible={potsBooked} />
            </Show>
        </LinkBox>
    );
};

export default PitchCard;

