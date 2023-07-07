"use client";

import { useState } from "react";
import RegisterGymOwnerForm from "./RegisterGymOwnerForm";
import RegisterMemberForm from "./RegisterMemberForm";
import { Button } from "@/components/ui/button";

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
                        className={`w-full mt-4 bg-neutral-900 py-5 px-7 flex gap-7 rounded-lg border-[3px] transition-colors ${
                            accountType == "member" ? "border-purple-600" : "border-neutral-900"
                        }`}
                    >
                        <input
                            type='radio'
                            value='member'
                            id='member'
                            checked={accountType === "member"}
                            onChange={() => setAccountType("member")}
                        />
                        <div>
                            <label htmlFor='gymOwner' className='font-semibold tracking-tight'>
                                Membro
                            </label>
                            <p className='max-w-[15rem] text-xs lg:text-sm text-muted-foreground'>
                                Se você treina em uma academia e quer manter controle sobre seus
                                treinos, selecione esta opção.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`w-full mt-4 bg-neutral-900 py-5 px-7 flex gap-7 rounded-lg border-[3px] transition-color ${
                            accountType == "gymOwner" ? "border-purple-600" : "border-neutral-900"
                        }`}
                    >
                        <input
                            type='radio'
                            value='gymOwner'
                            id='gymOwner'
                            checked={accountType === "gymOwner"}
                            onChange={() => setAccountType("gymOwner")}
                        />
                        <div>
                            <label htmlFor='gymOwner' className='font-semibold tracking-tight'>
                                Dono de academia
                            </label>
                            <p className='max-w-[15rem] text-xs lg:text-sm text-muted-foreground'>
                                Se você ja possui uma academia ou está criando uma, esta é a sua
                                opção.
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
