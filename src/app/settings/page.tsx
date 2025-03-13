"use client";

import { Box, VStack, Heading, Button, Input } from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import { useState } from "react";

const SettingsPage = () => {
    const [organizationName, setOrganizationName] = useState("Highbeam Inc.");
    const [description, setDescription] = useState("Медиа-платформа, объединяющая авторов и журналистов.");

    const handleSave = () => {
        alert("Настройки сохранены!");
    };

    return (
        <MainLayout>
            <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg">
                <Heading size="lg" mb={4}>Настройки организации</Heading>
                <VStack align="stretch">
                        <label>Название организации</label>
                        <Input
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                        />
                        <label>Описание</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    <Button colorScheme="blue" onClick={handleSave}>Сохранить изменения</Button>
                </VStack>
            </Box>
        </MainLayout>
    );
};

export default SettingsPage;
