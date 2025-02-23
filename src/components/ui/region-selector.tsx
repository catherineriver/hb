import {createListCollection} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "@/components/ui/select";
import React from "react";

const subjectsRF = createListCollection({
    items: [
        { label: "Все", value: "all" },
        { label: "Москва", value: "MOW" },
        { label: "Санкт-Петербург", value: "SPE" },
        { label: "Московская область", value: "MOS" },
        { label: "Ленинградская область", value: "LEN" },
        { label: "Краснодарский край", value: "KDA" },
        { label: "Республика Татарстан", value: "TA" },
        { label: "Новосибирская область", value: "NVS" },
        { label: "Свердловская область", value: "SVE" },
        { label: "Ростовская область", value: "ROS" },
        { label: "Республика Башкортостан", value: "BA" },
        { label: "Челябинская область", value: "CHE" },
        { label: "Самарская область", value: "SAM" },
        { label: "Нижегородская область", value: "NIZ" },
        { label: "Красноярский край", value: "KYA" },
        { label: "Приморский край", value: "PRI" },
        { label: "Пермский край", value: "PER" },
        { label: "Республика Дагестан", value: "DA" },
        { label: "Омская область", value: "OMS" },
        { label: "Воронежская область", value: "VOR" },
        { label: "Волгоградская область", value: "VGG" },
    ],
})

const RegionSelector = () => {
    return (
        <SelectRoot multiple collection={subjectsRF} size="sm" width="320px">
            <SelectTrigger clearable>
                <SelectValueText fontSize="18px" px={2} py={3}  placeholder="Все" defaultValue="all" />
            </SelectTrigger>
            <SelectContent background="white" border="none">
                {subjectsRF.items.map((subject) => (
                    <SelectItem item={subject} key={subject.value}>
                        {subject.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    )
}

export default RegionSelector;
