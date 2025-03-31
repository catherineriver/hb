"use client";

import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    SimpleGrid,
    Spinner
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
                <Box flex={2} overflowY="auto">
                    {loading ? (
                        <Flex justify="center" align="center" height="100%" p={5}>
                            <Spinner size="xl" color="{colors.primary}" borderWidth="4px" />
                        </Flex>
                    ) : Array.isArray(pitches) && pitches.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            Ничего не найдено
                        </Text>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2 }} position="relative" gridAutoFlow="row" minHeight="100%">
                            {pitches?.map((item: PitchType, index: number) => (
                                <Box key={item.id} height="auto">
                                    <PitchCard isHighlighted={isHighlighted(index)} item={item} />
                                </Box>
                            ))}
                            <Box
                                position="absolute"
                                left="50%"
                                top={0}
                                bottom={0}
                                width="2px"
                                backgroundImage="radial-gradient(circle, {colors.neutral} 1px, transparent 1px)"
                                backgroundPosition="left top"
                                backgroundRepeat="repeat-y"
                                backgroundSize="2px 4px"
                                transform="translateX(-50%)"
                                display={{ base: "none", md: "block" }}
                            />
                        </SimpleGrid>
                    )}
                </Box>
            </Flex>
    );
};

export default PitchesPage;
