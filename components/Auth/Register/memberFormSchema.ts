import { z } from "zod";

export const schema = z
    .object({
        email: z.string().email("Este não é um email valido."),
        username: z
            .string()
            .min(2, { message: "O nome de usuário deve ser maior." })
            .max(30, { message: "O nome de usuário deve ser menor." }),
        firstName: z.string().max(60, { message: "O nome completo deve ser menor." }).optional(),
        password: z
            .string()
            .min(6, { message: "A senha deve conter 6 ou mais caracteres." })
            .max(35, { message: "A senha deve ser menor." })
            .refine(
                (value) => /^(?=.*[a-z])/.test(value),
                "A senha deve conter uma letra minuscula."
            )
            .refine(
                (value) => /^(?=.*[A-Z])/.test(value),
                "A senha deve conter uma letra maiúscula."
            )
            .refine((value) => /^(?=.*[0-9])/.test(value), "A senha deve conter um número."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password == data.confirmPassword, {
        message: "As senhas não sao iguais.",
        path: ["confirmPassword"],
    });
