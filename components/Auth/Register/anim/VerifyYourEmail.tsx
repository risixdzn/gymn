import { Button } from "@/components/ui/button";
import { MailCheck, ShieldCheck } from "lucide-react";

type Props = {
    values: {
        email: string;
        username: string;
    };
};

export default function VerifyYourEmail({ values }: Props) {
    return (
        <div className='flex flex-col'>
            <div className='w-full h-32 bg-purple-600/20 flex items-center justify-center rounded-lg'>
                <MailCheck className='text-purple-600 inline-block' width={60} height={60} />
            </div>
            <div className='mt-3 mb-3'>
                <h3 className='text-2xl flex gap-2 items-center font-semibold leading-none tracking-tight'>
                    <div className='w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center'>
                        <ShieldCheck className='text-card inline-block' width={20} height={20} />
                    </div>
                    Verifique a sua conta
                </h3>
                <p className='text-muted-foreground text-sm mt-2'>
                    Parabéns,
                    <b className='text-white'> {values.username}</b>! A sua conta foi criada com
                    sucesso.
                </p>
                <p className='text-muted-foreground text-sm'>
                    Um link de verificação foi enviado para
                    <b className='text-white'> {values.email} </b>
                </p>
                <Button type='button' className='bg-purple-600 mt-3 w-full text-white'>
                    Continuar
                </Button>
            </div>
        </div>
    );
}
