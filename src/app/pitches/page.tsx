"use client";

import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    GridItem,
    Spinner, Grid
} from "@chakra-ui/react";
import PitchCard from "@/components/ui/pitch-card";
import { usePitchesFilter} from "@/context/pitches-context";
import {PitchType} from "@/hooks/useMockData";
import FiltersLayout from "@/components/filters-layout";
import PitchesFilterPanel from "@/components/ui/PitchesFilterPanel/PitchesFilterPanel";

const PitchesPage = () => {
    return (
        <FiltersLayout filterPanel={<PitchesFilterPanel />}>
            <PitchesContent />
        </FiltersLayout>
    );
};


const PitchesContent = () => {
    const {fetchInitialPitches, pitches, loading, error} = usePitchesFilter();
    useEffect(() => {
        fetchInitialPitches();
    }, [fetchInitialPitches]);

    if (error) return <Text color="red.500">Ошибка: {error}</Text>;

    const isHighlighted = (index: number) => {
        return (index % 2 === 0) === (Math.floor(index / 2) % 2 === 0);
    };

    return (
            <Flex height="100%">
                <Box flex={2} overflowY="auto" height='calc(100vh - 70px)'>
                    {loading ? (
                        <Flex justify="center" align="center" height="100%" p={5}>
                            <Spinner size="xl" color="{colors.primary}" borderWidth="4px" />
                        </Flex>
                    ) : Array.isArray(pitches) && pitches.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            Ничего не найдено
                        </Text>
                    ) : (
                        <Grid
                            templateColumns={{ base: "1fr", md: "repeat(2, auto)" }}
                            gridAutoFlow="row"
                            templateRows={{ base: "1fr", md: "204px" }}
                            minHeight="calc(100vh - 70px)"
                        >
                                {pitches?.map((item: PitchType, index: number) => (
                                    <GridItem key={item.id} position='relative'>
                                        <Box
                                            display={{ base: 'none', md: 'block' }}
                                            position="absolute"
                                            top="0"
                                            bottom="0"
                                            right="-1px"
                                            width="2px"
                                            backgroundImage="radial-gradient(circle, #ccc 1px, transparent 1px)"
                                            backgroundRepeat="repeat-y"
                                            backgroundSize="2px 4px"
                                        />
                                        <PitchCard isHighlighted={isHighlighted(index)} item={item} />
                                    </GridItem>
                                ))}

                        </Grid>
                    )}
                </Box>
            </Flex>
    );
};

export default PitchesPage;
