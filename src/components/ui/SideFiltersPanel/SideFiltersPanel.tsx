import {Box, Input, Checkbox, Field, Select, Portal, Button, Flex, CheckboxGroup, Fieldset, For, createListCollection} from "@chakra-ui/react";
import {useState} from "react";

// import { useAuthorsFilter } from "@/context/filter-context";
const formatOptions = [
    { value: "investigation", label: "Расследование" },
    { value: "opinion", label: "Мнение" },
    { value: "reportage", label: "Репортаж" },
    { value: "interview", label: "Интервью" },
    { value: "analysis", label: "Аналитика" },
    { value: "feature", label: "Фичер" },
];

const topicOptions = [
    { value: "politics", label: "Политика" },
    { value: "society", label: "Общество" },
    { value: "economy", label: "Экономика" },
    { value: "culture", label: "Культура" },
    { value: "science", label: "Наука" },
    { value: "technology", label: "Технологии" },
    { value: "ecology", label: "Экология" },
    { value: "conflict", label: "Конфликты" },
];

const russianRegions = createListCollection({
    items: [
        { value: "moscow", label: "Москва" },
        { value: "spb", label: "Санкт-Петербург" },
        { value: "kazan", label: "Казань" },
        { value: "yekaterinburg", label: "Екатеринбург" },
        { value: "novosibirsk", label: "Новосибирск" },
        { value: "nizhny_novgorod", label: "Нижний Новгород" },
        { value: "rostov", label: "Ростов-на-Дону" },
        { value: "krasnoyarsk", label: "Красноярск" },
        { value: "irkutsk", label: "Иркутск" },
        { value: "vladivostok", label: "Владивосток" },
        { value: "samara", label: "Самара" },
        { value: "ufa", label: "Уфа" },
        { value: "perm", label: "Пермь" },
        { value: "volgograd", label: "Волгоград" },
        { value: "chelyabinsk", label: "Челябинск" },
    ],
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
});

const SideFilterPanel = () => {
    // const { filters, setFilters } = useAuthorsFilter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [experience, setExperience] = useState(false);
    const [travel, setTravel] = useState(false);
    const [urgent, setUrgent] = useState(false);

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
                                {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                mb={4}
                            />
                        </Field.Root>
                    </Box>


                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Fieldset.Root>
                            <CheckboxGroup name="format">
                                <Fieldset.Legend fontSize="sm" mb="2">
                                    Выберите формат
                                    {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <For each={formatOptions}>
                                        {(value) => (
                                            <Checkbox.Root key={value.value} value={value.value}>
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control border="{borders.input}"
                                                                  color="{colors.lightGray}"
                                                                  fontSize="xs"
                                                                  px={2}
                                                                  backgroundColor="white"/>
                                                <Checkbox.Label>{value.label}</Checkbox.Label>
                                            </Checkbox.Root>
                                        )}
                                    </For>
                                </Fieldset.Content>
                            </CheckboxGroup>
                        </Fieldset.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Fieldset.Root>
                            <CheckboxGroup name="format">
                                <Fieldset.Legend fontSize="sm" mb="2">
                                    Выберите тему
                                    {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <For each={topicOptions}>
                                        {(value) => (
                                            <Checkbox.Root key={value.value} value={value.value}>
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control border="{borders.input}"
                                                                  color="{colors.lightGray}"
                                                                  fontSize="xs"
                                                                  px={2}
                                                                  backgroundColor="white"/>
                                                <Checkbox.Label>{value.label}</Checkbox.Label>
                                            </Checkbox.Root>
                                        )}
                                    </For>
                                </Fieldset.Content>
                            </CheckboxGroup>
                        </Fieldset.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Select.Root
                            collection={russianRegions}
                            size="sm"
                            multiple
                        >
                            <Select.HiddenSelect />
                            <Select.Label>Регион</Select.Label>
                            {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
                            <Select.Control>
                                <Select.Trigger
                                    focusRing="outside"
                                    border="{borders.input}"
                                    color="{colors.lightGray}"
                                    fontSize="xs"
                                    px={2}
                                    backgroundColor="white"
                                >
                                    <Select.ValueText placeholder="Выберите регион" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content background="#fff" w="100%">
                                        {russianRegions.items.map((item) => (
                                            <Select.Item item={item} key={item.value}>
                                                {item.label}
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
                            checked={urgent}
                            onCheckedChange={(e) => setUrgent(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control
                                              border="{borders.input}"
                                              color="{colors.lightGray}"
                                              fontSize="xs"
                                              px={2}
                                              backgroundColor="white" />
                            <Checkbox.Label>⚡️ Срочные тексты</Checkbox.Label>
                        </Checkbox.Root>

                        <Checkbox.Root
                            checked={travel}
                            onCheckedChange={(e) => setTravel(!!e.checked)}
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
                            checked={experience}
                            onCheckedChange={(e) => setExperience(!!e.checked)}
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
