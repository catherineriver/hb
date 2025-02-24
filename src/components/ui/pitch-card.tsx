import {Button, Heading, HStack, Link, Text, VStack} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import NextLink from "next/link";
import React from "react";
import {Pitch} from "@/hooks/useMockData";
import {FaTelegramPlane} from "react-icons/fa";

interface CardProps {
    item: Pitch;

}

const PitchCard = ({ item }: CardProps) => {
    if (!item) return null;

    return (
        <NextLink href={`/pitches/${item.id}`} passHref>
                <VStack align="start" gap={1}>
                    <Heading fontSize="18px" lineHeight="24px">{item.title}</Heading>
                    <Text fontSize="16px" lineHeight="150%">{item.full}</Text>
                    <HStack w="100%" justify="space-between" mt={3}>
                        <HStack align="center" justify="space-between" w="100%" gap={1}>
                            <Link href={`/authors/${item.author.id}`} color="blue.500">
                                <Avatar size="sm"></Avatar>
                                <Text fontFamily="heading" fontSize="md">{item.author.name}</Text>
                            </Link>

                            <Button size="lg" color="primary" border="button"><FaTelegramPlane></FaTelegramPlane></Button>
                        </HStack>
                    </HStack>
                </VStack>
        </NextLink>
    );
};

export default PitchCard;
