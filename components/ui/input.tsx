import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
//this omits the type from the password input, which will be infered by the password_visible button
export interface PasswordInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [passwordVisibility, setPasswordVisibility] = React.useState(false);
        return (
            <span className={cn("relative")}>
                <input
                    type={passwordVisibility ? "text" : "password"}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {passwordVisibility ? (
                    <EyeOff
                        className='absolute right-0 mr-3 w-5 h-5 -translate-y-[calc((2.5rem/2)+(1.25rem/2))] text-muted-foreground hover:cursor-pointer'
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                    />
                ) : (
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Eye
                                    className='absolute right-0 mr-3 w-5 h-5 -translate-y-[calc((2.5rem/2)+(1.25rem/2))] text-muted-foreground hover:cursor-pointer'
                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                />
                            </TooltipTrigger>
                            <TooltipContent className='flex items-center'>
                                <Info className='w-4 h-4 text-muted-foreground inline-block mr-1' />
                                Clique para ver a senha digitada.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </span>
        );
    }
);
PasswordInput.displayName = "Password Input";

export { Input, PasswordInput };
