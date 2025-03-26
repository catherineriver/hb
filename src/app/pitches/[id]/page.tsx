"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Box, Heading, Text, HStack, Badge, Button, Stack} from "@chakra-ui/react";
import PageLayout from "@/components/page-layout";
import {
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuRoot,
    MenuSeparator,
    MenuTrigger,
} from "@/components/ui/menu"
import {Tag} from "@/components/ui/tag";
import PitchDetails from "@/components/ui/PitchDetails/PitchDetails";
import AuthorDetails from "@/components/ui/AuthorDetails/AuthorDetails";
import {Pitch} from "@/hooks/useMockData";

const PitchPage = () => {
    const { id } = useParams();
    const [pitch, setPitch] = useState<Pitch | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/pitches/${id}`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                const data = await response.json();
                setPitch(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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
                            {pitch.content.status}
                        </Badge>
                        <HStack align="center" justify="space-between" gap={3}>
                            <Heading size="4xl" mb={4}>
                                {pitch.content.title}
                            </Heading>
                        </HStack>

                        <Box display={{ base: "block", md: "none" }}>
                            <PitchDetails
                                format={pitch.content.format}
                                region={pitch.content.location}
                                deadline={pitch.content.deadline}
                                fee={pitch.content.budget}

                            />
                        </Box>

                        <Heading>Тема</Heading>
                        {[...Array(1)].map((_, index) => (
                            <Text key={index} mt={4}>{pitch.content.key_description}</Text>
                        ))}

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

                        <Heading>Предварительный план</Heading>
                        {[...Array(5)].map((_, index) => (
                            <Text key={index} mt={4}>{pitch.content.full}</Text>
                        ))}

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

                        <Heading>Сюжет</Heading>
                        {[...Array(5)].map((_, index) => (
                            <Text key={index} mt={4}>{pitch.content.plot}</Text>
                        ))}
                    </Box>

                    {/* Aside block*/}

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
                                format={pitch.content.format}
                                region={pitch.content.location}
                                deadline={pitch.content.deadline}
                                fee={pitch.content.budget}
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
                            {pitch.content.tags.map((tag, i) => (
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
