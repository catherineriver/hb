export const getStatusColor = (status: string) => {
    switch (status) {
        case "draft":
            return "gray";
        case "in_progress":
            return "yellow";
        case "published":
            return "green";
        case "archived":
            return "red";
        default:
            return "blue";
    }
};
