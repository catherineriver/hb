import {Box, Flex, HStack} from "@chakra-ui/react";
import RegionSelector from "@/components/ui/region-selector";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"
import Logo from "@/components/ui/logo";
import SortingSelector from "@/components/ui/sorting-selector";
import {useNews} from "@/context/news-context";

interface HeaderProps {
    withRegionSelector?: boolean
    withNav?: boolean
    withSorting?: boolean
}

const Header: React.FC<HeaderProps> = ({withRegionSelector, withSorting, withNav}) => {
    const {setSortBy, sortBy} = useNews()

    const handleSort = (sortBy: string[]) => {
        setSortBy(sortBy)
        alert(sortBy)
    }

    return (
        <Box borderBottom="2px solid" px={4}>
            <HStack justifyContent="space-between" alignItems="center" gap={2}>
            <Flex align="center" justify="center" position="relative">
                <ChakraLink asChild>
                    <NextLink href="/">
                        <Logo w="140" h="45" />
                    </NextLink>
                </ChakraLink>
            </Flex>
                {withNav &&
                    <HStack justifyContent="space-between" alignItems="center">
                        <ChakraLink asChild>
                            <NextLink href="/">Все питчи</NextLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <NextLink href="/authors">Авторы</NextLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <NextLink href="/settings">Организации</NextLink>
                        </ChakraLink>
                        <ChakraLink asChild>
                            <NextLink href="/settings">Настройки</NextLink>
                        </ChakraLink>
                    </HStack>
                }

                <HStack justifyContent="space-between" alignItems="center" gap={2}>
                    {withRegionSelector && <RegionSelector/>}
                    {withSorting &&
                        <SortingSelector
                            onSortChange={(e) => handleSort(e)}
                            sortingValue={sortBy}
                        />
                    }
                </HStack>

            </HStack>
        </Box>
    );
};

export default Header;
