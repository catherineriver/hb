import BaseSelect from "@/components/ui/BaseSelector/BaseSelect";
import React from "react";

const subjectsRF =[
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
    ];

const RegionSelector = () => {
    return <BaseSelect items={subjectsRF} placeholder="Регион:" />;
}

export default RegionSelector;
