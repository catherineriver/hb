"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Box, Heading, Text, VStack, HStack, Badge, Button, Stack} from "@chakra-ui/react";
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
import PitchDetails from "@/components/ui/PitchDetails/PitchDetails";
import AuthorDetails from "@/components/AuthorDetails/AuthorDetails";

const PitchPage = () => {
    const { id } = useParams();
    const { mockData, loading, error } = useMockData();
    const [pitch, setPitch] = useState<Pitch | null>(null);

    useEffect(() => {
        if (mockData) {
            const foundPitch = mockData.data.find((item) => item.id.toString() === id);
            setPitch(foundPitch || null);
        }
    }, [mockData, id]);

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text color="red.500">Ошибка: {error}</Text>;
    if (!pitch) return <Text textAlign="center">Питч не найден</Text>;

    return (
        <PageLayout>
            <HStack
                alignItems="flex-start"
                justifyContent="center"
                gap="10"
                width="100%"
                flexDirection={{ base: "column", md: "row" }}
                p={{ base: 4, md: 0 }}
            >
                    <Box
                        width="100%"
                        maxWidth={{ base: "none", md: "750px" }}
                        maxHeight={{ base: "none", md: "85dvh" }}
                        overflowY={{ base: "auto", md: "scroll" }}
                        paddingRight="8px"

                    >
                        <Badge variant="solid" paddingX={2} paddingY={1} background="green" color="white">
                            {pitch.status}
                        </Badge>
                        <HStack align="center" justify="space-between" gap={3}>
                            <Heading size="4xl" mb={4}>
                                {pitch.title}
                            </Heading>
                        </HStack>

                        <Box display={{ base: "block", md: "none" }}>
                            <PitchDetails
                                format={pitch.category}
                                region={pitch.location}
                                deadline={pitch.deadline}
                                fee={pitch.budget}

                            />
                        </Box>

                        <AccordionRoot collapsible defaultValue={[pitch.description]}>
                            <AccordionItem value={pitch.description} borderBottomWidth="0">
                                <AccordionItemTrigger>
                                    <Heading>Тема</Heading>
                                </AccordionItemTrigger>
                                <AccordionItemContent >
                                    {[...Array(1)].map((_, index) => (
                                        <Text key={index} mt={4}>{pitch.description}</Text>
                                    ))}
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>

                        <Stack my={6}>
                            <Box
                                w="100%"
                                h="2px"
                                backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition= "left bottom"
                                backgroundRepeat= "repeat-x"
                                backgroundSize= "4px 100%"
                            ></Box>
                        </Stack>

                        <AccordionRoot collapsible defaultValue={[pitch.full]}>
                            <AccordionItem value={pitch.full} borderBottomWidth="0">
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

                        <Stack my={6}>
                            <Box
                                w="100%"
                                h="2px"
                                backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition= "left bottom"
                                backgroundRepeat= "repeat-x"
                                backgroundSize= "4px 100%"
                            ></Box>
                        </Stack>

                        <AccordionRoot collapsible defaultValue={[pitch.plot]}>
                            <AccordionItem value={pitch.plot} borderBottomWidth="0">
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

                    {/*// Aside block*/}

                    <Box w="100%" maxWidth="428px">
                        <AuthorDetails author={pitch.author} />

                        <Stack my={6}>
                            <Box
                                w="100%"
                                h="2px"
                                backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition= "left bottom"
                                backgroundRepeat= "repeat-x"
                                backgroundSize= "4px 100%"
                            ></Box>
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

                        <Stack my={6}>
                            <Box
                                w="100%"
                                h="2px"
                                backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition= "left bottom"
                                backgroundRepeat= "repeat-x"
                                backgroundSize= "4px 100%"
                            ></Box>
                        </Stack>

                        <Box display={{ base: "none", md: "block" }}>
                            <PitchDetails
                                format={pitch.category}
                                region={pitch.location}
                                deadline={pitch.deadline}
                                fee={pitch.budget}
                            />
                        </Box>

                        <Stack my={6}>
                            <Box
                                w="100%"
                                h="2px"
                                backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition= "left bottom"
                                backgroundRepeat= "repeat-x"
                                backgroundSize= "4px 100%"
                            ></Box>
                        </Stack>

                        <HStack gap={2} mt={2}>
                            {pitch.tags.map((tag, i) => (
                                <Tag key={i} variant="outline" paddingY={1} paddingX={2} size="sm">
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
