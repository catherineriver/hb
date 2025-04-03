'use client'

import {Text, VStack, Heading, Flex, Spinner, HStack, Box, Stack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
// import {useParams} from "next/navigation";
import {Avatar} from "@/components/ui/avatar";
import PitchCard from "@/components/ui/pitch-card";
import PageLayout from "@/components/page-layout";
import {OrganisationType} from "@/hooks/useMockData";
import AuthorLink from "@/components/ui/author-link";

export default function Organisation() {
    // const { organisationId } = useParams();
    const [organisation, setOrganisation] = useState<OrganisationType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isHighlighted = (index: number) => index % 2 === 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/organisation/1`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                const data = await response.json();
                setOrganisation(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <PageLayout>
            {loading ? (
                <Flex justify="center" align="center" height="100%" p={5}>
                    <Spinner size="xl" color="blue.500" borderWidth="4px" />
                </Flex>
            ) : error ? (
                <Text color="red.500" textAlign='center' >{error}</Text>
            ) : !organisation ? (
                <Text color="gray.500" textAlign="center">Автор не найден</Text>
            ) : (
                <VStack m={4} maxW="800px" mx="auto" my={6} align="flex-start" p={{ base: "20px", md: '0' }}>
                    <HStack justify="center" w="100%">
                        <Avatar size="2xl" src={organisation.avatar_url}/>
                    </HStack>

                    <HStack justify="center" align='center' w="100%">
                        <Heading size="3xl" textAlign="center">{organisation.name}</Heading>
                    </HStack>
                    {/* Описание */}
                    <Box w="100%">
                        <Text fontSize="sm">{organisation.description}</Text>
                    </Box>

                    {/* Разделитель */}
                    <Stack my={6} w="100%">
                        <Box
                            w="100%"
                            h="2px"
                            backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                            backgroundPosition= "left bottom"
                            backgroundRepeat= "repeat-x"
                            backgroundSize= "4px 100%"
                        ></Box>
                    </Stack>

                    <VStack align="start" w="100%">
                        <Heading size="xl" mb="20px">Авторы ({organisation.authors.length}):</Heading>
                        <HStack w="100%">
                        {organisation.authors.length > 0 ? (
                            organisation.authors.map((author) => (
                                <AuthorLink variant='onlyAvatar' author={author} key={author.id}/>
                            ))
                        ) : (
                            <Text>Пока ни с кем не работали.</Text>
                        )}
                        </HStack>
                    </VStack>

                    {/* Разделитель */}
                    <Stack my={6} w="100%">
                        <Box
                            w="100%"
                            h="2px"
                            backgroundImage= "radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                            backgroundPosition= "left bottom"
                            backgroundRepeat= "repeat-x"
                            backgroundSize= "4px 100%"
                        ></Box>
                    </Stack>

                    {/* Список открытых питчей */}
                    <VStack align="start" w="100%">
                        <Heading size="xl" mb="20px">Открытые питчи:</Heading>
                        {organisation.pitches.length > 0 ? (
                            organisation.pitches.map((pitch, index) => (
                                <PitchCard key={index} item={pitch} isPreviewCard={true} isHighlighted={isHighlighted(index)} />
                            ))
                        ) : (
                            <Text>Пока нет открытых питчей.</Text>
                        )}
                    </VStack>
                </VStack>
            )}
        </PageLayout>
    );
}
