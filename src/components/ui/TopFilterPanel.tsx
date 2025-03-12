import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import RegionSelector from "@/components/ui/region-selector";
import ThemeSelector from "@/components/ui/theme-selector";
import FormatSelector from "@/components/ui/format-selector";

const TopFilterPanel = () => {
    return (
        <Box borderBottom="1px solid {colors.text}" p={3} bg="white">
            <Flex align="center" gap={4} wrap="wrap" justify="center">
                <ThemeSelector />
                <RegionSelector/>
                <FormatSelector />
            </Flex>
        </Box>
    );
};

export default TopFilterPanel;
