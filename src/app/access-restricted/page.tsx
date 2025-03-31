import {Center, Text, VStack, Heading} from "@chakra-ui/react";

export default function AccessRestricted() {
    return (
        <Center minH="100vh" bg="gray.50" px={4}>
            <VStack textAlign="center">
                <Heading fontWeight="bold" fontSize="48px">🔒</Heading>
                <Heading fontWeight="bold" fontSize="lg">Доступ ограничен</Heading>
                <Text color="{colors.neutral}" fontSize="sm">
                    Для входа необходимо приглашение.
                </Text>
                <Text color="{colors.neutral}" fontSize="sm" maxW="400px">
                    Пожалуйста, свяжитесь с администратором <br /> или дождитесь приглашения.
                </Text>
            </VStack>
        </Center>
    );
}
