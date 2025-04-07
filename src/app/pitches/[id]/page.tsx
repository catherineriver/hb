"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Box, Heading, Text, HStack, Badge, Button, Stack, ButtonGroup, IconButton} from "@chakra-ui/react";
import {FaChevronDown} from "react-icons/fa";
import PageLayout from "@/components/page-layout";
import {
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"
import {Tag} from "@/components/ui/tag";
import PitchDetails from "@/components/ui/PitchDetails/PitchDetails";
import AuthorDetails from "@/components/ui/AuthorDetails/AuthorDetails";
import {PitchType} from "@/hooks/useMockData";
import {useManagerContext} from "@/context/mock-context";
import {getStatusProps} from "@/utils/getStatusProps";

const PitchPage = () => {
    const { isManager } = useManagerContext();
    const { id } = useParams();
    const [pitch, setPitch] = useState<PitchType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { color, label } = getStatusProps(pitch?.content?.status);

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

    const updateStatus = async (newStatus: string) => {
        if (!id) return;
        try {
            const res = await fetch(`/api/pitches/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            const result = await res.json();
            if (result.success) {
                setPitch(prev => prev ? { ...prev, content: { ...prev.content, status: result.status } } : prev);
            }
        } catch (err) {
            console.error("Ошибка при обновлении статуса:", err);
        }
    };

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
                {loading ? null : !pitch ? (
                    <Text textAlign="center">Питч не найден</Text>
                ) : error ? (
                    <Text color="red.500">Ошибка: {error}</Text>
                ) : (
                        <>
                            <Box
                                width="100%"
                                maxWidth={{ base: "none", md: "750px" }}
                                maxHeight={{ base: "none", md: "85dvh" }}
                                overflowY={{ base: "auto", md: "scroll" }}
                                paddingRight={{ base: "0", md: "8px" }}
                            >
                                {isManager &&
                                    <Badge size="xs" variant="solid" px={2} py={1} background={color} color="#fff">
                                        {label}
                                    </Badge>
                                }
                                <HStack align="center" justify="space-between" gap={3}>
                                    <Heading size={{ base: 'xl', md: '4xl'}} mb={{ base: 0, md: 4}}>
                                        {pitch.content.title}
                                    </Heading>
                                </HStack>

                                <Box display={{ base: "block", md: "none" }} my={2} background='gray' p={2} borderRadius='8px'>
                                    <PitchDetails
                                        format={pitch.content.format}
                                        region={pitch.content.location}
                                        deadline={pitch.content.deadline}
                                        fee={pitch.content.budget}
                                    />
                                </Box>

                                <Heading size={{ base: 'md', md: 'xl'}}>Тема</Heading>
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

                                <Heading size={{ base: 'md', md: 'xl'}}>Предварительный план</Heading>
                                {[...Array(5)].map((_, index) => (
                                    <Text fontSize={{ base: 'md', md: 'md'}} key={index} mt={4}>{pitch.content.full}</Text>
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

                                <Heading size={{ base: 'md', md: 'xl'}}>Сюжет</Heading>
                                {[...Array(5)].map((_, index) => (
                                    <Text key={index} mt={4}>{pitch.content.plot}</Text>
                                ))}
                            </Box>
                            {/* Aside block*/}
                            <Box w="100%" maxWidth="358px">
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

                                {isManager &&
                                    <>
                                        <MenuRoot>
                                            <MenuTrigger asChild width="100%">
                                                <ButtonGroup size="sm" variant="outline" attached>
                                                    <Button width="90%" border="{borders.input}" px={6} variant="outline">{pitch.content.status}</Button>
                                                    <IconButton variant="outline" border="{borders.input}">
                                                        <FaChevronDown />
                                                    </IconButton>
                                                </ButtonGroup>
                                            </MenuTrigger>

                                            <MenuContent background="#fff" px={3} py={2}
                                                         border="{borders.input}"
                                            >
                                                <MenuItemGroup title="Изменить статус">
                                                    <MenuItem value="draft" onClick={() => updateStatus("draft")}>Черновик</MenuItem>
                                                    <MenuItem value="in_progress" onClick={() => updateStatus("in_progress")}>В работе</MenuItem>
                                                    <MenuItem value="published" onClick={() => updateStatus("published")}>Опубликовано</MenuItem>
                                                    <MenuItem value="archived" onClick={() => updateStatus("archived")}>Архив</MenuItem>
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
                                    </>
                                }



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
                        </>
                    )
                }
            </HStack>
        </PageLayout>
    );
};

export default PitchPage;
