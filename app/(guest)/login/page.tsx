import { Triangle } from "lucide-react"

export default function Login(){   
    return(
        <main className="flex min-h-screen flex-row justify-between relative">            
            <div className="hidden lg:flex items-center justify-center bg-loginBGDark w-[50%] h-screen p-20 bg-no-repeat bg-cover">
                <div className="
                    flex justify-center flex-col lg:px-14 xl:px-20 2xl:px-24 3xl:px-28 
                    mt-[5rem] bg-clip-padding backdrop-filter backdrop-blur-sm border-2 rounded-3xl
                    bg-gray-100 border-gray-300 bg-opacity-20
                    dark:bg-zinc-950 dark:border-zinc-900 dark:bg-opacity-20
                    aspect-square"
                >
                    <h1 className="font-bold tracking-tighter lg:text-4xl xl:text-5xl 2xl:text-7xl ">
                        <Triangle className="inline-block rotate-90"/> Prepare-se <br></br>
                        para <span className="bg-gradient-to-b drop-shadow-xl from-g_purple to-g_darkpurple bg-clip-text text-transparent">superar</span> <br></br>
                        os seus <br></br>
                        <span className="relative">
                            <div className="absolute w-full lg:h-2 2xl:h-3 bg-purple-600 lg:mt-5 2xl:mt-9"></div>
                            <span>limites.</span>
                        </span>
                    </h1>
                    <p className="mt-4 2xl:mt-6 text-sm 2xl:text-lg leading-5 2xl:leading-6">Crie sua conta ou faça login<br></br>
                    para utilizar o <b>Gymn.</b></p>
                </div>
            </div>
            <div className="w-full flex items-center justify-center lg:w-[50%] h-[calc(100vh-5rem)] mt-[5rem]"></div>
        </main>
    )
}