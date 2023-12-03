"use client"
import { useChatModel } from '@/hooks/UseChatModel'
import React from 'react'

export default function More({CloseMe}:any) {
    const {onOpen } = useChatModel()
    function CloseAndOpenContactInfo(){
        onOpen("Contactinfo")
        CloseMe(false)
    }
  

  return (
    <div className='animate-fade-left3 animate-once  animate-duration-300 animate-ease-in-out cursor-pointer   absolute w-[210px] h-fit top-[49px] right-[19px] py-[7px]  rounded-[3px]  bg-[#233138] z-[2]'>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]' onClick={CloseAndOpenContactInfo} >Contact info</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]' >Select messages</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]'>Close chat</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]'>Mute notification</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
            <span className='text-[12px] text-[#d1d7db]'>Disappeating messages</span>
        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' >
            <span className='text-[12px] text-[#d1d7db]'>Clear Chat</span>

        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' >
            <span className='text-[12px] text-[#d1d7db]'>Delete Chat</span>

        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' >
            <span className='text-[12px] text-[#d1d7db]'>Report</span>

        </div>
        <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' >
            <span className='text-[12px] text-[#d1d7db]'>Block</span>

        </div>
    </div>
  )
}
