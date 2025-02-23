"use client";

import { useState } from "react";
import { Box, VStack, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";

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
        <MainLayout>
            <Flex height="100%" gap={4}>
                {/* Список организаций */}
                <Box flex={selectedOrganization ? 0.5 : 1} overflowY="auto">
                    <SimpleGrid columns={selectedOrganization ? [1, null, 1] : [2, null, 3]} gap="40px">
                        {organizations.map((org, index) => (
                            <Box key={index} w="100%" p={4} border="1px solid black" borderRadius="8px" cursor="pointer" onClick={() => setSelectedOrganization(org)}>
                                <VStack align="start" spacing={1}>
                                    <Heading size="md"  >{org.name}</Heading>
                                    <Text fontSize="sm"  >Участников: {org.members}</Text>
                                    <Text fontSize="sm"   mt={2}>{org.description}</Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Flex>
        </MainLayout>
    );
};

export default OrganizationsPage;
