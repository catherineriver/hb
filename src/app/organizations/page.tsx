"use client";

import { useState } from "react";
import { Box, VStack, Heading, Text, Button, SimpleGrid, Flex } from "@chakra-ui/react";
import Layout from "@/components/layout";

const organizations = [
    {
        name: "Green Earth",
        description: "Организация, занимающаяся защитой окружающей среды.",
        members: 1200
    },
    {
        name: "Tech Innovators",
        description: "Группа экспертов по технологиям и искусственному интеллекту.",
        members: 850
    },
    {
        name: "Health First",
        description: "Организация, поддерживающая развитие медицины и здравоохранения.",
        members: 2000
    },
    {
        name: "Education for All",
        description: "Фонд, занимающийся образовательными проектами.",
        members: 500
    }
];

const OrganizationsPage = () => {
    const [selectedOrganization, setSelectedOrganization] = useState(null);

    return (
        <Layout sidebarContent={<SidebarOrganizations />}>
            <Flex height="100%" gap={4}>
                {/* Список организаций */}
                <Box flex={selectedOrganization ? 0.5 : 1} overflowY="auto">
                    <SimpleGrid columns={selectedOrganization ? [1, null, 1] : [2, null, 3]} gap="40px">
                        {organizations.map((org, index) => (
                            <Box key={index} w="100%" p={4} border="1px solid black" borderRadius="8px" cursor="pointer" onClick={() => setSelectedOrganization(org)}>
                                <VStack align="start" spacing={1}>
                                    <Heading size="md" fontFamily="serif">{org.name}</Heading>
                                    <Text fontSize="sm" fontFamily="serif">Участников: {org.members}</Text>
                                    <Text fontSize="sm" fontFamily="serif" mt={2}>{org.description}</Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Открытая организация */}
                {selectedOrganization && (
                    <Box flex={0.5} p={6} borderLeft="1px solid black" overflowY="auto">
                        <Heading size="lg" mb={4}>{selectedOrganization.name}</Heading>
                        <Text fontSize="sm" fontFamily="serif">Участников: {selectedOrganization.members}</Text>
                        <Text mt={4}>{selectedOrganization.description}</Text>
                        <Button mt={4} onClick={() => setSelectedOrganization(null)}>Закрыть</Button>
                    </Box>
                )}
            </Flex>
        </Layout>
    );
};

const SidebarOrganizations = () => (
    <VStack align="start" spacing={3}>
        <Button size="lg" variant="plain" color="black">Популярные</Button>
        <Button size="lg" variant="plain" color="black">Новые</Button>
        <Button size="lg" variant="plain" color="black">По рейтингу</Button>
    </VStack>
);

export default OrganizationsPage;
