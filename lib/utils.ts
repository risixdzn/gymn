import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
