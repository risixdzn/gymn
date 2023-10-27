type translatedErrorsObject = { [key: number]: { title: string; description: string } };

export const translatedErrors: translatedErrorsObject = {
    0: {
        title: "Banco de dados indisponível.",
        description: "Aguarde e tente novamente...",
    },
    400: {
        title: "Usuário ou senha incorretos.",
        description: "Verifique as informações e tente novamente.",
    },
};
