export const getStatusProps = (status: string | undefined) => {
    switch (status) {
        case "draft":
            return { color: "#000086", label: "Черновик" };
        case "in_progress":
            return { color: "#FFC947", label: "В работе" };
        case "published":
            return { color: "#54A77E", label: "Опубликовано" };
        case "archived":
            return { color: "#E57373", label: "Архив" };
        default:
            return { color: "#000086", label: status };
    }
};
