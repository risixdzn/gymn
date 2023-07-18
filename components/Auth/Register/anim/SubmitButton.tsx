import { Loader2 } from "lucide-react";
import Check from "./Check";

type ButtonProps = {
    text: string;
    loading: boolean;
    signUpSuccess: boolean;
};

export default function SubmitButton({ text, loading, signUpSuccess }: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 transition-all
        px-4 py-2  mt-5
        ${
            signUpSuccess
                ? "bg-g_purple hover:bg-g_purple text-white w-full"
                : "bg-primary hover:bg-primary/90 text-primary-foreground w-full"
        }`}
        >
            {loading ? (
                <Loader2 className='block h-5 w-5 animate-spin' />
            ) : signUpSuccess ? (
                <Check className='absolute' />
            ) : (
                <>{text}</>
            )}
        </button>
    );
}
