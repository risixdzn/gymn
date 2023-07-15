"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import RegisterStep1 from "./Steps/RegisterStep1";
import RegisterStep2 from "./Steps/RegisterStep2";
import RegisterStep3 from "./Steps/RegisterStep3";
import RegisterStep4 from "./Steps/RegisterStep4";
import { GymOwnerSignUp } from "@/lib/auth/signUp";

export type RegisterGymOwnerForm = {
    firstName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gymName: string;
    gymAddress: string;
};

type RegisterMemberFormProps = {
    setShowForm: Dispatch<SetStateAction<boolean>>;
};

type ComponentsMap = {
    [key: number]: JSX.Element;
};

export default function RegisterGymOwnerForm({ setShowForm }: RegisterMemberFormProps) {
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<RegisterGymOwnerForm>({
        mode: "all",
        defaultValues: {
            firstName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            gymName: "",
            gymAddress: "",
        },
    });

    const submitData = (userData: RegisterGymOwnerForm) => {
        GymOwnerSignUp({ userData, setLoading });
        console.log("This is the user data", userData);
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
            1: <RegisterStep1 formType='gymOwner' register={register} errors={errors} />,
            2: <RegisterStep2 formType='gymOwner' register={register} errors={errors} />,
            3: (
                <RegisterStep3
                    formType='gymOwner'
                    register={register}
                    errors={errors}
                    watch={watch}
                />
            ),
            4: <RegisterStep4 formType='gymOwner' register={register} errors={errors} />,
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
            4: (
                <Button className='w-full mt-5' type='submit' disabled={!isValid || loading}>
                    <Loader2
                        className={`${loading ? "block" : "hidden"} mr-2 h-4 w-4 animate-spin`}
                    />
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
                type='button'
                onClick={handleGoBack}
            >
                <ChevronLeft className='inline-block scale-75' />
                Etapa {step} de 4
            </button>
            {renderForm()}
            {renderButton()}
        </form>
    );
}
