import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import RegionSelector from "@/components/ui/region-selector";
import ThemeSelector from "@/components/ui/theme-selector";

const TopFilterPanel = () => {
    return (
        <Box borderBottom="1px solid" borderColor="gray.300" p={3} bg="white">
            <Flex align="center" gap={4} wrap="wrap" justify="center">
                <ThemeSelector />
                <RegionSelector/>
            </Flex>
        </Box>
    );
};

export default TopFilterPanel;
