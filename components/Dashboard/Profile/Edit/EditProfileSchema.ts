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
    bio: z
        .string()
        .max(160, "A bio nao pode ser tão longa")
        .refine((value) => value.split("\n").length <= 4, {
            message: `A bio não deve ter mais de ${4} linhas.`,
        }),
    location: z.string().max(30, "O seu local deve ser menor"),
});
