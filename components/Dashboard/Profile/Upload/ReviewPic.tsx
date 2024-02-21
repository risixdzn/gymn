import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";
import { Button } from "@/components/ui/button";

interface ReviewPicProps {
    files: File[];
    user: UserProfile | null;
    uploadingTo: "avatars" | "banners";
}

export function ReviewPic({ files, user, uploadingTo }: ReviewPicProps) {
    return (
        <>
            <div className='relative p-4 border-border border-[1px] rounded-lg bg-gradient-to-b from-transparent to-border/20'>
                <div id='banner' className='w-full h-32 bg-accent rounded-t-2xl'>
                    {/* if uploading to banners, show uploading banner, else show user current banner */}
                    {uploadingTo == "banners"
                        ? files.map((file: any, index: number) => (
                              <Image
                                  width={1500}
                                  height={700}
                                  src={file.url}
                                  alt=''
                                  key={index}
                                  className='w-full h-full object-cover rounded-t-2xl'
                              />
                          ))
                        : user && (
                              <Image
                                  width={1500}
                                  height={700}
                                  src={`/api/users/${user.username}/banner`}
                                  alt=''
                                  key={1}
                                  className='w-full h-full object-cover rounded-t-2xl'
                              />
                          )}
                </div>
                <div
                    id='pfp'
                    className='z-[1] absolute w-28 h-28 rounded-full bg-card 
                -translate-y-[50%] ml-0 border-background border-[5px] overflow-hidden object-cover'
                >
                    {/* if uploading to avatars, show uploading avatar, else show user current avatar */}
                    {uploadingTo == "avatars"
                        ? files.map((file: any, index: number) => (
                              <Image
                                  width={300}
                                  height={300}
                                  src={file.url}
                                  alt=''
                                  key={index}
                                  className='w-full h-full object-cover'
                              />
                          ))
                        : user && (
                              <Image
                                  width={300}
                                  height={300}
                                  src={`/api/users/${user.username}/avatar`}
                                  alt=''
                                  key={1}
                                  className='w-full h-full object-cover'
                              />
                          )}
                </div>
                <div
                    id='actions'
                    className='absolute w-[calc(100%-1rem*2)] mt-3 lg:mt-7 h-10 flex gap-2 justify-end'
                >
                    <Button variant={"outline"}>Editar perfil</Button>
                    <Button size={"icon"} variant={"outline"}>
                        <LogOut className='scale-75' />
                    </Button>
                </div>
                <div id='topinfo' className='w-full h-auto flex flex-col pl-2 mt-12 py-5  gap-1'>
                    <h1 className='text-2xl tracking-tight font-semibold flex items-center'>
                        {user?.display_name}
                        <span className='text-muted-foreground inline-block pl-2 text-sm'>
                            {"@" + user?.username}
                        </span>
                    </h1>
                    <span>
                        <Badge className='w-auto'>
                            {user?.profile == "Member" ? "Membro" : "Dono de .academia."}
                        </Badge>
                    </span>
                </div>
            </div>
        </>
    );
}
