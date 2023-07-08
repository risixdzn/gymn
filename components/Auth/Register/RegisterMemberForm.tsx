"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import RegisterStep1 from "./Steps/RegisterStep1";
import RegisterStep2 from "./Steps/RegisterStep2";
import RegisterStep3 from "./Steps/RegisterStep3";

export type RegisterMemberForm = {
    email: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
};

type RegisterMemberFormProps = {
    setShowForm: Dispatch<SetStateAction<boolean>>;
};

export default function RegisterMemberForm({ setShowForm }: RegisterMemberFormProps) {
    const [step, setStep] = useState<number>(1);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<RegisterMemberForm>({
        mode: "all",
        defaultValues: {
            email: "",
            firstName: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const submitData = (data: RegisterMemberForm) => {
        console.log("This is the user data", data);
    };

    const handleGoBack = () => {
        if (step == 1) {
            setShowForm(false);
        } else {
            setStep(step - 1);
        }
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return <RegisterStep1 formType='member' register={register} errors={errors} />;
                break;
            case 2:
                return <RegisterStep2 formType='member' register={register} errors={errors} />;
                break;
            case 3:
                return (
                    <RegisterStep3
                        formType='member'
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                );
                break;

            default:
                break;
        }
    };

    const renderButton = () => {
        switch (step) {
            case 1:
            case 2:
                return (
                    <>
                        <Button
                            className='w-full mt-5'
                            type='button'
                            onClick={() => setStep(step + 1)}
                            disabled={!isValid}
                        >
                            Próximo
                        </Button>
                    </>
                );
                break;
            case 3:
                return (
                    <>
                        <Button className='w-full mt-5' type='submit' disabled={!isValid}>
                            Cadastrar
                        </Button>
                    </>
                );
                break;
            default:
                break;
        }
    };

    return (
        <form className='-mt-4' onSubmit={handleSubmit(submitData)} noValidate>
            <button
                className='mb-1 text-xs text-muted-foreground -ml-1 flex items-center'
                onClick={handleGoBack}
            >
                <ChevronLeft className='inline-block scale-75' />
                Etapa {step} de 3
            </button>
            {renderForm()}
            {renderButton()}
        </form>
    );
}
