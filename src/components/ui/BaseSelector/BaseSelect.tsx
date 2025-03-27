import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "@/components/ui/select";
import {createListCollection} from "@chakra-ui/react";
import React from "react";
import { SelectLabel } from "@ark-ui/react";

interface BaseSelectProps {
    items: { label: string; value: string }[];
    placeholder: string;
    onValueChange?: (value: string | string[]) => void;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ items, placeholder, onValueChange }) => {
    const collection = createListCollection({ items });
    const defaultItem = items[0]?.value || "";

    return (
        <SelectRoot
            collection={collection}
            size="sm"
            width="320px"
            defaultValue={[defaultItem]}
            onValueChange={(e) => {
                const newValue = e.value;
                onValueChange?.(newValue);
            }}
            display="flex"
            flexDirection="row"
            alignItems='center'
            multiple
        >
                <SelectLabel>{placeholder}</SelectLabel>
                <SelectTrigger clearable w="100%">
                    <SelectValueText fontSize="16px" px={3} py={2} placeholder={placeholder} />
                </SelectTrigger>
            <SelectContent background="white" border="none" boxShadow="md">
                {collection.items.map((item) => (
                    <SelectItem
                        item={item}
                        key={item.value}
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export default BaseSelect;
