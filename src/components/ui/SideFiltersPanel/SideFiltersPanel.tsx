import {Box, Input, Checkbox, Field, Select, Portal, createListCollection} from "@chakra-ui/react";;
import { useAuthorsFilter } from "@/context/filter-context";

const formats = createListCollection({
    items: [
        { value: "investigation", label: "Расследование" },
        { value: "opinion", label: "Мнение" },
        { value: "reportage", label: "Репортаж" },
    ],
})

const SideFilterPanel = () => {
    const { filters, setFilters } = useAuthorsFilter();

    return (
        <Box width="280px" p={4} borderRight="1px solid #ddd">
            <Field.Root required>
                <Field.Label>
                    Имя/псевдоним <Field.RequiredIndicator />
                </Field.Label>
                <Input
                    placeholder="Имя"
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                    mb={4}
                />
            </Field.Root>


            <Box>
                <Select.Root collection={formats}>
                    <Select.Label>Выберите формат</Select.Label>
                    <Select.Control >
                        <Select.Trigger p={2} >
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

            <Box>
                <Select.Root collection={formats}>
                    <Select.Label>Выберите темы</Select.Label>
                    <Select.Control >
                        <Select.Trigger p={2} >
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

            <Box>
                <Select.Root collection={formats}>
                    <Select.Label>Локация</Select.Label>
                    <Select.Control >
                        <Select.Trigger p={2} >
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

            <Box>
                <Select.Root collection={formats}>
                    <Select.Label>Выберите регионы</Select.Label>
                    <Select.Control >
                        <Select.Trigger p={2} >
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

            <Checkbox.Root
                // checked={urgent}
                // onCheckedChange={(e) => setUrgent(!!e.checked)}
            >
                <Checkbox.HiddenInput />

                <Checkbox.Control />
                <Checkbox.Label>Срочные тексты</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
                // checked={travel}
                // onCheckedChange={(e) => setTravel(!!e.checked)}
            >
                <Checkbox.HiddenInput />

                <Checkbox.Control />
                <Checkbox.Label>Командировки</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
                // checked={experience}
                // onCheckedChange={(e) => setExperience(!!e.checked)}
            >
                <Checkbox.HiddenInput />

                <Checkbox.Control />
                <Checkbox.Label>Опыт с High Beam</Checkbox.Label>
            </Checkbox.Root>
        </Box>
    );
};

export default SideFilterPanel;
