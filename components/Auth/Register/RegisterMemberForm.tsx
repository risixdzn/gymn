"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowUp, ChevronLeft } from "lucide-react";
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

type ComponentsMap = {
    [key: number]: JSX.Element;
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
        const formComponents: ComponentsMap = {
            1: <RegisterStep1 formType='member' register={register} errors={errors} />,
            2: <RegisterStep2 formType='member' register={register} errors={errors} />,
            3: (
                <RegisterStep3
                    formType='member'
                    register={register}
                    errors={errors}
                    watch={watch}
                />
            ),
        };
        return formComponents[step];
    };

    const renderButton = () => {
        const buttonComponents: ComponentsMap = {
            1: (
                <Button
                    className='w-full mt-5'
                    type='button'
                    onClick={() => setStep(step + 1)}
                    disabled={!isValid}
                >
                    Próximo
                </Button>
            ),
            3: (
                <Button className='w-full mt-5' type='submit' disabled={!isValid}>
                    Cadastrar
                </Button>
            ),
        };

        return buttonComponents[step] || buttonComponents[1];
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
