import { Box, Spinner, Text } from "@chakra-ui/react";
import {JSX} from "react";

interface ListProps<T> {
    data: T[] | null;
    renderItem: (item: T) => JSX.Element;
}

const List = <T,>({ data, renderItem }: ListProps<T>) => {
    return (
        <Box>
            {data && data.map((item, index) => (
                <Box key={index} mb={4}>
                    {renderItem(item)}
                </Box>
            ))}
        </Box>
    );
};

export default List;
