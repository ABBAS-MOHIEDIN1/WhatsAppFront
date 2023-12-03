import { cn } from '@/lib/utils';
import React from 'react'
import MessageStatus from '../MessageStatus';
import moment from 'moment';

interface  Pars  {
    senderId: string;
    CurrentUserID: string;
    OpenMoreChat: boolean;
    setOpenMoreChat: (OpenMoreChat:boolean) => void | any; // Adjust this type if needed
    timestamp: Date;
    messageStatus:string,
    text:string;
};

export default function Text({senderId,CurrentUserID,OpenMoreChat,setOpenMoreChat,timestamp,text,messageStatus}:Pars) {
  
  return (
    <div className={cn("text-white flex  text-xs px-2 py-[1px]  rounded-[5px] gap-2  max-w-[60%]  relative",senderId===CurrentUserID?"bg-[#005c4b]":"bg-[#202c33]  ")}>
                <div onClick={()=>setOpenMoreChat(!OpenMoreChat)}  className='hidden group-hover:flex animate-fade-left33 animate-once   cursor-pointer  animate-ease-in-out text-gray-400 absolute right-[2px] top-[0px]'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='  opacity-[0.90]' width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
                </div>
            {
                text && 
                    <span className=' break-words font-[400] flex-1 mt-1 w-full  '>
                          {text}
                    </span>
            }
          <div className='flex gap-1 items-end justify-end '>
            <div className='flex items-center justify-end pt-1 gap-1 min-w-full'>
              <span className='text-gray-400 text-[10px] mt-2 min-w-fit'>{moment(timestamp).format('h:mm A')}</span>
              <span className='mt-[7px]'>
                <span><MessageStatus MessageStatu={messageStatus}/></span>
              </span>
            </div>
          </div>
    </div>
  )
}
