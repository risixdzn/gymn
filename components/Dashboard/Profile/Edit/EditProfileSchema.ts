import * as z from "zod";

export const EditProfileFormSchema = z.object({
    displayName: z
        .string()
        .min(2, "O nome não pode ser tão curto.")
        .max(25, "O nome não pode ser tão longo.")
        .refine(
            (value) => /^[a-zA-Z0-9_ äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ]*$/.test(value),
            "O nome não pode conter caracteres especiais."
        ),
    email: z
        .string()
        .refine(
            (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            "Este não é um email valido."
        ),
});
