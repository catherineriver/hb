"use client";

import { Box, VStack, Heading, Text, Button, Input } from "@chakra-ui/react";
import MainLayout from "@/components/main-layout";
import { useState } from "react";

const SettingsPage = () => {
    const [organizationName, setOrganizationName] = useState("Highbeam Inc.");
    const [description, setDescription] = useState("Медиа-платформа, объединяющая авторов и журналистов.");

    const handleSave = () => {
        alert("Настройки сохранены!");
    };

    return (
        <MainLayout sidebarContent={<SidebarSettings />}>
            <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg">
                <Heading size="lg" mb={4}>Настройки организации</Heading>
                <VStack spacing={4} align="stretch">
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

const SidebarSettings = () => (
    <VStack align="start" spacing={3}>
        <Button size="lg" variant="plain" color="black">Профиль</Button>
        <Button size="lg" variant="plain" color="black">Безопасность</Button>
        <Button size="lg" variant="plain" color="black">Настройки организации</Button>
    </VStack>
);

export default SettingsPage;
