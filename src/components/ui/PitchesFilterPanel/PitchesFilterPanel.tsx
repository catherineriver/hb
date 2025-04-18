import {
    Box,
    Checkbox,
    Button,
    Flex,
    CheckboxGroup,
    Fieldset,
    For, HStack,
} from "@chakra-ui/react";
import React, { useState} from "react";
import { useEffect } from "react";

import {usePitchesFilter} from "@/context/pitches-context";
import BaseSelect from "@/components/ui/BaseSelector/BaseSelect";
import {useManagerContext} from "@/context/mock-context";
import {FaXmark} from "react-icons/fa6";

const formatOptions = [
    { value: "investigation", label: "Расследование" },
    { value: "opinion", label: "Мнение" },
    { value: "reportage", label: "Репортаж" },
    { value: "interview", label: "Интервью" },
    { value: "analysis", label: "Аналитика" },
    { value: "feature", label: "Фичер" },
    { value: "longread", label: "Лонгрид" },
];

const statusOptions = [
    { value: "draft", label: "Черновик" },
    { value: "in_progress", label: "В работе" },
    { value: "published", label: "Опубликовано" },
    { value: "archived", label: "Архив" },
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

const russianRegions = [
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
    ];

const PitchesFilterPanel = () => {
    const { fetchFilteredPitches } = usePitchesFilter();
    const { isManager } = useManagerContext();
    const [isOpen, setIsOpen] = useState(false);
    const [formats, setFormats] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [status, setStatus] = useState<string[]>([]);

    const activeFilter = formats.length > 0 || status.length > 0 || topics.length > 0;

    const handleClearFilters = () => {
        setFormats([]);
        setTopics([]);
    };

    useEffect(() => {
        const fetchFilters = async () => {
            const filtersObj = {
                formats,
                topics,
                status
            };
            await fetchFilteredPitches( filtersObj);
        };
        fetchFilters();
    }, [formats, topics, status, fetchFilteredPitches]);

    return (
            <Box borderRight="1px solid #ddd" p={{ base: 2, md: 3 }} bg="white" w='100%'>
                <HStack justify='space-between'>
                    <Button
                        display={{ base: "flex", md: "none" }}
                        onClick={() => setIsOpen(!isOpen)}
                        size="sm"
                        as="button"
                    >
                        Фильтры
                    </Button>

                    {isOpen && <Button
                        display={{ base: "flex", md: "none" }}
                        onClick={() => setIsOpen(!isOpen)}
                        size="sm"
                        as="button"
                    >
                        Применить
                    </Button>}

                    {activeFilter && <Button
                        display={{ base: "flex", md: "none" }}
                        onClick={() => handleClearFilters()}
                        size="sm"
                        as="button"
                    >
                        Очистить
                    </Button>}
                </HStack>

                <Flex
                    align="center"
                    gap={4}
                    wrap="wrap"
                    display={{ base: isOpen ? "flex" : "none", md: "flex" }}
                    mt={{ base: 2, md: 0 }}
                    overflowY="scroll"
                    height='100%'
                    css={{
                        '&::-webkit-scrollbar': { display: 'none' },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'
                    }}
                >
                    {isManager &&
                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Fieldset.Root>
                            <CheckboxGroup name="status" value={status} onValueChange={(values: string[]) => setStatus(values)}>
                                <HStack width="100%" justifyContent="space-between" alignItems="center" mb="2">
                                    <Fieldset.Legend fontSize="sm" lineHeight='36px'>
                                        Статус питча
                                    </Fieldset.Legend>
                                    {status.length > 0 && <Button size="xs" variant="ghost" onClick={() => setStatus([])}>
                                        <FaXmark />
                                    </Button>}
                                </HStack>
                                <Fieldset.Content>
                                    <For each={statusOptions}>
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
                    }
                    <Box background="{colors.gray}" p={4} borderRadius={2} w="100%">
                        <Fieldset.Root>
                            <CheckboxGroup name="formats" value={formats} onValueChange={(values: string[]) => setFormats(values)}>
                                <HStack width="100%" justifyContent="space-between" alignItems="center" mb="2">
                                    <Fieldset.Legend fontSize="sm" lineHeight='36px'>
                                        Выберите формат
                                    </Fieldset.Legend>
                                    {formats.length > 0 && <Button size="xs" variant="ghost" onClick={() => setFormats([])}>
                                        <FaXmark />
                                    </Button>}
                                </HStack>
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
                                <HStack width="100%" justifyContent="space-between" alignItems="center" mb="2">
                                    <Fieldset.Legend fontSize="sm" lineHeight='36px'>
                                        Выберите тему
                                    </Fieldset.Legend>
                                    {topics.length > 0 && <Button size="xs" variant="ghost" onClick={() => setTopics([])}>
                                        <FaXmark />
                                    </Button>}
                                </HStack>
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

                    <Box background="{colors.gray}" borderRadius={2} p={4} w="100%">
                        <BaseSelect items={russianRegions} placeholder="Регион:" onValueChange={(value) => fetchFilteredPitches({ regions: value })} />
                    </Box>
                </Flex>
            </Box>
    );
};

export default PitchesFilterPanel;
