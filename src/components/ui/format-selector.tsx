import BaseSelect from "@/components/ui/BaseSelector/BaseSelect";
import React from "react";

const formats =[
        { label: "Все", value: "all" },
        { label: "Лонгрид", value: "longread" },
        { label: "Репортаж", value: "rep" },
        { label: "Расследование", value: "inv" },
    ];

const FormatSelector = () => {
    return <BaseSelect items={formats} placeholder="Формат:" />;
}

export default FormatSelector;
