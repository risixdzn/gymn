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

export default function RegisterStep4({ register, errors, loading }: StepProps) {
    //definindo o tipo da função register
    //em um operador ternario que verifica se a
    //propriedade formtype = "member" utilizando extends
    type TypedRegister = StepProps["formType"] extends "member"
        ? UseFormRegister<RegisterMemberForm>
        : UseFormRegister<RegisterGymOwnerForm>;

    //atribuindo o tipo typedregister a função
    const typedRegister = register as TypedRegister;

    //mesma lógica para a função errors
    type TypedErrors = StepProps["formType"] extends "member"
        ? FieldErrors<RegisterMemberForm>
        : FieldErrors<RegisterGymOwnerForm>;

    const typedErrors = errors as TypedErrors;

    return (
        <>
            <div>
                <Label htmlFor='gymName'>Nome da academia</Label>
                <Input
                    disabled={loading}
                    key={6}
                    placeholder='Example Fitness'
                    id='gymName'
                    type='text'
                    className='mt-2'
                    {...typedRegister("gymName", {
                        required: "Preencha este campo.",
                        minLength: {
                            value: 2,
                            message: "O nome não pode ser tão curto.",
                        },
                        maxLength: {
                            value: 30,
                            message: "O nome não pode ser tão longo.",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ ]*$/,
                            message: "O nome não pode conter caracteres especiais.",
                        },
                    })}
                ></Input>
                <p className='text-xs text-muted-foreground mt-2'>
                    Esta é a academia que você administra.
                </p>
                {typedErrors.gymName && (
                    <p className='text-xs text-destructive mt-2'>{typedErrors.gymName.message}</p>
                )}
            </div>

            <div className='mt-2'>
                <Label htmlFor='gymAddress'>Endereço da academia</Label>
                <Input
                    disabled={loading}
                    key={7}
                    placeholder='Av. Paulista, 735'
                    id='gymAddress'
                    type='text'
                    className='mt-2'
                    {...typedRegister("gymAddress", {
                        required: "Preencha este campo.",
                        minLength: {
                            value: 2,
                            message: "O endereço não pode ser tão curto.",
                        },
                        maxLength: {
                            value: 30,
                            message: "O nome não pode ser tão longo.",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9äëiöüÄËÏÖÜáéíóúÁÉÍÓÚãõñÃÕÑâêîôûÂÊÎÔÛ#°, ]*$/,
                            message: "O nome não pode conter caracteres especiais.",
                        },
                    })}
                ></Input>
                {typedErrors.gymAddress && (
                    <p className='text-xs text-destructive mt-2'>
                        {typedErrors.gymAddress.message}
                    </p>
                )}
            </div>
        </>
    );
}
