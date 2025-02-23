import {createListCollection} from "@chakra-ui/react"
import React from "react";
import {SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText} from "@/components/ui/select";

const sortingOptions = createListCollection({
    items: [
        { label: "Сначала новые", value: "newest" },
        { label: "Сначала старые", value: "oldest" }
    ],
})

interface SortingSelectorProps {
    sortingValue: string;
    onSortChange: (sortBy: string[]) => void;
}

const SortingSelector: React.FC<SortingSelectorProps> = ({ onSortChange, sortingValue }) => {
    return (
        <SelectRoot
            collection={sortingOptions}
            value={[sortingValue]}
            onValueChange={(e) => onSortChange(e.value)}
            size="sm" width="200px"
        >
            <SelectTrigger clearable>
                <SelectValueText fontSize="18px" px={2} py={3}  placeholder="Все" defaultValue="all" />
            </SelectTrigger>
            <SelectContent background="white" border="none">
                {sortingOptions.items.map((option) => (
                    <SelectItem item={option} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export default SortingSelector;
