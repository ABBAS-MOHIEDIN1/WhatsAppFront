"use client"
import { useSocket } from '@/components/provider/Socket'
import { useChatModel } from '@/hooks/UseChatModel'
import React, { useState } from 'react'

export default function Moremessage({CloseMe,senderID,CurrentID,currentIndex,Rec,messageID,message,typemessage}:any) {
    const {DeleteMessageSendSocket}:any=useSocket()
    const {onOpen,type,isOpen} = useChatModel()
   
    
   
    
      
    async function CloseAndOpenContactInfo(){
        await MessageSingle()
        CloseMe(false)
    }
    function OpenRelpyInput() {
        
        const data = {
            message,
            typemessage,
            messageID
        }

        onOpen("RelpyInput",data)
        CloseMe(false)

    }

    async function MessageSingle() {
        DeleteMessageSendSocket(messageID,Rec,currentIndex)
    
    }
 
  

  return (
    <div className='animate-fade-left3 animate-once  animate-duration-300 animate-ease-in-out cursor-pointer   absolute w-[150px] h-fit top-[49px] right-[19px] py-[7px]  rounded-[3px]  bg-[#233138] z-[2]'>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]' >messages info</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' onClick={OpenRelpyInput}>
            <span className='text-[12px] text-[#d1d7db]'>Reply</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]'>React</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]'>Forward</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' >
            <span className='text-[12px] text-[#d1d7db]'>Star</span>
        </div>
        {
            senderID == CurrentID &&(
                <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' onClick={CloseAndOpenContactInfo}>
                    <span className='text-[12px] text-[#d1d7db]' >Delete</span>
        
                </div>
            )
        }
       
    </div>
  )
}
