import {
    Box,
    Input,
    Checkbox,
    Field,
    Select,
    Portal,
    Button,
    Flex,
    CheckboxGroup,
    Fieldset,
    For,
    createListCollection,
    VStack
} from "@chakra-ui/react";
import { useState} from "react";
import { useEffect } from "react";
import {useAuthorsFilter} from "@/context/authors-context";
import {useDebouncedValue} from "@/hooks/useDebouncedValue";

const formatOptions = [
    { value: "investigation", label: "Расследование" },
    { value: "opinion", label: "Мнение" },
    { value: "reportage", label: "Репортаж" },
    { value: "interview", label: "Интервью" },
    { value: "analysis", label: "Аналитика" },
    { value: "feature", label: "Фичер" },
    { value: "longread", label: "Лонгрид" },
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
    const { fetchSearchedAuthors } = useAuthorsFilter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [withExperience, setWithExperience] = useState(false);
    const [readyToTravel, setReadyToTravel] = useState(false);
    const [readyToUrgent, setReadyToUrgent] = useState(false);
    const [formats, setFormats] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setWithExperience(false);
        setReadyToTravel(false);
        setReadyToUrgent(false);
        setFormats([]);
        setTopics([]);
    };

    const debouncedSearch = useDebouncedValue(searchQuery, 600);

    useEffect(() => {
        console.log("setFormats", formats);
        const fetchFilters = async () => {
            const filtersObj = {
                experience: withExperience,
                travel: readyToTravel,
                urgent: readyToUrgent,
                formats,
                topics,
            };
            await fetchSearchedAuthors(debouncedSearch, filtersObj);
        };
        fetchFilters();
    }, [debouncedSearch, withExperience, readyToTravel, readyToUrgent, formats, topics, fetchSearchedAuthors]);

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
                    display={{ base: isOpen ? "flex" : "none", md: "flex" }}
                    mt={{ base: 2, md: 0 }}
                    overflowY="scroll"
                >
                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Field.Root required>
                            <Field.Label>
                                Имя/псевдоним
                                {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
                            </Field.Label>
                            <Input
                                border="{borders.input}"
                                color="{colors.lightGray}"
                                fontSize="xs"
                                px={2}
                                backgroundColor="white"
                                placeholder="Имя"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                mb={4}
                            />
                        </Field.Root>
                    </Box>

                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <VStack gap={4} alignItems="start">
                            {(searchQuery || readyToUrgent || readyToTravel || withExperience || formats.length > 0 || topics.length > 0) &&
                                <Button size="xs" color="#ddd" variant="ghost" onClick={handleClearFilters}>Очистить</Button>}
                        <Checkbox.Root
                            checked={readyToUrgent}
                            onCheckedChange={(e) => setReadyToUrgent(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control
                                css={{
                                    '&[data-state="unchecked"]': {
                                        borderColor: "{borders.input}",
                                        background: 'white',
                                        color: "{colors.lightGray}",
                                    },
                                    '&[data-state="checked"]': {
                                        borderColor: "{borders.input}",
                                        background: 'white',
                                    },
                                }}
                            >
                                <Checkbox.Indicator>
                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                        <path
                                            fill="currentColor"
                                            d="M6.173 11.414L3.293 8.536a1 1 0 011.414-1.414l1.466 1.466 4.293-4.293a1 1 0 011.414 1.414L6.173 11.414z"
                                        />
                                    </svg>
                                </Checkbox.Indicator>
                            </Checkbox.Control>
                            <Checkbox.Label>⚡️ Срочные тексты</Checkbox.Label>
                        </Checkbox.Root>

                        <Checkbox.Root
                            checked={readyToTravel}
                            onCheckedChange={(e) => setReadyToTravel(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control
                                css={{
                                    '&[data-state="unchecked"]': {
                                        borderColor: "{borders.input}",
                                        background: 'white',
                                        color: "{colors.lightGray}"
                                    },
                                    '&[data-state="checked"]': {
                                        borderColor: "{borders.input}",
                                        background: 'white',
                                    },
                                }}>
                                <Checkbox.Indicator>
                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                        <path
                                            fill="currentColor"
                                            d="M6.173 11.414L3.293 8.536a1 1 0 011.414-1.414l1.466 1.466 4.293-4.293a1 1 0 011.414 1.414L6.173 11.414z"
                                        />
                                    </svg>
                                </Checkbox.Indicator>
                            </Checkbox.Control>
                            <Checkbox.Label>✈️ Командировки</Checkbox.Label>
                        </Checkbox.Root>

                        <Checkbox.Root
                            checked={withExperience}
                            onCheckedChange={(e) => setWithExperience(!!e.checked)}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control
                                css={{
                                    '&[data-state="unchecked"]': {
                                        borderColor: "{borders.input}",
                                        background: 'white',
                                        color: "{colors.lightGray}"
                                    },
                                    '&[data-state="checked"]': {
                                        borderColor: "{borders.input}",
                                        background: 'white',
                                    },
                                }}
                            >
                                <Checkbox.Indicator>
                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                        <path
                                            fill="currentColor"
                                            d="M6.173 11.414L3.293 8.536a1 1 0 011.414-1.414l1.466 1.466 4.293-4.293a1 1 0 011.414 1.414L6.173 11.414z"
                                        />
                                    </svg>
                                </Checkbox.Indicator>
                            </Checkbox.Control>
                            <Checkbox.Label>✅ Опыт с High Beam</Checkbox.Label>
                        </Checkbox.Root>
                        </VStack>
                    </Box>


                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Fieldset.Root>
                            <CheckboxGroup name="formats" value={formats} onValueChange={(values: string[]) => setFormats(values)}>
                                <Fieldset.Legend fontSize="sm" mb="2">
                                    Выберите формат
                                    {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <For each={formatOptions}>
                                        {(value) => (
                                            <Checkbox.Root key={value.value} value={value.value}>
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control
                                                    css={{
                                                        '&[data-state="unchecked"]': {
                                                            borderColor: "{borders.input}",
                                                            background: 'white',
                                                            color: "{colors.lightGray}"
                                                        },
                                                        '&[data-state="checked"]': {
                                                            borderColor: "{borders.input}",
                                                            background: 'white',
                                                        },
                                                    }}
                                                >
                                                <Checkbox.Indicator>
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path
                                                            fill="currentColor"
                                                            d="M6.173 11.414L3.293 8.536a1 1 0 011.414-1.414l1.466 1.466 4.293-4.293a1 1 0 011.414 1.414L6.173 11.414z"
                                                        />
                                                    </svg>
                                                </Checkbox.Indicator>
                                                </Checkbox.Control>
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
                            <CheckboxGroup name="topics" value={topics} onValueChange={(values: string[]) => setTopics(values)}>
                                <Fieldset.Legend fontSize="sm" mb="2">
                                    Выберите тему
                                    {searchQuery !== '' && <Button size="xs" color="#ddd" variant="ghost" onClick={() => setSearchQuery("")}>Очистить</Button>}
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <For each={topicOptions}>
                                        {(value) => (
                                            <Checkbox.Root key={value.value} value={value.value}>
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control css={{
                                                    '&[data-state="unchecked"]': {
                                                        borderColor: "{borders.input}",
                                                        background: 'white',
                                                        color: "{colors.lightGray}"
                                                    },
                                                    '&[data-state="checked"]': {
                                                        borderColor: "{borders.input}",
                                                        background: 'white',
                                                    },
                                                }}
                                                >
                                                <Checkbox.Indicator>
                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                        <path
                                                            fill="currentColor"
                                                            d="M6.173 11.414L3.293 8.536a1 1 0 011.414-1.414l1.466 1.466 4.293-4.293a1 1 0 011.414 1.414L6.173 11.414z"
                                                        />
                                                    </svg>
                                                </Checkbox.Indicator>
                                                </Checkbox.Control>
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
                </Flex>
            </Box>
    );
};

export default SideFilterPanel;
