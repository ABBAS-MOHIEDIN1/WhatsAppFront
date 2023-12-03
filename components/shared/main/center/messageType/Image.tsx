import { cn } from '@/lib/utils';
import React from 'react'
import MessageStatus from '../MessageStatus';
import moment from 'moment';
import Image from 'next/image';

interface  Pars  {
    senderId: string;
    CurrentUserID: string;
    OpenMoreChat: boolean;
    setOpenMoreChat: (OpenMoreChat:boolean) => void | any; // Adjust this type if needed
    timestamp: Date;
    messageStatus:string,
    text:string;
    image:any
};

export default function ImageMess({senderId,CurrentUserID,OpenMoreChat,setOpenMoreChat,timestamp,text,messageStatus,image}:Pars) {
  return (
    <div className={cn("p-[2px]  rounded-[8px] max-w-[65%] relative ",senderId===CurrentUserID?"bg-[#005c4b]":"bg-[#202c33]  ")}>
                <div onClick={()=>setOpenMoreChat(!OpenMoreChat)} className='hidden group-hover:flex animate-fade-left33 animate-once   cursor-pointer  animate-ease-in-out text-gray-400 absolute z-[9999] right-[2px] top-[0px]'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='  opacity-[0.90]' width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
                </div>
                
               
                <div className=' relative flex flex-col gap-1'>
                  <Image  src={`http://localhost:8179/imges/${image}`} width={300} height={300} alt='fff' className=' rounded-[8px]'/>
                      {
                      text && (
                        <div className='px-2 text-xs text-white'>
                            <span className=' break-words font-[400] flex-1 mt-1'>
                              {text}
                          </span>
                        </div>
  
                      )
                      }
                  <div className='flex gap-1 items-end justify-end'>
                  <div className='flex items-center justify-center pt-1 gap-1 absolute bottom-0 right-0'>
                      <span className='text-gray-400 text-[10px] mt-2 min-w-fit'>{moment(timestamp).format('h:mm A')}</span>
                      <span className='mt-[7px]'>
                        <span><MessageStatus MessageStatu={messageStatus}/></span>
                      </span>
                      </div>
                  </div>
                </div>
                
    </div>
  )
}
