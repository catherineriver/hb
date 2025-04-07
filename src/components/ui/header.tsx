import { Flex, HStack, Drawer } from "@chakra-ui/react";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "@/components/ui/logo";
import LogoMobile from "@/components/ui/logo-mobile";
import Navbar from "@/components/ui/navbar";
import {FaBars, FaXmark} from "react-icons/fa6";

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
                <Flex display={{ base: 'none', md: 'flex' }} align="center" justify="center" position="relative">
                    <ChakraLink asChild>
                        <NextLink href="/">
                            <Logo width="250" height="70" />
                        </NextLink>
                    </ChakraLink>
                </Flex>

                <Flex display={{ base: 'flex', md: 'none' }} align="center" justify="center" position="relative" py={3}>
                    <ChakraLink asChild>
                        <NextLink href="/">
                            <LogoMobile width="40" height="40" />
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
                    <FaBars />
                </Drawer.Trigger>
                <Drawer.Positioner>
                    <Drawer.Content background="#fff">
                        <HStack width="100%" justifyContent="end" alignItems="center" p={4}>
                            <Drawer.CloseTrigger >
                                <FaXmark size={20}/>
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
