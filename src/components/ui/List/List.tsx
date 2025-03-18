import { Box, Spinner, Text } from "@chakra-ui/react";
import {JSX} from "react";

interface ListProps<T> {
    data: T[] | null;
    renderItem: (item: T) => JSX.Element;
    loading: boolean;
    error: string | null;
    emptyMessage?: string;
}

const List = <T,>({ data, renderItem, loading, error, emptyMessage = "Нет данных" }: ListProps<T>) => {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Spinner size="lg" />
            </Box>
        );
    }

    if (error) {
        return <Text color="red.500">Ошибка: {error}</Text>;
    }

    if (!data || data.length === 0) {
        return <Text>{emptyMessage}</Text>;
    }

    return (
        <Box>
            {data.map((item, index) => (
                <Box key={index} mb={4}>
                    {renderItem(item)}
                </Box>
            ))}
        </Box>
    );
};

export default List;
