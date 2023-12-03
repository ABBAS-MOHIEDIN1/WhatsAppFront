"use client"
import { NewCommunityModel } from '@/hooks/NewCommunity'
import { useOpenModels } from '@/hooks/OpenModels'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function ThreeDotes() {
    const {isOpen,onClose,type,onOpen} = useOpenModels()
    const {onOpenNewCommunity} = NewCommunityModel()
    const router = useRouter()
    if(type !=="ThreeDotes"){
        return null
    
    }
  return (
   <>
   {
    isOpen && (
        <div className='animate-fade-left3 animate-once  animate-duration-300 animate-ease-in-out   absolute w-[205px] h-fit top-[49px] right-[19px] py-[7px]  rounded-[3px]  bg-[#233138] z-[2]'>
            <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
                <span className='text-[12px] text-[#d1d7db]' >New group</span>
            </div>
            <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' onClick={onOpenNewCommunity}>
                <span className='text-[12px] text-[#d1d7db]' >New community</span>
            </div>
            <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
                <span className='text-[12px] text-[#d1d7db]'>Starrted messages</span>
            </div>
            <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
                <span className='text-[12px] text-[#d1d7db]'>Select messages</span>
            </div>
            <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
                <span className='text-[12px] text-[#d1d7db]'>Settings</span>
            </div>
            <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]' >
                <span className='text-[12px] text-[#d1d7db]'>Log out</span>

            </div>
            <div className='flex w-full items-end justify-end'>
                <div  className='w-full h-[1px] bg-gray-600 '/> 
            </div>
            <div className='pt-1'>
                <div className='pl-[23px] pt-[1px] h-[35px] flex items-center hover:bg-[#182229]'>
                    <span className='text-[12px] text-[#d1d7db]'>Get WhatsApp Windows</span>
                </div>
            </div>
        </div>
    )
   }
   
   </>
  )
}
