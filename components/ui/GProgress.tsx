import { ChevronDown } from "lucide-react";

type ProgressProps = {
    className?: string;
    steps: 3 | 4 | 5 | 6 | 7;
    currentStep: number;
    description?: string[];
};

export default function GProgress({ steps, currentStep, description, className }: ProgressProps) {
    function stepsElements(): JSX.Element[] {
        const stepsArray = Array.from({ length: steps }, (_, index) => index);
        if (description && description.length !== steps) {
            throw new Error(
                "The 'description' array must have the same number of elements as the 'steps' value."
            );
        }

        return stepsArray.map((_, index) => {
            return index === currentStep - 1 ? (
                <div className='flex items-center justify-center'>
                    <ChevronDown className='absolute -translate-y-5' />
                    <div
                        key={index}
                        className={`w-5 h-5 ${
                            index > currentStep - 1 ? "bg-zinc-700" : "bg-purple-500"
                        } drop-shadow-lg rounded-full transition-all absolute`}
                    ></div>
                    <div
                        className={`w-5 h-5 ${
                            index > currentStep - 1 ? "bg-zinc-700" : "bg-purple-500"
                        } drop-shadow-lg rounded-full animate-ping`}
                    ></div>
                    {description ? (
                        <p className='text-sm font-semibold text-slate-950 dark:text-zinc-100 absolute mt-10 whitespace-nowrap'>
                            {description[index]}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div className='flex items-center justify-center'>
                    <div
                        key={index}
                        className={`w-4 h-4  ${
                            index > currentStep - 1 ? "bg-zinc-700" : "bg-purple-500"
                        } drop-shadow-lg rounded-full transition-all`}
                    ></div>
                    {description ? (
                        <p className='text-xs text-slate-700 dark:text-zinc-400 absolute mt-10 whitespace-nowrap'>
                            {description[index]}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            );
        });
    }

    const renderSteps = () => {
        return stepsElements();
    };

    function currentProgress() {
        if (currentStep > steps) {
            throw new Error(
                "The 'currentStep' value needs to be lower or equal to the number of steps."
            );
        }
        const stepWidth = 100 / (steps - 1);
        const currentWidth = Math.floor((currentStep - 1) * stepWidth);
        return currentWidth;
    }

    const renderProgress = () => {
        return currentProgress();
    };

    return (
        <>
            <div
                className={`${className} h-2 w-full bg-zinc-800 mt-10 relative flex items-center rounded-full `}
            >
                <div className='w-[100%] h-2 absolute flex items-center justify-between'>
                    {renderSteps()}
                </div>
                <div
                    className={`h-2 bg-purple-600 rounded-full transition-all duration-500`}
                    style={{ width: `${renderProgress()}%` }}
                ></div>
            </div>
        </>
    );
}
