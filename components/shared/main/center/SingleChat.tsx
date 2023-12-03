"use client"
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import MessageStatus from './MessageStatus'
import { BsEmojiSmileFill } from 'react-icons/bs'
import moment from 'moment'
import Image from 'next/image';
import Moremessage from '@/components/module/chat/Moremessage'
import DeleteText from './messageType/DeleteText'
import Text from './messageType/Text'
import ImageMess from './messageType/Image'
import Replay from './messageType/Replay'
import Voice from './messageType/Voice'

export default function SingleChat({CurrentUser,per,currentIndex,Ruser}:any) {
    const [OpenMoreChat,setOpenMoreChat]=useState(false)
    
    

    console.log(per);
    
    
  // in the per.parant = the object,
    
  return (
    <div className='flex w-full relative'>
      <div className={cn("flex flex-row w-full   h-full overflow-hidden")}>
      <div className={cn('flex  items-center cursor-pointer gap-1 h-full w-full relative  group overflow-hidden',per?.senderId===CurrentUser.id?" justify-end":"justify-start")}>
          <div className={cn("hidden   group-hover:flex items-center justify-center h-fit w-fit bg-black text-gray-400 rounded-full p-1 text-sm opacity-[0.60]  cursor-pointer",per.senderId!==CurrentUser.id&& "order-4")}>
            <BsEmojiSmileFill />
          </div>
        
        {
          per.isDeleted?(

            <DeleteText senderId={per.senderId}  CurrentUserID={CurrentUser.id} setOpenMoreChat={setOpenMoreChat} OpenMoreChat={OpenMoreChat} timestamp={per.timestamp}/>
         

          ):per.parent?.text?(
            <Replay  senderId={per.senderId} Ruser={Ruser.name} replyedMessage={per.parent.text} CurrentUserID={CurrentUser.id} setOpenMoreChat={setOpenMoreChat} OpenMoreChat={OpenMoreChat} timestamp={per.timestamp} text={per.text} messageStatus={per.messageStatus}/>
          ):per.Voice?(
            <Voice senderId={per.senderId} Ruser={Ruser} Voice={per.Voice} CurrentUserID={CurrentUser.id} CurrentUserImg={CurrentUser.image} setOpenMoreChat={setOpenMoreChat} OpenMoreChat={OpenMoreChat} timestamp={per.timestamp} text={per.text} messageStatus={per.messageStatus} />
          ):!per.image?(

            <Text senderId={per.senderId}  CurrentUserID={CurrentUser.id}  setOpenMoreChat={setOpenMoreChat} OpenMoreChat={OpenMoreChat} timestamp={per.timestamp} text={per.text} messageStatus={per.messageStatus}/>
            
          ):(
            <ImageMess senderId={per.senderId}  CurrentUserID={CurrentUser.id} setOpenMoreChat={setOpenMoreChat} OpenMoreChat={OpenMoreChat} timestamp={per.timestamp} text={per.text} messageStatus={per.messageStatus} image={per.image}/>
          )
        }
      </div>
    </div>
    {
      OpenMoreChat && (
        <div className={`absolute top-[-47px] ${per?.senderId===CurrentUser.id?"right-[-10px]":"left-[160px]" }  `}>
            {/* per?.senderId===CurrentUser.id */}
          <Moremessage CloseMe={setOpenMoreChat}  typemessage={per.messageType} message={per.text} currentIndex={currentIndex} CurrentID={CurrentUser.id} Rec={per.receiverId} senderID={per.senderId} messageID={per.id}/>
        </div>
      )
    }
  </div>
  )
}
