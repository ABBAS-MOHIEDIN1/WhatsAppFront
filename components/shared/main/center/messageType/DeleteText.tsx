import { cn } from '@/lib/utils'
import moment from 'moment'
import React from 'react'





interface  Pars  {
    senderId: string;
    CurrentUserID: string;
    OpenMoreChat: boolean;
    setOpenMoreChat: (OpenMoreChat:boolean) => void | any; // Adjust this type if needed
    timestamp: Date;
};

export default function DeleteText({senderId,CurrentUserID,OpenMoreChat,setOpenMoreChat,timestamp}:Pars) {
  return (
    <div className={cn("text-white flex  text-xs px-2 py-[1px]  rounded-[5px] gap-2  max-w-[65%]  relative",senderId===CurrentUserID?"bg-[#005c4b]":"bg-[#202c33]  ")}>
        <div onClick={()=>setOpenMoreChat(!OpenMoreChat)}  className='hidden group-hover:flex animate-fade-left33 animate-once   cursor-pointer  animate-ease-in-out text-gray-400 absolute right-[2px] top-[0px]'>
            <svg xmlns="http://www.w3.org/2000/svg" className='  opacity-[0.90]' width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
        </div>
        <div className='flex flex-row items-center justify-center gap-2'>
        <svg className='text-[#5a7478]' viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet"  fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.75897 6.43054C8.93584 5.533 10.4057 5 12 5C15.866 5 19 8.13401 19 12C19 13.5943 18.467 15.0642 17.5695 16.241L7.75897 6.43054ZM6.35707 7.85707C5.50399 9.01706 5 10.4497 5 12C5 15.866 8.13401 19 12 19C13.5503 19 14.9829 18.496 16.1429 17.6429L6.35707 7.85707ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="currentColor"></path></svg>
        <span className='text-[#5a7478] font-[500] text-xs'>
        {
            senderId===CurrentUserID?(
            "You deleted message"

            ):(
            `message is deleted`
            )
        }
        </span>

        </div>
        <div className='flex gap-1 items-end justify-end'>
        <div className='flex items-center justify-center pt-1 gap-1'>
            <span className='text-gray-400 text-[10px] mt-2 min-w-fit'>{moment(timestamp).format('h:mm A')}</span>
            
        </div>
        </div>
    </div>
  )
}
