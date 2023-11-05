import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Workouts() {
    return (
        <div>
            <h1>Treinos</h1>
            <p>Gerencie, crie e edite suas rotinas de treinos.</p>
            <Link href='/dashboard/workouts/new'>
                <Button>Novo treino</Button>
            </Link>
        </div>
    );
}
