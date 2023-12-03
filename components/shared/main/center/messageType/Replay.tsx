import { cn } from '@/lib/utils'
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
    replyedMessage:string,
    Ruser:any
};

export default function Replay({senderId,CurrentUserID,OpenMoreChat,setOpenMoreChat,timestamp,text,messageStatus,replyedMessage,Ruser}:Pars) {
  return (
    <div className={cn("text-white flex flex-col  text-xs  rounded-[5px] gap-[4px] h-full  max-w-[60%]  relative",senderId===CurrentUserID?"bg-[#005c4b]":"bg-[#202c33]  ")}>
        <div onClick={()=>setOpenMoreChat(!OpenMoreChat)}  className='hidden group-hover:flex z-[9999999] animate-fade-left33 animate-once   cursor-pointer  animate-ease-in-out text-gray-400 absolute right-[2px] top-[0px]'>
            <svg xmlns="http://www.w3.org/2000/svg" className='  opacity-[0.90]' width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
        </div>
        
        <div className=' py-1 px-1 w-full'>
            <div className='flex break-words text-[11px] font-[400] h-full w-full items-start  relative '>
                <div className={cn('flex flex-col items-start  h-full w-full  rounded-[4px] px-2 gap-1 py-1',senderId===CurrentUserID?"bg-[#025144]":"bg-[#1d282f]")}>
                    <span className={cn('text-xs  font-[500]',senderId === CurrentUserID?"text-[#05be7b]":'text-[#47a8d3]')}>
                        {senderId === CurrentUserID?"You":Ruser}
                    </span>
                    <p className={cn(senderId === CurrentUserID?"text-[#94b29e]":"text-[#9ba7a8]")}>{replyedMessage}</p>
                </div>
                {/* text-[#47a8d3] */}
                <div className={cn("absolute left-0 w-[3px] rounded-[2px] bg-[#06cf9c] h-full",senderId === CurrentUserID?"bg-[#06cf9c]":'bg-[#47a8d3]')}></div>
            </div>
        </div>
        <div className='flex flex-col   h-full justify-between gap-2 min-w-[130px] px-2 py-[1px] '>
            {
                text && <div className=' items-start w-full break-words'>
                    <span className=' break-words font-[400] flex-1 mt-1 w-full  '>
                        {text}
                    </span>
                </div>
            }
            <div className='flex gap-1 items-end justify-end h-[5px]'>
                <div className='flex items-center justify-end pt-1 gap-1 min-w-full'>
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
