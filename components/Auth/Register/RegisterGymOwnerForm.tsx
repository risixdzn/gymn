"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import RegisterStep1 from "./Steps/RegisterStep1";
import RegisterStep2 from "./Steps/RegisterStep2";
import RegisterStep3 from "./Steps/RegisterStep3";
import RegisterStep4 from "./Steps/RegisterStep4";
import { GymOwnerSignUp } from "@/lib/auth/signUp";
import VerifyYourEmail from "./ui/VerifyYourEmail";
import SubmitButton from "./ui/SubmitButton";
import { AuthState } from "../AuthCard";

export type RegisterGymOwnerForm = {
    displayName: string;
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
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors, isValid },
    } = useForm<RegisterGymOwnerForm>({
        mode: "all",
        defaultValues: {
            displayName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            gymName: "",
            gymAddress: "",
        },
    });

    const values = getValues();

    const submitData = (userData: RegisterGymOwnerForm) => {
        GymOwnerSignUp({ userData, setLoading, setSignUpSuccess });
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
            1: (
                <RegisterStep1
                    formType='gymOwner'
                    register={register}
                    errors={errors}
                    loading={loading}
                />
            ),
            2: (
                <RegisterStep2
                    formType='gymOwner'
                    register={register}
                    errors={errors}
                    loading={loading}
                />
            ),
            3: (
                <RegisterStep3
                    formType='gymOwner'
                    register={register}
                    errors={errors}
                    watch={watch}
                    loading={loading}
                />
            ),
            4: (
                <RegisterStep4
                    formType='gymOwner'
                    register={register}
                    errors={errors}
                    loading={loading}
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
            4: (
                <SubmitButton
                    type='submit'
                    className='mt-5'
                    disabled={!isValid}
                    loading={loading}
                    text={"Cadastrar-se"}
                    signUpSuccess={signUpSuccess}
                />
            ),
        };

        return buttonComponents[step] || buttonComponents[1];
    };

    return (
        <form className='-mt-4 relative w-full' onSubmit={handleSubmit(submitData)} noValidate>
            <div
                className={`absolute w-full h-full ${
                    signUpSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-all delay-2000 flex flex-row z-10 bg-card`}
            >
                <VerifyYourEmail values={values} setSignUpSuccess={setSignUpSuccess} />
            </div>
            <div
                className={`${
                    signUpSuccess ? "opacity-0" : "opacity-100"
                } transition-all delay-2000`}
            >
                <button
                    className='mb-1 text-xs text-muted-foreground -ml-1 flex items-center'
                    onClick={handleGoBack}
                    type='button'
                >
                    <ChevronLeft className='inline-block scale-75' />
                    Etapa {step} de 4
                </button>
                {renderForm()}
                {renderButton()}
            </div>
        </form>
    );
}
