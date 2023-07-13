import { useToast } from "@/components/ui/use-toast";

type ToastProps = {
    description: string;
    title?: string;
};

export function useCustomToast() {
    const { toast } = useToast();

    function customToast({ description, title }: ToastProps) {
        toast({
            title: title,
            description: description,
        });
    }

    return { customToast };
}
