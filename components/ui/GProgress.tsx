type ProgressProps = {
    steps: 3 | 4 | 5 | 6 | 7,
    currentStep: number
}

export default function GProgress({ steps, currentStep}: ProgressProps){
    function stepsElements(): JSX.Element[] {
        const stepsArray = Array.from({length: steps}, (_,index) => index);
        return stepsArray.map((_,index) => {
            return index === currentStep - 1?
            (
                <div>
                    <div 
                        key={index} 
                        className={`w-5 h-5 ${index > currentStep - 1 ? 'bg-zinc-700': 'bg-purple-600'} drop-shadow-lg rounded-full absolute`}
                    ></div>
                    <div                         
                        className={`w-5 h-5 ${index > currentStep - 1 ? 'bg-zinc-700': 'bg-purple-600'} drop-shadow-lg rounded-full animate-ping`}
                    ></div>
                </div>
            ):
            (
                <div 
                    key={index} 
                    className={`w-5 h-5 ${index > currentStep - 1 ? 'bg-zinc-700': 'bg-purple-600'} drop-shadow-lg rounded-full`}
                ></div>
            )
        })  
    }

    const renderSteps = () =>{
        return stepsElements()
    }
    
    function currentProgress(){
        if(currentStep > steps){
            throw new Error("The 'currentStep' value needs to be lower or equal to the number of steps.")
        }
        const stepWidth = 100 / (steps - 1)
        const currentWidth = Math.floor((currentStep - 1) * stepWidth)
        return currentWidth
    }

    const renderProgress = () => {
        return currentProgress();
    }
    
    return(
        <>
            <div className={`w-[100%] h-2 bg-zinc-800 mt-10 relative flex items-center rounded-full`}>
                <div className="w-[100%] h-2 absolute flex items-center justify-between">
                    {renderSteps()}
                </div>
                <div 
                    className={`h-2 bg-purple-600 rounded-full transition-all duration-500`}
                    style={{ width: `${renderProgress()}%` }}
                ></div>
            </div>  
        </>        
    )
}