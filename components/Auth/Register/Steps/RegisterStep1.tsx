import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { type RegisterMemberForm } from "../RegisterMemberForm";
import { type RegisterGymOwnerForm } from "../RegisterGymOwnerForm";

// usando discriminated unions para atribuir tipos condicionais
// veja mais em: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions
type StepProps = {} & (
    | {
          formType: "member";
          register: UseFormRegister<RegisterMemberForm>;
          errors: FieldErrors<RegisterMemberForm>;
          loading: boolean;
      }
    | {
          formType: "gymOwner";
          register: UseFormRegister<RegisterGymOwnerForm>;
          errors: FieldErrors<RegisterGymOwnerForm>;
          loading: boolean;
      }
);

export default function RegisterStep1({ register, errors, loading }: StepProps) {
    //definindo o tipo da função register
    //em um operador ternario que verifica se a
    //propriedade formtype = "member" utilizando extends
    type TypedRegister = StepProps["formType"] extends "member"
        ? UseFormRegister<RegisterMemberForm>
        : UseFormRegister<RegisterGymOwnerForm>;

    //atribuindo o tipo typedregister a função
    const typedRegister = register as TypedRegister;

    return (
        <>
            <div>
                <Label htmlFor='displayName'>Nome de exibição</Label>
                <Input
                    disabled={loading}
                    key={1}
                    placeholder='John'
                    id='displayName'
                    type='text'
                    className='mt-2'
                    {...typedRegister("displayName", {
                        required: "Preencha este campo.",
                        minLength: {
                            value: 2,
                            message: "O nome não pode ser tão curto.",
                        },
                        maxLength: {
                            value: 25,
                            message: "O nome não pode ser tão longo.",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_ äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ]*$/,
                            message: "O nome não pode conter caracteres especiais.",
                        },
                    })}
                ></Input>
                <p className='text-xs text-muted-foreground mt-2'>Este será o nome exibido</p>
                {errors.displayName && (
                    <p className='text-xs text-destructive mt-2'>{errors.displayName.message}</p>
                )}
            </div>

            <div className='mt-2'>
                <Label htmlFor='username'>Nome de usuário</Label>
                <Input
                    disabled={loading}
                    key={2}
                    placeholder='John_Doe'
                    id='username'
                    type='text'
                    className='mt-2'
                    {...typedRegister("username", {
                        required: "Preencha este campo.",
                        minLength: {
                            value: 3,
                            message: "O nome não pode ser tão curto.",
                        },
                        maxLength: {
                            value: 30,
                            message: "O nome não pode ser tão longo.",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]*$/,
                            message: "O nome de usuário não pode conter caracteres especiais.",
                        },
                    })}
                ></Input>
                <p className='text-xs text-muted-foreground mt-2'>
                    Você será identificado(a) por esse nome.
                </p>
                {errors.username && (
                    <p className='text-xs text-destructive mt-2'>{errors.username.message}</p>
                )}
            </div>
        </>
    );
}
