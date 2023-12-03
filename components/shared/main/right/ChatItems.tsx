"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useOpenModels } from '@/hooks/OpenModels'
import { cn } from '@/lib/utils'
import React from 'react'

export default function ChatItems({name,image,id,phone,typeMessage,lastMessage,lastseen,SelectedId,StatusMessage,lastMessageSender,currentUserId}:any) {
    const {Selected} = useOpenModels()

    const imageUrl = image ? `http://localhost:8179/imges/${image}` : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";
    const lastSeenDate = new Date(lastseen);

    // Format lastseen time in AM/PM format
    const lastSeenTime = lastSeenDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });


    
  return (
    <>
    <div  className={cn('text-white min-h-[66px]  w-full hover:bg-[#212c33]  group flex items-center justify-start  animate-pulse animate-once animate-duration-1000 animate-delay-1000 animate-ease-in-out',SelectedId===id&&"bg-[#212c33]")}>
      <div className='pl-[10px] pr-[19px] relative flex flex-row items-center justify-start w-full'>
            <div className=' w-[72px]'>
                <Avatar className={"w-[45px] h-[45px] cursor-pointer"}>
                    <AvatarImage src={imageUrl} alt="@shadcn" />
                    <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex flex-col items-start  w-full gap-[1px]'>
                <div className='flex flex-row justify-between w-full mt-[2px]'>
                    <span className='text-[15px] font-[400]'>{name || phone}</span>
                    <small className='text-[10px]  text-gray-400 mt-[3px]'>{lastSeenTime}</small>
                </div>
                <div className='flex flex-row justify-between w-full '>
                    {lastMessage.length > 80 ? (
                      <span className='text-[11px] font-[300] text-gray-400 '>
                        {lastMessage.substring(0, 80)}....
                      </span>
                    ) : (
                      <span className='text-[11px] font-[300] text-gray-400 '>{lastMessage}</span>
                    )}

                    {StatusMessage ==="delivered" && lastMessageSender!==currentUserId && <div className='bg-[#029275] group-hover:absolute  group-hover:right-[38px]   rounded-full h-[17px] w-[17px] flex items-center justify-center text-black text-[10px]'>1</div>}                    
                    
                    
                    <div className=' hidden group-hover:flex animate-fade-left2 animate-once   animate-ease-in-out text-gray-400 absolute right-[12px] top-[20px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
                    </div>
                </div>
            </div>
      </div>
    </div>
    <div className='flex w-full items-end justify-end'>
        <div  className='w-[338px] h-[1px] bg-[#212c33] '/> 
    </div>
    </>
  )
}
