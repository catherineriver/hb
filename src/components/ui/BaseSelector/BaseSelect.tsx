import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SelectLabel } from "@ark-ui/react";

interface BaseSelectProps {
    items: { label: string; value: string }[];
    placeholder: string;
    onValueChange?: (value: string) => void;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ items, placeholder, onValueChange }) => {
    const collection = createListCollection({ items });
    const defaultItem = items[0]?.value || ""; // Дефолтный пункт
    const [value, setValue] = useState<string[]>([])

    const handleValueChange = (value: string | null) => {
        const newValue = value ?? defaultItem;
        setValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    useEffect(() => {
        if (value) {
            fetch(`/api/your-endpoint?value=${value}`)
                .then(response => response.json())
                .then(data => console.log("Fetched data:", data))
                .catch(error => console.error("Error fetching data:", error));
        }
    }, [value]);

    return (
        <SelectRoot
            collection={collection}
            size="sm"
            width="320px"
            defaultValue={[defaultItem]}
            onValueChange={(e) => setValue(e.value)}
        >
            <SelectLabel>{placeholder}</SelectLabel>
            <SelectTrigger clearable onClear={() => handleValueChange(null)}>
                <SelectValueText fontSize="16px" px={3} py={2} placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent background="white" border="none" boxShadow="md">
                {collection.items.map((item) => (
                    <SelectItem
                        item={item}
                        key={item.value}
                        onClick={() => handleValueChange(item.value)}
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export default BaseSelect;
