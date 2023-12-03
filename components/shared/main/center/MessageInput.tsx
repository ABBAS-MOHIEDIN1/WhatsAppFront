"use client"
import { useSocket } from '@/components/provider/Socket';
import React, {  Ref, useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import Attachment from './attachment';
import UploadImg from '@/components/module/chat/UploadImg';
import { useChatModel } from '@/hooks/UseChatModel';
import CaptureAudio from './CaptureAudio';



export default function MessageInput({to,user}:any) {
  const { socket,setMessages,messages,ShowIamage,setShowIamage}:any = useSocket();
  const { onClose,type,isOpen,data } = useChatModel()
  const [ShowAudioRecordComponent,setShowAudioRecordComponent]=useState(false)
  const [SendMessageData,SetSendMessageData]=useState({
    id:null,
    text:"",
    Voice:"",
    image:"",
    receiverId:to,
    senderId:user.id,
    messageStatus: "delivered",
    parent: {
      text:null,
      parentID:null
    },
  })
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachment,setshowAttachment]=useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  
  
  

  useEffect(()=>{
    if(isOpen && type==="RelpyInput" && data?.messageID){
      SetSendMessageData({...SendMessageData,parent:{parentID:data.messageID,text:data.message}})
    }
  },[data,isOpen])




  async function Send(MessageData?:any) {
    try {      

      
     
      
      setMessages((prevMessages: any) => {
          // Check if prevMessages is an array
        const newMessages = Array.isArray(prevMessages) ? [...prevMessages, MessageData] : [MessageData];
          // Update the state with the newMessages array
        return newMessages;
      });
      socket.current.emit("send-meg", { MessageData});
      SetSendMessageData({...SendMessageData,text:"",image:"",parent:{text:null,parentID:null},Voice:""})
      onClose()
      return 
    } catch (error) {
      console.log(error); 
    }
    finally{
      setShowIamage(null)
    }
  }

  function handelEmogiModel(){
    setShowEmoji((prev)=>!prev);
  }

  function HandelEmogieClick (emogi:any){
    SetSendMessageData((prevMessage) => ({
      ...prevMessage,
      text: prevMessage.text + emogi?.emoji,
    }));
  }
  return (
    <div className='flex flex-col w-full max-h-[114px] bg-[#202c33]'>
      {/* reply section */}
      { !ShowAudioRecordComponent?(
        <>
        {isOpen&&type==="RelpyInput"&&<div className='pl-[22px] pr-[17px] '>
          <div className='w-full  items-center mt-[4px] h-[54px]  gap-2 flex flex-row'>
              <div className='w-full h-[53px] mr-[10px] bg-[#111b21] rounded-[7px] relative flex flex-row  justify-start  cursor-default'>
                <div className='flex flex-col pt-[5px] pl-[12px] pr-[5px] w-full'>
                  <span className={"text-[11px]  font-[500] text-[#05be7b]  "}>You</span>
                    <p className={"text-[#9ba7a8] text-xs   break-words w-full"}>
                      {
                        data?.message.length > 50 ? 
                          (data?.message ? <p>{data.message.substring(0, 140)} <a className='mr-1 text-blue-500 cursor-pointer'>,see more</a></p> : "")
                          : 
                          data?.message
                      }
                    </p>
                </div>
                <div className={"absolute left-[0px] w-[3.2px]  h-[52px] rounded-tl-[9px]  rounded-bl-[9px] bg-[#06cf9c]"}></div>
              </div>
              <div onClick={onClose}  className='text-[#6b7a83] cursor-pointer'>
                <svg viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet" fill="currentColor" ><path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z"></path></svg>
              </div>
          </div>
        </div>}
        {/* min-h-[56px] */}
        <div className=' h-[56px] px-[22px] flex items-center w-full gap-6 relative text-[#7c8c95]'>
            <div className='flex gap-6 items-center justify-between     w-full cursor-pointer'>
              <div className=' flex flex-row w-[68px] items-center  justify-between'>
                {/*  theme={"dark"} */}
                {showEmoji && <div ref={emojiPickerRef} id='emojie'  className=' absolute  bottom-[55px] left-[20px] z-40'><EmojiPicker onEmojiClick={HandelEmogieClick}/></div>}
                <svg onClick={handelEmogiModel} id='emojie' viewBox="0 0 24 24" height="24" className=' cursor-pointer' width="24" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path></svg>
                {showAttachment && <div className=' absolute bottom-[55px] left-[52px] z-[2]'><Attachment/></div>}
                <svg onClick={()=>setshowAttachment((prev)=>!prev)} viewBox="0 0 24 24" height="22" className=' cursor-pointer mt-[1px]' width="22" preserveAspectRatio="xMidYMid meet"  fill="none"><path  d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z" fill="currentColor"></path></svg>
              </div>
              {/* w-[798px]  max-lg:w-[399px] max-xl:w-[552px] max-md:w-[160px]*/}
              <div className='w-full ml-[-9.5px] mt-[1px]'>
                <input
              
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    Send(SendMessageData);
                  }
                }}
                type="text" value={SendMessageData.text} onChange={(e)=>SetSendMessageData({...SendMessageData,text:e.target.value})} placeholder='Type a message' className='bg-[#2a3942] w-full h-full border-0 outline-none placeholder:text-[13px] text-[13px] text-white   pb-[11.5px] pt-[11.5px] px-[15px] rounded-[7px] '/>
              </div>
              {
                SendMessageData.text?(
                  <div  className='ml-[-10px] mt-[1px]'>
                    <svg viewBox="0 0 24 24" height="22" width="22" onClick={Send} preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
                  </div>
                ):(
                <div onClick={()=>setShowAudioRecordComponent(true)} className='ml-[-10px] mt-[1px]'>
                  <svg viewBox="0 0 24 24" height="22" width="22" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path></svg>
                </div>
                )
              }
            </div> 
        </div>
        {
          isOpen && type==="uploadimg"&& ShowIamage && (
            // w-[952px] h-[555px] 2xl:top-[73px] h-[555px] 2xl:h-[615px]  w-[961px] 2xl:w-[1098px] 
            <div className='  fixed max-xl:top-[53px] 2xl:top-[73px] custom top-[71px]   z-[99]'>
              <UploadImg  HandelEmogieClick={HandelEmogieClick} emojiPickerRef={emojiPickerRef}  SetSendMessageData={SetSendMessageData} SendMessageData={SendMessageData} Send={Send} onClose={onClose}/>
            </div>
          )
        } 
        
        </>
        ):( ShowAudioRecordComponent && <CaptureAudio SendMessageData={SendMessageData} SendToServer={Send} SetSendMessageData={SetSendMessageData} setShowAudioRecordComponent={setShowAudioRecordComponent} userInfo={user}/>)
      }
      
      
    </div>
  )
}
