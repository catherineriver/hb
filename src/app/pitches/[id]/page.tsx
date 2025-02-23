"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Box, Heading, Text, VStack, HStack, Separator, Badge, Button, Stack} from "@chakra-ui/react";
import useMockData, {Pitch} from "@/hooks/useMockData";
import PageLayout from "@/components/page-layout";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion"
import {
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuRoot,
    MenuSeparator,
    MenuTrigger,
} from "@/components/ui/menu"
import {Tag} from "@/components/ui/tag";
import AuthorLink from "@/components/ui/author-link";

const PitchPage = () => {
    const { id } = useParams();
    const { mockData, loading, error } = useMockData();
    const [pitch, setPitch] = useState<Pitch>(null);

    useEffect(() => {
        if (mockData) {
            const foundPitch = mockData.data.find((item) => item.id.toString() === id);
            setPitch(foundPitch);
        }
    }, [mockData, id]);

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text color="red.500">Ошибка: {error}</Text>;
    if (!pitch) return <Text textAlign="center">Питч не найден</Text>;

    return (
        <PageLayout>
                <HStack alignItems="flex-start" justifyContent="center" gap="10" width="100%">

                    <Box
                        width="100%"
                        maxWidth="750px"
                        maxHeight="85dvh"
                        overflowY="auto"
                        paddingRight="8px"

                    >
                        <Badge variant="solid" paddingX={2} paddingY={1} background="green" color="white">
                            {pitch.status}
                        </Badge>
                        <HStack align="center" justify="space-between" spacing={3}>
                            <Heading size="5xl" mb={4}>
                                {pitch.title}
                            </Heading>
                        </HStack>

                        <AccordionRoot collapsible defaultValue={[pitch.description]}>
                            <AccordionItem value={pitch.description}>
                                <AccordionItemTrigger>
                                    <Heading>Тема</Heading>
                                </AccordionItemTrigger>
                                <AccordionItemContent>
                                    {[...Array(1)].map((_, index) => (
                                        <Text key={index} mt={4}>{pitch.description}</Text>
                                    ))}
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>


                        <AccordionRoot collapsible defaultValue={[pitch.full]}>
                            <AccordionItem value={pitch.full}>
                                <AccordionItemTrigger>
                                    <Heading>Предварительный план</Heading>
                                </AccordionItemTrigger>
                                <AccordionItemContent>
                                    {[...Array(5)].map((_, index) => (
                                        <Text key={index} mt={4}>{pitch.full}</Text>
                                    ))}
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>

                        <Separator variant="dashed" />

                        <AccordionRoot collapsible defaultValue={[pitch.plot]}>
                            <AccordionItem value={pitch.plot}>
                                <AccordionItemTrigger>
                                    <Heading>Сюжет</Heading>
                                </AccordionItemTrigger>
                                <AccordionItemContent>
                                    {[...Array(5)].map((_, index) => (
                                        <Text key={index} mt={4}>{pitch.plot}</Text>
                                    ))}
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>

                    </Box>

                    <Box w="100%" maxWidth="428px">
                        <VStack spacing={4} p={4} gap={6} bg="blue.100" borderRadius="md" align="center">
                            <VStack align="start" spacing={2} w="100%" >
                                <AuthorLink author={pitch.author} />
                                <HStack align="center" justify="space-evenly" spacing={1} w="100%" >
                                    <VStack>
                                        <Text fontSize="sm">{pitch.author.total_pitches}</Text>
                                        <Text fontSize="sm">питчей</Text>
                                    </VStack>
                                    <VStack>
                                        <Text fontSize="sm">{pitch.author.in_progress}</Text>
                                        <Text fontSize="sm">В работе </Text>
                                    </VStack>

                                    <VStack>
                                        <Text fontSize="sm">{pitch.author.completed}</Text>
                                        <Text fontSize="sm">закончено </Text>
                                    </VStack>
                                </HStack>
                            </VStack>
                            <VStack align="start" spacing={1} w="100%">
                                <Button w="100%" colorScheme="teal" size="lg">Связаться</Button>
                            </VStack>
                        </VStack>
                        <Stack pt={6}>
                            <Separator py={2} variant="dashed" />
                        </Stack>

                        <MenuRoot>
                            <MenuTrigger asChild>
                                <Button variant="outline">Edit</Button>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItemGroup title="Styles">
                                    <MenuItem value="bold">Bold</MenuItem>
                                    <MenuItem value="underline">Underline</MenuItem>
                                </MenuItemGroup>
                                <MenuSeparator />
                                <MenuItemGroup title="Align">
                                    <MenuItem value="left">Left</MenuItem>
                                    <MenuItem value="middle">Middle</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                </MenuItemGroup>
                            </MenuContent>
                        </MenuRoot>

                        <Stack pt={6}>
                            <Separator py={2} variant="dashed" />
                        </Stack>

                        <HStack justify="space-between" w="100%" spacing={2} mt={2}>
                            <Heading fontSize="sm">🗂 Формат:</Heading>
                            <Text fontSize="sm" color="gray.600">Лонгрид</Text>
                        </HStack>

                        <HStack justify="space-between" w="100%" spacing={2} mt={2}>
                            <Heading fontSize="sm">📍Регион/город:</Heading>
                            <Text fontSize="sm" color="gray.600">Саратовская область</Text>
                        </HStack>

                        <HStack justify="space-between" w="100%" spacing={2} mt={2}>
                            <Heading fontSize="sm">⏳ Дедлайн первого черновика:</Heading>
                            <Text fontSize="sm" color="gray.600">20.02.2055</Text>
                        </HStack>

                        <HStack justify="space-between" w="100%" spacing={2} mt={2}>
                            <Heading fontSize="sm">💰 Сумма гонорара:</Heading>
                            <Text fontSize="sm" color="gray.600">2000 EUR</Text>
                        </HStack>

                        <Stack pt={6}>
                            <Separator py={2} variant="dashed" />
                        </Stack>

                        <HStack spacing={2} mt={2}>
                            {pitch.tags.map((tag, i) => (
                                <Tag key={i} variant="outline" paddingY={1} paddingX={2} size="sm" colorScheme="gray">
                                    {tag}
                                </Tag>
                            ))}
                        </HStack>
                    </Box>
                </HStack>
        </PageLayout>
    );
};

export default PitchPage;
