import * as z from "zod";

export const EditProfileFormSchema = z.object({
    display_name: z
        .string()

        .min(2, "O nome não pode ser tão curto.")
        .max(25, "O nome não pode ser tão longo.")
        .refine(
            (value) => /^[a-zA-Z0-9_ äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ]*$/.test(value),
            "O nome não pode conter caracteres especiais."
        ),
    bio: z.string().max(160, "A bio nao pode ser tão longa"),
});
