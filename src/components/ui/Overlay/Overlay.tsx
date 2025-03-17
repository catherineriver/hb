import { Box, Button, HStack, Text } from "@chakra-ui/react";

interface OverlayProps {
    isVisible: boolean;
}

const Overlay = ({ isVisible }: OverlayProps) => {
    if (!isVisible) return null;

    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            display={{ base: "flex" }}
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            _groupHover={{ display: 'flex' }}
            pointerEvents="auto"
        >
            <HStack gap={4}>
                <Button size="md" variant="solid" bg="{colors.highlight}" shadow="{shadows.button}" px={6}>
                    <Text fontSize="14px" fontFamily="heading">🔒</Text>
                    <Text fontSize="14px" fontFamily="heading">Забронировано</Text>
                </Button>
            </HStack>
        </Box>
    );
};

export default Overlay;
