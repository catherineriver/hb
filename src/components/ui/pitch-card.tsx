import {Button, Heading, HStack, Text, VStack, Box, Show} from "@chakra-ui/react";
import React from "react";
import { Pitch } from "@/hooks/useMockData";
import {FaPaperPlane} from "react-icons/fa";
import AuthorLink from "@/components/ui/author-link";
import { useRouter } from "next/navigation";

interface CardProps {
    item: Pitch;
    isHighlighted: boolean;
}

const PitchCard = ({ item, isHighlighted }: CardProps) => {
    const potsBooked = item.status === 'booked';
    const router = useRouter();
    if (!item) return null;

    const handleCardClick = () => {
        router.push(`/pitches/${item.id}`);
    };


    return (
        <Box
            px="16px"
            py="20px"
            position="relative"
            bg={isHighlighted ? "rgba(223, 220,219, 0.2)" : "white"}
            onClick={handleCardClick}
            cursor='pointer'
        >
            <VStack align="start" gap={1} filter={potsBooked ? 'opacity(0.5)' : 'none'}>

                    <Heading fontSize="18px" lineHeight="24px" textTransform="uppercase" mb={2}>{item.title}</Heading>
                    <Text fontSize="16px" lineHeight="150%">{item.full}</Text>
                <HStack w="100%" justify="space-between" mt={3}>
                    <HStack align="start" gap={1} w="100%">
                        <AuthorLink author={item.author} />

                        <Text fontFamily="heading" fontSize='14px'>•</Text>
                        <Text fontFamily="heading" fontSize='14px'>{item.category}</Text>
                    </HStack>
                    {!potsBooked && <Button variant="plain" color="{colors.primary}" size="xs"><FaPaperPlane></FaPaperPlane></Button>}
                </HStack>
            </VStack>

            <Show when={potsBooked}>
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    display={{ base: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    _groupHover={{ display: 'flex' }}
                    pointerEvents="auto"
                >
                    <HStack gap={4}>
                    <Button size="md" variant="solid" bg="{colors.highlight}" shadow="{shadows.button}" px={6}>
                        <Text fontSize="14px" fontFamily="heading">🔒</Text>
                        <Text fontSize="14px" fontFamily="heading">Забронировано</Text>
                    </Button>
                    </HStack>
                </Box>
            </Show>
        </Box>
    );
};

export default PitchCard;

