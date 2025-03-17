import { Flex, HStack, Drawer } from "@chakra-ui/react";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "@/components/ui/logo";
import Navbar from "@/components/ui/navbar";
import {FaBurger, FaXmark} from "react-icons/fa6";

interface HeaderProps {
    withRegionSelector?: boolean;
    withNav?: boolean;
    withSorting?: boolean;
}

const Header: React.FC<HeaderProps> = ({ withNav }) => {
    return (
        <HStack borderBottom="1px solid" px={4} justify="space-between">
            <HStack justifyContent="space-between" alignItems="center" gap={2} w="100%">
                {/* Логотип */}
                <Flex align="center" justify="center" position="relative">
                    <ChakraLink asChild>
                        <NextLink href="/">
                            <Logo width="250" height="70" />
                        </NextLink>
                    </ChakraLink>
                </Flex>

                {/* Навигация и фильтры на десктопе */}
                <HStack display={{ base: "none", md: "flex" }} justifyContent="space-between" alignItems="center" gap={2}>
                    {withNav && <Navbar inline />}
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
