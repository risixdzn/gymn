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

export default function RegisterStep2({ register, errors, loading }: StepProps) {
    //definindo o tipo da função register
    //em um operador ternario que verifica se a
    //propriedade formtype = "member" utilizando extends
    type TypedRegister = StepProps["formType"] extends "member"
        ? UseFormRegister<RegisterMemberForm>
        : UseFormRegister<RegisterGymOwnerForm>;

    //atribuindo o tipo a função
    const typedRegister = register as TypedRegister;

    return (
        <>
            <Label htmlFor='email'>Email</Label>
            <Input
                disabled={loading}
                key={3}
                placeholder='exemplo@email.com'
                id='email'
                type='email'
                className='mt-2'
                {...typedRegister("email", {
                    required: "Preencha este campo.",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Este não é um email valido.",
                    },
                })}
            ></Input>
            {errors.email && (
                <p className='text-xs text-destructive mt-2'>{errors.email.message}</p>
            )}
        </>
    );
}
