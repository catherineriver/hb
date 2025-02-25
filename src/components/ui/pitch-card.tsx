import {Button, Heading, HStack, Text, VStack, Box, Show} from "@chakra-ui/react";
import NextLink from "next/link";
import React, {useState} from "react";
import { Pitch } from "@/hooks/useMockData";
import { FaTelegramPlane } from "react-icons/fa";
import AuthorLink from "@/components/ui/author-link";

interface CardProps {
    item: Pitch;
}

const PitchCard = ({ item }: CardProps) => {
    const [isHovering, setIsHovering] = useState(false);
    if (!item) return null;

    return (
        <Box
            position="relative"
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            <VStack align="start" gap={1} filter={isHovering ? 'opacity(0.5)' : 'none'}>
                <NextLink href={`/pitches/${item.id}`} passHref>
                    <Heading fontSize="18px" lineHeight="24px">{item.title}</Heading>
                    <Text fontSize="16px" lineHeight="150%">{item.full}</Text>
                </NextLink>
                <HStack w="100%" justify="space-between" mt={3}>
                    <AuthorLink author={item.author} />
                </HStack>
            </VStack>

            <Show when={isHovering}>
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
                    <Button size="md" variant="solid" color='white' bg="{colors.primary}" shadow="{shadows.button}" px={6}>
                        <Text fontSize="14px" fontFamily="heading">✉️&nbsp; Связаться с автором</Text>
                    </Button>
                    <Button size="md" variant="solid" color='white' bg="{colors.primary}" shadow="{shadows.button}" px={6}>
                        <NextLink href={`/pitches/${item.id}`} passHref><Text fontSize="14px" fontFamily="heading">✉️&nbsp; Посмотреть все</Text></NextLink>
                    </Button>
                    </HStack>
                </Box>
            </Show>
        </Box>
    );
};

export default PitchCard;
function setIsHovering(arg0: boolean) {
    throw new Error("Function not implemented.");
}

