type TranslatedRoutesIndex = {
    [key: string]: string;
};

export const useTranslateAppRoutes = (routename: string) => {
    const translatedRoutes: TranslatedRoutesIndex = {
        explore: "Explorar",
        inbox: "Inbox",
        profile: "Perfil",
        workouts: "Treinos",
        exercises: "Exercícios",
        gym: "Academia",
    };

    return translatedRoutes[routename] || "404";
};
