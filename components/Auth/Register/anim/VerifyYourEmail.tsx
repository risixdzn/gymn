import { Button } from "@/components/ui/button";
import { MailCheck, ShieldCheck } from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthCardContext, AuthCardContextType } from "../../AuthCard";

type Props = {
    values: {
        email: string;
        username: string;
    };
    setSignUpSuccess: Dispatch<SetStateAction<boolean>>;
};

export default function VerifyYourEmail({ values, setSignUpSuccess }: Props) {
    const { setAuthState } = useContext<AuthCardContextType>(AuthCardContext);
    return (
        <div className='flex flex-col'>
            <div className='w-full h-32 bg-purple-600/20 flex items-center justify-center rounded-lg'>
                <MailCheck className='text-purple-600 inline-block' width={60} height={60} />
            </div>
            <div className='mt-3'>
                <h3 className='text-2xl flex gap-2 items-center font-semibold leading-none tracking-tight'>
                    <div className='w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center'>
                        <ShieldCheck className='text-card inline-block' width={20} height={20} />
                    </div>
                    Verifique a sua conta
                </h3>
                <p className='text-muted-foreground text-sm mt-2'>
                    Para verificar, entre no link enviado para:
                    <b className='text-card-foreground'> {values.email}</b>.
                </p>
                <Button
                    type='button'
                    className='bg-purple-600 hover:bg-purple-600/70 mt-3 w-full text-white'
                    onClick={() => {
                        setSignUpSuccess(false);
                        setAuthState("login");
                    }}
                >
                    Verifiquei minha conta
                </Button>
            </div>
        </div>
    );
}
