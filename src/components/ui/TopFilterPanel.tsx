import { Box, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import RegionSelector from "@/components/ui/region-selector";
import ThemeSelector from "@/components/ui/theme-selector";
import FormatSelector from "@/components/ui/format-selector";

const TopFilterPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box borderBottom="1px solid {colors.text}" p={{ base: 2, md: 3 }} bg="white">
            <Button
                display={{ base: "flex", md: "none" }}
                onClick={() => setIsOpen(!isOpen)}
                w="full"
                justifyContent="space-between"
                size="sm"
                as="button"
            >
                Фильтры
            </Button>

            <Flex
                align="center"
                gap={4}
                wrap="wrap"
                justify="center"
                display={{ base: isOpen ? "flex" : "none", md: "flex" }} // Скрытие на мобилке
                mt={{ base: 2, md: 0 }}
            >
                <ThemeSelector />
                <RegionSelector />
                <FormatSelector />
            </Flex>
        </Box>
    );
};

export default TopFilterPanel;
