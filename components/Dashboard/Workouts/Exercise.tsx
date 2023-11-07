import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Info, MoreVertical, Plus } from "lucide-react";

const ExerciseInfo = () => {
    return (
        <>
            <DialogTitle>Título do exercício</DialogTitle>
            <DialogDescription className='-mt-2'>
                <span className='flex gap-2 max-w-screen flex-wrap'>
                    <Badge className='rounded-md'>Abdominais</Badge>
                    <Badge className='rounded-md'>Abdominais</Badge>
                    <Badge className='rounded-md'>Abdominais</Badge>
                    <Badge className='rounded-md'>Abdominais</Badge>
                </span>
            </DialogDescription>
            <hr></hr>
            <h3 className='font-semibold'>Execução</h3>
            <p className='text-muted-foreground text-xs'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam minima consequuntur
                beatae autem fugit officia cumque ducimus hic nemo veniam eum impedit dolorum,
                explicabo eaque mollitia illo in maiores laboriosam?
            </p>
            <span className='w-full relative h-4'>
                <Badge variant={"Iniciante"} className='absolute rounded-md right-0'>
                    Iniciante
                </Badge>
            </span>
        </>
    );
};

export default function ExerciseDisplay() {
    return (
        <div className='w-full h-auto rounded-md'>
            <div id='header' className='w-full h-auto flex justify-between items-center'>
                <div id='exercisename' className='flex items-center'>
                    <div
                        id='exerciseicon'
                        className='w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-accent inline-block'
                    ></div>
                    <div
                        id='exerciseinfo'
                        className='ml-4 text-sm lg:text-base lg:font-medium inline-block'
                    >
                        <h2>Remada curvada</h2>
                        <Dialog>
                            <DialogTrigger>
                                <Info className='scale-50 text-muted-foreground inline-block -ml-1' />
                                <span className='text-xs text-muted-foreground hover:underline'>
                                    Detalhes
                                </span>
                            </DialogTrigger>
                            <DialogContent>
                                <ExerciseInfo />
                            </DialogContent>
                        </Dialog>
                    </div>
                    {/* More info */}
                </div>
                <div id='options' className='flex items-center'>
                    <Badge
                        variant={"Iniciante"}
                        className='mr-4 rounded-md block lg:hidden xl:block'
                    >
                        Iniciante
                    </Badge>
                    <Button size={"icon"} variant={"ghost"}>
                        <MoreVertical className='' />
                    </Button>
                </div>
            </div>
            <table className='w-full mt-4'>
                <thead>
                    <tr className='text-left text-muted-foreground text-xs uppercase'>
                        <th className='p-1 '>Série</th>
                        <th className='p-1'>Carga</th>
                        <th className='p-1'>Repetições</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-sm text-left odd:bg-transparent dark:even:bg-accent/20 even:bg-accent/60'>
                        <th className='p-3 '>1</th>
                        <th className='p-3'>-</th>
                        <th className='p-3'>-</th>
                    </tr>
                    <tr className='text-sm text-left odd:bg-transparent dark:even:bg-accent/20 even:bg-accent/60'>
                        <th className='p-3 '>2</th>
                        <th className='p-3'>-</th>
                        <th className='p-3'>-</th>
                    </tr>
                    <tr className='text-sm text-left odd:bg-transparent dark:even:bg-accent/20 even:bg-accent/60'>
                        <th className='p-3 '>3 </th>
                        <th className='p-3'>-</th>
                        <th className='p-3'>-</th>
                    </tr>
                </tbody>
            </table>
            <Button variant={"secondary"} className='w-full'>
                <Plus className='scale-75' />
                Adicionar série
            </Button>
        </div>
    );
}
