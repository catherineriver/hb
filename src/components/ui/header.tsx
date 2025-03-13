import { Box, Flex, HStack, IconButton, Drawer } from "@chakra-ui/react";
import RegionSelector from "@/components/ui/region-selector";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "@/components/ui/logo";
import SortingSelector from "@/components/ui/sorting-selector";
import { useNews } from "@/context/news-context";
import Navbar from "@/components/ui/navbar";
import {FaBurger, FaXmark} from "react-icons/fa6";
import {FaCross} from "react-icons/fa";

interface HeaderProps {
    withRegionSelector?: boolean;
    withNav?: boolean;
    withSorting?: boolean;
}

const Header: React.FC<HeaderProps> = ({ withRegionSelector, withSorting, withNav }) => {
    const { setSortBy, sortBy } = useNews();

    const handleSort = (sortBy: string | string[]) => {
        const sortValue = Array.isArray(sortBy) ? sortBy[0] : sortBy;
        setSortBy(sortValue);
    };

    return (
        <HStack borderBottom="1px solid" px={4} justify="space-between">
            <HStack justifyContent="space-between" alignItems="center" gap={2} w="100%">
                {/* Логотип */}
                <Flex align="center" justify="center" position="relative">
                    <ChakraLink asChild>
                        <NextLink href="/">
                            <Logo width="158" height="70" />
                        </NextLink>
                    </ChakraLink>
                </Flex>

                {/* Навигация и фильтры на десктопе */}
                <HStack display={{ base: "none", md: "flex" }} justifyContent="space-between" alignItems="center" gap={2}>
                    {withNav && <Navbar inline />}
                    {!withNav && (
                        <>
                            {withRegionSelector && <RegionSelector />}
                            {withSorting && (
                                <SortingSelector
                                    onSortChange={(e) => handleSort(e)}
                                    sortingValue={sortBy}
                                />
                            )}
                        </>
                    )}
                </HStack>
            </HStack>

            <Drawer.Root>
                <Drawer.Backdrop />
                <Drawer.Trigger display={{ base: "flex", md: "none" }}>
                    <FaBurger />
                </Drawer.Trigger>
                <Drawer.Positioner>
                    <Drawer.Content color="#fff">
                        <HStack width="100%" justifyContent="end" alignItems="center" p={4}>
                        <Drawer.CloseTrigger>
                            <FaXmark color='#fff'/>
                        </Drawer.CloseTrigger>
                        </HStack>
                        <Drawer.Body>
                            <Navbar />
                        </Drawer.Body>
                        <Drawer.Footer />
                    </Drawer.Content>
                </Drawer.Positioner>
            </Drawer.Root>
        </HStack>
    );
};

export default Header;
