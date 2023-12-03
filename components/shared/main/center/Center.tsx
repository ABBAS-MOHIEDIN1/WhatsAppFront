"use client"
import Image from 'next/image'
import TopChat from './TopChat'
import MessageInput from '@/components/shared/main/center/MessageInput'
import ChatContainer from './ChatContainer'
import { useOpenModels } from "@/hooks/OpenModels"
import whatappgif from "@/public/imges/whatsapp.gif"
import { useSocket } from '@/components/provider/Socket'
import { useEffect, useRef, useState } from 'react'
import { useChatModel } from '@/hooks/UseChatModel'
import SearchMessage from '@/components/module/chat/SearchMessage'
import { cn } from '@/lib/utils'
import ContactInfo from '@/components/module/chat/ContactInfo'

export default function Center({user}:any) {
  const { SelectedId } = useOpenModels();
  const [isLoading,setisloading]=useState(false)

  const { FetchMesssages,messages,RecPerson  }:any = useSocket();
  const { type,isOpen } = useChatModel()

  
  console.log(messages);
  
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, SelectedId]);

  
  useEffect(()=>{
    async function runFetchMesssages(){
      setisloading(true)
      await FetchMesssages(SelectedId)
      setisloading(false)
    }
    runFetchMesssages()
  },[SelectedId])

  
  if(isLoading) {
    return <div className='loading animate-fade-up animate-once animate-duration-500 animate-delay-500 animate-ease-in-out'></div>
  }

  
  
  
  
  
  return (
   
   <>
    {
      SelectedId?(
        // background_img if true ,  w-[545px], min-high
          <div className='flex flex-row  background_img  w-full  h-full '>
            <div className={cn("flex flex-col justify-between h-full background_img  ",isOpen && type !=="uploadimg" && type !=="RelpyInput" ?"w-[544px] max-xl:hidden ":"w-full")}>
                <div className='flex flex-col'>
                  <div className={`'w-full' `}>
                    <TopChat user={RecPerson} isLoading={isLoading}/>   
                  </div>
                  <div className=' relative overflow-y-scroll   h-full max-h-[500px] w-full ' ref={chatContainerRef}>
                    <div className=' flex flex-col gap-[2.5px] pt-[58px]  pb-[50px]  px-[56px] '>
                      <ChatContainer data={ messages} CurrentUser={user} user={RecPerson}/>
                    </div>
                  </div>
                </div>
                {/* max-xl:absolute  max-xl:bottom-0  */}
                <div className={`  w-full h-full flex items-end justify-start `}>
                  <MessageInput to={RecPerson?.id} user={user}/>
                </div>
            </div>
         
            {
              isOpen &&type=="SearchMessage" &&(
                <div className='w-full h-full'>
                  <SearchMessage messages={messages}/>
                </div>
              )
              
              
            }
            {
              isOpen &&type=="Contactinfo" &&(
                <div className='w-full h-full'>
                  <ContactInfo Ruser={RecPerson} messages={messages}/>
                </div>
              )
              
              
            }
          
            
          </div>
        ):(
          <div className='bg-[#202c33]  text-white h-full flex flex-col items-center justify-center'>
              <div className='flex items-center justify-between gap-2'>
                <Image src={whatappgif} alt='what app' width={150} height={150}/>
                <div className='flex flex-col gap-1'>
                  <span className='text-6xl'>Whatsapp</span>
                  <h2 className='text-2xl'>Welcom {user?.name}</h2>
                </div>
              </div>
          </div>
      )
    } 
   </>
  )
}
