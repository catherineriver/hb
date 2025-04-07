import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "@/components/ui/select";
import {createListCollection, VStack, Text} from "@chakra-ui/react";
import React from "react";
import { SelectLabel} from "@ark-ui/react";

interface BaseSelectProps {
    items: { label: string; value: string }[];
    placeholder: string;
    label?: string;
    onValueChange?: (value: string | string[]) => void;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ label, items, placeholder, onValueChange }) => {
    const collection = createListCollection({ items });
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const selectedLabels = items
        .filter(item => selectedItems.includes(item.value))
        .map(item => item.label)
        .join(', ');

    return (
        <SelectRoot
            collection={collection}
            size="sm"
            onValueChange={(e) => {
                const newValue = e.value;
                onValueChange?.(newValue);
                setSelectedItems(Array.isArray(newValue) ? newValue : [newValue]);
            }}
            multiple
        >
            <VStack align='flex-start' gap={0}>
                <SelectLabel>{label}</SelectLabel>
                <SelectTrigger clearable w="100%">
                    <SelectValueText fontSize="16px" placeholder={placeholder } />
                </SelectTrigger>
                <Text fontSize="xs" color="gray.600">
                    {selectedLabels && selectedLabels.length > 0 && selectedLabels}
                </Text>

        </VStack>
            <SelectContent background="white" border="1px solid #ddd" boxShadow="md" p={4}>
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
