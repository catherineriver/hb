import {Box, Input, Checkbox, Field, Select, Portal, createListCollection, Button, Flex} from "@chakra-ui/react";
import {useState} from "react";

// import { useAuthorsFilter } from "@/context/filter-context";

const formats = createListCollection({
    items: [
        { value: "investigation", label: "Расследование" },
        { value: "opinion", label: "Мнение" },
        { value: "reportage", label: "Репортаж" },
    ],
})

const SideFilterPanel = () => {
    // const { filters, setFilters } = useAuthorsFilter();
    const [isOpen, setIsOpen] = useState(false);

    return (
            <Box borderRight="1px solid #ddd" p={{ base: 2, md: 3 }} bg="white" w='100%'>
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
                    display={{ base: isOpen ? "flex" : "none", md: "flex" }} // Скрытие на мобилке
                    mt={{ base: 2, md: 0 }}
                >
                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Field.Root required>
                            <Field.Label>
                                Имя/псевдоним <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                focusRing="outside"
                                border="{borders.input}"
                                color="{colors.lightGray}"
                                fontSize="xs"
                                px={2}
                                backgroundColor="white"
                                placeholder="Имя"
                                css={{ "--focus-color": "lime" }}
                                // value={search}
                                // onChange={(e) => setSearch(e.target.value)}
                                mb={4}
                            />
                        </Field.Root>
                    </Box>


                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Select.Root collection={formats}>
                            <Select.Label>Выберите формат</Select.Label>
                            <Select.Control >
                                <Select.Trigger p={2}
                                                focusRing="outside"
                                                border="{borders.input}"
                                                color="{colors.lightGray}"
                                                fontSize="xs"
                                                px={2}
                                                backgroundColor="white"
                                >
                                    <Select.ValueText placeholder="Выберите формат" mb={2}/>
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {formats.items.map((format) => (
                                            <Select.Item item={format} key={format.value}>
                                                {format.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Select.Root collection={formats}>
                            <Select.Label>Выберите темы</Select.Label>
                            <Select.Control >
                                <Select.Trigger p={2} focusRing="outside"
                                                border="{borders.input}"
                                                color="{colors.lightGray}"
                                                fontSize="xs"
                                                px={2}
                                                backgroundColor="white">
                                    <Select.ValueText placeholder="Выберите темы" mb={2}/>
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {formats.items.map((format) => (
                                            <Select.Item item={format} key={format.value}>
                                                {format.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Select.Root collection={formats}>
                            <Select.Label>Локация</Select.Label>
                            <Select.Control >
                                <Select.Trigger p={2} focusRing="outside"
                                                border="{borders.input}"
                                                color="{colors.lightGray}"
                                                fontSize="xs"
                                                px={2}
                                                backgroundColor="white">
                                    <Select.ValueText placeholder="Выберите локацию" mb={2}/>
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {formats.items.map((format) => (
                                            <Select.Item item={format} key={format.value}>
                                                {format.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Select.Root collection={formats}>
                            <Select.Label>Выберите регионы</Select.Label>
                            <Select.Control >
                                <Select.Trigger p={2} focusRing="outside"
                                                border="{borders.input}"
                                                color="{colors.lightGray}"
                                                fontSize="xs"
                                                px={2}
                                                backgroundColor="white">
                                    <Select.ValueText placeholder="Выберите регионы" mb={2}/>
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {formats.items.map((format) => (
                                            <Select.Item item={format} key={format.value}>
                                                {format.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Checkbox.Root
                            // checked={urgent}
                            // onCheckedChange={(e) => setUrgent(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control focusRing="outside"
                                              border="{borders.input}"
                                              color="{colors.lightGray}"
                                              fontSize="xs"
                                              px={2}
                                              backgroundColor="white" />
                            <Checkbox.Label>⚡️ Срочные тексты</Checkbox.Label>
                        </Checkbox.Root>

                        <Checkbox.Root
                            // checked={travel}
                            // onCheckedChange={(e) => setTravel(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control focusRing="outside"
                                              border="{borders.input}"
                                              color="{colors.lightGray}"
                                              fontSize="xs"
                                              px={2}
                                              backgroundColor="white"/>
                            <Checkbox.Label>✈️ Командировки</Checkbox.Label>
                        </Checkbox.Root>

                        <Checkbox.Root
                            // checked={experience}
                            // onCheckedChange={(e) => setExperience(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control focusRing="outside"
                                              border="{borders.input}"
                                              color="{colors.lightGray}"
                                              fontSize="xs"
                                              px={2}
                                              backgroundColor="white"/>
                            <Checkbox.Label>✅ Опыт с High Beam</Checkbox.Label>
                        </Checkbox.Root>
                    </Box>
                </Flex>
            </Box>
    );
};

export default SideFilterPanel;
