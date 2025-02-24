import {Box, Flex, HStack} from "@chakra-ui/react";
import RegionSelector from "@/components/ui/region-selector";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"
import Logo from "@/components/ui/logo";
import SortingSelector from "@/components/ui/sorting-selector";
import {useNews} from "@/context/news-context";
import Navbar from "@/components/ui/navbar";

interface HeaderProps {
    withRegionSelector?: boolean
    withNav?: boolean
    withSorting?: boolean
}

const Header: React.FC<HeaderProps> = ({withRegionSelector, withSorting, withNav}) => {
    const {setSortBy, sortBy} = useNews()

    const handleSort = (sortBy: string | string[]) => {
        const sortValue = Array.isArray(sortBy) ? sortBy[0] : sortBy;
        setSortBy(sortValue);
        alert(sortValue);
    };

    return (
        <Box borderBottom="2px solid" px={4}>
            <HStack justifyContent="space-between" alignItems="center" gap={2}>
                <Flex align="center" justify="center" position="relative">
                    <ChakraLink asChild>
                        <NextLink href="/">
                            <Logo width="180" height="90" />
                        </NextLink>
                    </ChakraLink>
                </Flex>

                {withNav &&
                    <Navbar inline />
                }

                {!withNav && <HStack justifyContent="space-between" alignItems="center" gap={2}>
                    {withRegionSelector && <RegionSelector/>}
                    {withSorting &&
                        <SortingSelector
                            onSortChange={(e) => handleSort(e)}
                            sortingValue={sortBy}
                        />
                    }
                    </HStack>
                }

            </HStack>
        </Box>
    );
};

export default Header;
