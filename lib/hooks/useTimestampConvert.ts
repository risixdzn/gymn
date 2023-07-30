export const useTimestampConverter = (timestamp: string | undefined) => {
    if (timestamp !== undefined) {
        const date = new Date(timestamp);
        const dia = date.getDate();
        const mes = date.toLocaleString("default", { month: "long" });
        const ano = date.getFullYear();
        return `${dia} de ${mes} de ${ano}`;
    }

    return null;
};
