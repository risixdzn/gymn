"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import RegisterStep1 from "./Steps/RegisterStep1";
import RegisterStep2 from "./Steps/RegisterStep2";
import RegisterStep3 from "./Steps/RegisterStep3";
import { MemberSignUp } from "@/lib/auth/signUp";
import SubmitButton from "./ui/SubmitButton";
import VerifyYourEmail from "./ui/VerifyYourEmail";
import { AuthState } from "../AuthCard";

export type RegisterMemberForm = {
    email: string;
    displayName: string;
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
    const [loading, setLoading] = useState<boolean>(false);
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors, isValid },
    } = useForm<RegisterMemberForm>({
        mode: "all",
        defaultValues: {
            email: "",
            displayName: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const values = getValues();

    const submitData = (userData: RegisterMemberForm) => {
        MemberSignUp({ userData, setLoading, setSignUpSuccess });
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
                    formType='member'
                    register={register}
                    errors={errors}
                    loading={loading}
                />
            ),
            2: (
                <RegisterStep2
                    formType='member'
                    register={register}
                    errors={errors}
                    loading={loading}
                />
            ),
            3: (
                <RegisterStep3
                    formType='member'
                    register={register}
                    errors={errors}
                    watch={watch}
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
            3: (
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
                    Etapa {step} de 3
                </button>
                {renderForm()}
                {renderButton()}
            </div>
        </form>
    );
}
