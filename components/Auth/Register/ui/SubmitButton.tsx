import { Loader2 } from "lucide-react";
import Check from "./Check";

type ButtonProps = {
    text: string;
    loading: boolean;
    signUpSuccess: boolean;
    className: string;
    type: "button" | "submit";
    disabled: boolean;
};

export default function SubmitButton({
    text,
    loading,
    signUpSuccess,
    className,
    disabled,
    type,
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${className}  inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 h-10 transition-all
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
                <span>{text}</span>
            )}
        </button>
    );
}
