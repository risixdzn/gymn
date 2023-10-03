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
import { ChevronsUpDown, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
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

export default function AddExercise() {
    const { screenWidth } = useGetScreenWidth();

    const formSchema = z.object({
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
                                        <Collapsible className='w-full py-[0.125rem] border-[1px] border-border rounded-md pl-3 pr-[0.125rem] cursor-pointer'>
                                            <CollapsibleTrigger asChild>
                                                <div className='space-y-0'>
                                                    <div className='flex items-center justify-between space-x-4'>
                                                        <h4 className='text-sm '>
                                                            {field.value.length > 0
                                                                ? "Músculos selecionados"
                                                                : "Selecionar músculo"}
                                                        </h4>
                                                        <Button
                                                            variant='ghost'
                                                            type='button'
                                                            size='sm'
                                                            className='w-9 p-0'
                                                        >
                                                            <ChevronsUpDown className='h-4 w-4 text-muted-foreground' />
                                                            <span className='sr-only'>Toggle</span>
                                                        </Button>
                                                    </div>

                                                    {field.value.length > 0 && (
                                                        <div className='flex gap-1 flex-wrap pb-2'>
                                                            {field.value.map((value) => (
                                                                <Badge
                                                                    key={value}
                                                                    className='rounded-sm'
                                                                    variant={"secondary"}
                                                                >
                                                                    {value}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className='space-y-2'>
                                                <div className='pt-1 pb-4 flex flex-col gap-2 mx-2'>
                                                    {musclesWithLabels.map((muscle) => (
                                                        <FormField
                                                            key={muscle.id}
                                                            control={form.control}
                                                            name='muscles'
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={muscle.id}
                                                                        className='flex flex-row items-start space-x-3 space-y-0'
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(
                                                                                    muscle.id
                                                                                )}
                                                                                onCheckedChange={(
                                                                                    checked
                                                                                ) => {
                                                                                    let updatedMuscles =
                                                                                        Array.isArray(
                                                                                            field.value
                                                                                        )
                                                                                            ? [
                                                                                                  ...field.value,
                                                                                              ]
                                                                                            : [];
                                                                                    if (checked) {
                                                                                        updatedMuscles.push(
                                                                                            muscle.id
                                                                                        );
                                                                                    } else {
                                                                                        updatedMuscles =
                                                                                            updatedMuscles.filter(
                                                                                                (
                                                                                                    value
                                                                                                ) =>
                                                                                                    value !==
                                                                                                    muscle.id
                                                                                            );
                                                                                    }
                                                                                    field.onChange(
                                                                                        updatedMuscles
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className='font-normal'>
                                                                            {muscle.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
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
