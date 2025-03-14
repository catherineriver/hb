import { HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface PitchDetailsProps {
    format: string;
    region: string;
    deadline: string;
    fee: string;
}

const PitchDetails: React.FC<PitchDetailsProps> = ({ format, region, deadline, fee }) => {
    return (
        <HStack flexDirection="column" align="start">
            <HStack justify="space-between" w="100%">
                <Heading fontSize="sm">🗂 Формат:</Heading>
                <Text fontSize="sm" color="gray.600">{format}</Text>
            </HStack>

            <HStack justify="space-between" w="100%">
                <Heading fontSize="sm">📍Регион/город:</Heading>
                <Text fontSize="sm" color="gray.600">{region}</Text>
            </HStack>

            <HStack justify="space-between" w="100%">
                <Heading fontSize="sm">⏳ Дедлайн первого черновика:</Heading>
                <Text fontSize="sm" color="gray.600">{deadline}</Text>
            </HStack>

            <HStack justify="space-between" w="100%">
                <Heading fontSize="sm">💰 Сумма гонорара:</Heading>
                <Text fontSize="sm" color="gray.600">{fee}</Text>
            </HStack>
        </HStack>
    );
};

export default PitchDetails;
