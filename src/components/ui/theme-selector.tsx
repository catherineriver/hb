import React from "react";
import BaseSelect from "@/components/ui/BaseSelector/BaseSelect";

const themes = [
        { label: "Все", value: "all" },
        { label: "Политика", value: "politics" },
        { label: "Экономика", value: "economy" },
        { label: "Наука", value: "science" },
        { label: "Общество", value: "society" },
        { label: "Культура", value: "culture" },
        { label: "Технологии", value: "tech" },
        { label: "Спорт", value: "sports" },
        { label: "Здоровье", value: "health" },
        { label: "Международные отношения", value: "international" },
    ];

const ThemeSelector = () => {
    return <BaseSelect items={themes} placeholder="Тема:" />;
};

export default ThemeSelector;
