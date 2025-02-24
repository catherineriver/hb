import { Heading, HStack, Link, Text, VStack} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import NextLink from "next/link";
import React from "react";
import {Pitch} from "@/hooks/useMockData";

interface CardProps {
    item: Pitch;

}

const PitchCard = ({ item }: CardProps) => {
    if (!item) return null;

    return (
        <NextLink href={`/pitches/${item.id}`} passHref>
                <VStack align="start" gap={1}>
                    <Heading size="xl">{item.title}</Heading>
                    <Text textStyle="sm">{item.description}</Text>
                    <HStack w="100%" justify="space-between">
                        <HStack align="center" w="100%" gap={1}>
                            <HStack align="center" w="100%" gap={1}>
                                <Link href={`/authors/${item.author.id}`} color="blue.500">
                                    <Avatar size="xxs"></Avatar>
                                    <Text fontSize="sm">{item.author.name}</Text>
                                </Link>
                            </HStack>
                        </HStack>
                    </HStack>
                </VStack>
        </NextLink>
    );
};

export default PitchCard;
