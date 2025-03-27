import {Box, Flex, Button} from "@chakra-ui/react";
import React, {useState} from "react";
import {usePitchesFilter} from "@/context/pitches-context";
import BaseSelect from "@/components/ui/BaseSelector/BaseSelect";


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


const TopFilterPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { fetchFilteredPitches } = usePitchesFilter();

    return (
        <Box borderBottom="1px solid {colors.text}" p={{ base: 2, md: 3 }} bg="white">
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
                justify="center"
                display={{ base: isOpen ? "flex" : "none", md: "flex" }} // Скрытие на мобилке
                mt={{ base: 2, md: 0 }}
            >
                <BaseSelect items={topicOptions} placeholder="Тема:" onValueChange={(value) => fetchFilteredPitches({ topics: value })}/>
                <BaseSelect items={formatOptions} placeholder="Формат:" onValueChange={(value) => fetchFilteredPitches({ formats: value })}/>
                <BaseSelect items={russianRegions} placeholder="Регион:" onValueChange={(value) => fetchFilteredPitches({ regions: value })} />
            </Flex>
        </Box>
    );
};

export default TopFilterPanel;
