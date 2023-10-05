import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/DrawerOrVaul";
import { Button } from "@/components/ui/button";
import { useGetScreenWidth } from "@/lib/hooks/useGetScreenWidth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronsUpDown, Plus } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { levels, muscles } from "../Filters";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function VaulCheckboxSelect({
    field,
    options,
    form,
}: {
    field: any;
    options: {
        id: string;
        label: string;
    }[];
    form: UseFormReturn<
        {
            name: string;
            muscles: string[];
            equipment: string[];
            level: string;
            description: string;
        },
        any,
        undefined
    >;
}) {
    const { screenWidth } = useGetScreenWidth();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Drawer screenWidth={screenWidth} open={open} onOpenChange={setOpen}>
                <DrawerTrigger screenWidth={screenWidth} asChild>
                    <button className='relative w-full px-3 py-2 text-sm rounded-md border-border border-[1px] text-left text-muted-foreground'>
                        {field.value.length == 0 && "Selecionar músculo"}
                        <a className='absolute right-0 mr-2'>
                            <ChevronDown className='scale-75 text-muted-foreground' />
                        </a>
                        {field.value.length > 0 && (
                            <div className='flex gap-1 flex-wrap'>
                                {field.value.map((value: string) => (
                                    <Badge key={value} className='rounded-sm' variant={"secondary"}>
                                        {value}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </button>
                </DrawerTrigger>
                <DrawerContent screenWidth={screenWidth} scrollable>
                    <DrawerTitle screenWidth={screenWidth}>Selecionar músculos</DrawerTitle>
                    <DrawerDescription screenWidth={screenWidth}>
                        Selecione os músculos alvo do exercício
                        <Button
                            variant={"secondary"}
                            className='mt-2 w-full'
                            onClick={() => setOpen(!open)}
                        >
                            Concluído
                        </Button>
                    </DrawerDescription>
                    <div className='mt-2'>
                        {options.map((option) => (
                            <FormField
                                key={option.id}
                                control={form.control}
                                name='muscles'
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={option.id}
                                            className={
                                                "py-4 border-b-[1px] border-border w-full px-4 flex items-center gap-4 hover:bg-accent/50 shadow-md justify-between"
                                            }
                                            onClick={() => {
                                                const isChecked = field.value?.includes(option.id);
                                                let updatedOptions = Array.isArray(field.value)
                                                    ? [...field.value]
                                                    : [];
                                                if (isChecked) {
                                                    updatedOptions = updatedOptions.filter(
                                                        (value) => value !== option.id
                                                    );
                                                } else {
                                                    updatedOptions.push(option.id);
                                                }
                                                field.onChange(updatedOptions);
                                            }}
                                        >
                                            <FormLabel className='font-normal flex items-center gap-4'>
                                                <div className='w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-md '></div>
                                                {option.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    className='-translate-y-1 scale-125'
                                                    checked={field.value?.includes(option.id)}
                                                    onCheckedChange={(checked) => {
                                                        let updatedOptions = Array.isArray(
                                                            field.value
                                                        )
                                                            ? [...field.value]
                                                            : [];
                                                        if (checked) {
                                                            updatedOptions.push(option.id);
                                                        } else {
                                                            updatedOptions = updatedOptions.filter(
                                                                (value) => value !== option.id
                                                            );
                                                        }
                                                        field.onChange(updatedOptions);
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export const formSchema = z.object({
    name: z.string().min(4, "O nome deve ser maior").max(40, "O nome deve ser menor"),
    muscles: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Você deve selecionar pelo menos um músculo.",
    }),
    equipment: z.array(z.string()),
    level: z.string(),
    description: z
        .string()
        .min(20, "A descrição deve ser maior")
        .max(350, "A descrição deve ser menor"),
});

export default function AddExercise() {
    const { screenWidth } = useGetScreenWidth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            equipment: [],
            level: "",
            muscles: [],
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const musclesWithLabels = muscles.map((muscle) => ({ id: muscle, label: muscle }));

    return (
        <Drawer screenWidth={screenWidth}>
            <DrawerTrigger screenWidth={screenWidth}>
                {/* Add button triggering drawer */}
                <Button>
                    <Plus className='scale-75' /> Adicionar
                </Button>
            </DrawerTrigger>
            <DrawerContent screenWidth={screenWidth} scrollable={true}>
                <DrawerTitle screenWidth={screenWidth}> Adicionar exercício</DrawerTitle>
                <DrawerDescription screenWidth={screenWidth}>
                    Preencha os campos para adicionar um novo exercício
                </DrawerDescription>
                <div className='mt-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Supino declinado' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este será o nome do exercício.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='muscles'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Músculos</FormLabel>
                                        <FormDescription className='-mt-2'>
                                            Selecione os musculos alvo do exercício
                                        </FormDescription>
                                        <VaulCheckboxSelect
                                            field={field}
                                            options={musclesWithLabels}
                                            form={form}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <Textarea
                                            placeholder='Para executar o exercício...'
                                            {...field}
                                        />
                                        <FormDescription>
                                            Descrição, breve ou detalhada, de como executar o
                                            exercício.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='level'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dificuldade</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione uma dificuldade' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {levels.map((level) => (
                                                    <SelectItem value={level} key={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Nível de dificuldade do exercício.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
