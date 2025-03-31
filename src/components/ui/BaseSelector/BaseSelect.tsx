import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "@/components/ui/select";
import {createListCollection, VStack} from "@chakra-ui/react";
import React from "react";
import { SelectLabel } from "@ark-ui/react";

interface BaseSelectProps {
    items: { label: string; value: string }[];
    placeholder: string;
    label?: string;
    onValueChange?: (value: string | string[]) => void;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ label, items, placeholder, onValueChange }) => {
    const collection = createListCollection({ items });

    return (
        <SelectRoot
            collection={collection}
            size="sm"
            onValueChange={(e) => {
                const newValue = e.value;
                onValueChange?.(newValue);
            }}
            multiple
        >
            <VStack align='flex-start'>
                <SelectLabel>{label}</SelectLabel>
                <SelectTrigger clearable w="100%">
                    <SelectValueText fontSize="16px" px={3} py={2} placeholder={placeholder} />
                </SelectTrigger>
        </VStack>
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
