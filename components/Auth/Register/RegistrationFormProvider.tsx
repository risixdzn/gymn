"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import RegisterGymOwnerForm from "./RegisterGymOwnerForm";
import RegisterMemberForm from "./RegisterMemberForm";
import { Button } from "@/components/ui/button";
import { Balancer } from "react-wrap-balancer";

import BenchPress from "@/components/ui/Icons/BenchPress";
import WeightLift from "@/components/ui/Icons/WeightLift";
import { AuthState } from "../AuthCard";

type AccountTypes = "member" | "gymOwner" | "";

export default function RegistrationFormProvider() {
    const [accountType, setAccountType] = useState<AccountTypes>("");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [displayError, setDisplayError] = useState<string>("");

    const handleRadioSubmit = () => {
        if (accountType == "gymOwner" || accountType == "member") {
            setShowForm(true);
        } else setDisplayError("Selecione uma das opções.");
    };

    return (
        <>
            {!showForm && (
                <>
                    <h3 className='text-xl font-semibold leading-none tracking-tight'>
                        Tipo de conta:
                    </h3>
                    <div
                        onClick={() => setAccountType("member")}
                        className={` min-h-[7rem] items-center relative select-none w-full mt-4 bg-background py-5 px-7 flex gap-7 rounded-lg border-[3px] cursor-pointer transition-colors ${
                            accountType == "member"
                                ? "border-purple-600 bg-purple-600/10"
                                : "border-border bg-background"
                        }`}
                    >
                        <input
                            key={1}
                            type='radio'
                            value='member'
                            id='member'
                            className='absolute top-5 right-5'
                            checked={accountType === "member"}
                            onChange={() => setAccountType("member")}
                        />
                        <WeightLift
                            className='w-[70px]'
                            color={accountType == "member" ? "#9333ea" : "hsl(217, 0%, 18%)"}
                        />
                        <div>
                            <h3 className='font-semibold tracking-tight'>Membro</h3>
                            <p className='max-w-[15rem] text-xs lg:text-sm text-muted-foreground'>
                                <Balancer>Acompanhe seus treinos de forma eficiente.</Balancer>
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => setAccountType("gymOwner")}
                        className={`min-h-[7rem] items-center relative select-none w-full mt-4 py-5 px-7 flex gap-7 rounded-lg border-[3px] transition-colors cursor-pointer ${
                            accountType == "gymOwner"
                                ? "border-purple-600 bg-purple-600/10"
                                : "border-border bg-background"
                        }`}
                    >
                        <BenchPress
                            className='w-[70px]'
                            color={accountType == "gymOwner" ? "#9333ea" : "hsl(217, 0%, 18%)"}
                        />
                        <input
                            key={2}
                            type='radio'
                            value='gymOwner'
                            id='gymOwner'
                            className='absolute top-5 right-5'
                            checked={accountType === "gymOwner"}
                            onChange={() => setAccountType("gymOwner")}
                        />
                        <div>
                            <h3 className='font-semibold tracking-tight'>Dono de academia</h3>
                            <p className='max-w-[15rem] text-xs lg:text-sm text-muted-foreground'>
                                <Balancer>
                                    Gerencie seus alunos e seus treinos com facilidade.
                                </Balancer>
                            </p>
                        </div>
                    </div>
                    <p className='text-xs text-destructive mt-2'>{displayError}</p>
                    <Button className='w-full mt-2' onClick={handleRadioSubmit}>
                        Continuar
                    </Button>
                </>
            )}
            {showForm && accountType === "gymOwner" && (
                <RegisterGymOwnerForm setShowForm={setShowForm} />
            )}
            {showForm && accountType === "member" && (
                <RegisterMemberForm setShowForm={setShowForm} />
            )}
        </>
    );
}
