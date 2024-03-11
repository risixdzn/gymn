import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { type RegisterMemberForm } from "../RegisterMemberForm";
import { type RegisterGymOwnerForm } from "../RegisterGymOwnerForm";
import { PasswordInput } from "@/components/ui/input";

// usando discriminated unions para atribuir tipos condicionais
// veja mais em: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions
type StepProps = {} & (
    | {
          formType: "member";
          register: UseFormRegister<RegisterMemberForm>;
          errors: FieldErrors<RegisterMemberForm>;
          watch: UseFormWatch<RegisterMemberForm>;
          loading: boolean;
      }
    | {
          formType: "gymOwner";
          register: UseFormRegister<RegisterGymOwnerForm>;
          errors: FieldErrors<RegisterGymOwnerForm>;
          watch: UseFormWatch<RegisterGymOwnerForm>;
          loading: boolean;
      }
);

export default function RegisterStep3({ register, errors, watch, loading }: StepProps) {
    //definindo o tipo da função register
    //em um operador ternario que verifica se a
    //propriedade formtype = "member" utilizando extends
    type TypedRegister = StepProps["formType"] extends "member"
        ? UseFormRegister<RegisterMemberForm>
        : UseFormRegister<RegisterGymOwnerForm>;

    //atribuindo o tipo typedregister a função
    const typedRegister = register as TypedRegister;

    //mesma logica para a função watch
    type TypedWatch = StepProps["formType"] extends "member"
        ? UseFormWatch<RegisterMemberForm>
        : UseFormWatch<RegisterGymOwnerForm>;

    const typedWatch = watch as TypedWatch;

    return (
        <>
            <div>
                <Label htmlFor='password'>Senha</Label>
                <TooltipProvider delayDuration={0}>
                    <Tooltip defaultOpen>
                        <TooltipTrigger asChild>
                            <PasswordInput
                                disabled={loading}
                                key={4}
                                placeholder='••••••••'
                                id='password'
                                className='mt-2'
                                {...typedRegister("password", {
                                    required: "Preencha este campo.",
                                    minLength: {
                                        value: 6,
                                        message: "A senha deve conter 6 ou mais caracteres.",
                                    },
                                    maxLength: {
                                        value: 40,
                                        message: "A senha deve ser menor.",
                                    },
                                    validate: {
                                        lowerCase: (value: string) =>
                                            /^(?=.*[a-z])/.test(value) ||
                                            "A senha deve conter uma letra minúscula.",
                                        upperCase: (value: string) =>
                                            /^(?=.*[A-Z])/.test(value) ||
                                            "A senha deve conter uma letra maiúscula.",
                                        number: (value: string) =>
                                            /^(?=.*[0-9])/.test(value) ||
                                            "A senha deve conter um número.",
                                    },
                                })}
                            ></PasswordInput>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <h4>Sua senha deve conter, ao menos:</h4>
                            <ul className='text-xs text-muted-foreground list-disc'>
                                <li className='list-inside'>Uma letra minúscula</li>
                                <li className='list-inside'>Uma letra maiúscula</li>
                                <li className='list-inside'>Um número</li>
                            </ul>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {errors.password && (
                    <p className='text-xs text-destructive mt-2'>{errors.password.message}</p>
                )}
            </div>

            <div className='mt-2'>
                <Label htmlFor='confirmPassword'>Confirme a senha</Label>
                <PasswordInput
                    disabled={loading}
                    key={5}
                    placeholder='••••••••'
                    id='confirmPassword'
                    className='mt-2'
                    {...typedRegister("confirmPassword", {
                        required: "Preencha este campo.",
                        validate: (value: string) => {
                            if (typedWatch("password") != value) {
                                return "As senhas não sao idênticas.";
                            }
                        },
                    })}
                ></PasswordInput>
                {errors.confirmPassword && (
                    <p className='text-xs text-destructive mt-2'>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
        </>
    );
}
