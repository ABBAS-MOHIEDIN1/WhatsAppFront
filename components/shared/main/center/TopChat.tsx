"use client"
import React, { useEffect, useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useSocket } from '@/components/provider/Socket';
import { useOpenModels } from '@/hooks/OpenModels';
import { useChatModel } from '@/hooks/UseChatModel';
import More from '@/components/module/chat/More';
interface UserData {
        lastseen: string; 
}
export default function TopChat({user}:any) {
    const imageUrl = user?.image ? `http://localhost:8179/imges/${user?.image}` : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";


    
    const {SelectedId}:any=useOpenModels()
    const {socket}:any=useSocket()
    const [userIsOnline, setUserIsOnline] = useState<boolean>(false);
    const { onClose,type,isOpen,onOpen } = useChatModel()
    const [OpenMore,setOpenMore]=useState(false)

    
    const handleUserOffline = (userId: string) => {
        if (userId === SelectedId) {
            setUserIsOnline(false);
        }
    };

    useEffect(() => {
        checkIfUserOnline();
        const handleOnlineStatus = ({ userId, online }: { userId: string; online: boolean }) => {
            if (userId === SelectedId) {
                setUserIsOnline(online);
            }
        };

        const handleUserOfflineEvent = ({ userId }: { userId: string }) => {
            handleUserOffline(userId);
        };

        socket.current.on("online-status", handleOnlineStatus);
        socket.current.on("user-offline", handleUserOfflineEvent);

        return () => {
            socket.current.off("online-status", handleOnlineStatus);
            socket.current.off("user-offline", handleUserOfflineEvent);
        };
    }, [SelectedId, socket]);

    const checkIfUserOnline = () => {
        socket.current.emit("check-online", { userId: SelectedId });
    };

        
    


    
  return (
    // bg-[#202c33] 
    <div className=' bg-[#202c33] flex items-center justify-center  min-h-[53.5px]   z-[10]'>
        <div className='flex flex-row justify-between items-center w-full  pl-[14px] pr-[22px]'>
            <div className='flex flex-row items-center'>
                <Avatar  className={"min-w-[40px] min-h-[40px] cursor-pointer"}>
                    <AvatarImage src={imageUrl} alt="@shadcn" className=' object-cover'/>
                    <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col ml-[12px] cursor-pointer mt-[2px]'>
                    <span className='font-[500] text-[#e9edef] text-[13px]'>{user?.name}</span>
                    <small className='text-[10px] text-gray-300'>{userIsOnline?"online":"offline"}</small>
                    {/* hidden after 25 second */}
                    {/* <small className='text-[9px] text-gray-300'>Click for more info.</small> */}
                </div>
            </div>
            <div className='flex flex-row text-[#a0acb3]  w-[131.5px]  justify-between items-center'>
                <div className='flex flex-row items-center gap-1 cursor-pointer'>
                    <svg viewBox="0 0 24 24" className='text-[#4c5d66]' height="22" width="22" preserveAspectRatio="xMidYMid meet"  fill="none"><path d="M3.27096 7.31042C3 7.82381 3 8.49587 3 9.84V14.16C3 15.5041 3 16.1762 3.27096 16.6896C3.5093 17.1412 3.88961 17.5083 4.35738 17.7384C4.88916 18 5.58531 18 6.9776 18H13.1097C14.502 18 15.1982 18 15.7299 17.7384C16.1977 17.5083 16.578 17.1412 16.8164 16.6896C17.0873 16.1762 17.0873 15.5041 17.0873 14.16V9.84C17.0873 8.49587 17.0873 7.82381 16.8164 7.31042C16.578 6.85883 16.1977 6.49168 15.7299 6.26158C15.1982 6 14.502 6 13.1097 6H6.9776C5.58531 6 4.88916 6 4.35738 6.26158C3.88961 6.49168 3.5093 6.85883 3.27096 7.31042Z" fill="currentColor"></path><path d="M18.7308 9.60844C18.5601 9.75994 18.4629 9.97355 18.4629 10.1974V13.8026C18.4629 14.0264 18.5601 14.2401 18.7308 14.3916L20.9567 16.3669C21.4879 16.8384 22.3462 16.4746 22.3462 15.778V8.22203C22.3462 7.52542 21.4879 7.16163 20.9567 7.63306L18.7308 9.60844Z" fill="currentColor"></path></svg>
                    <svg viewBox="0 0 17 13" className='text-[#4c5d66]' height="10" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enableBackground="new 0 0 17 13"><path fill="currentColor" d="M3.202,2.5l5.2,5.2l5.2-5.2l1.5,1.5l-6.7,6.5l-6.6-6.6L3.202,2.5z"></path></svg>
                </div>
                <svg viewBox="0 0 24 24" onClick={()=>onOpen("SearchMessage")} className=' cursor-pointer mr-[-3px]' height="22" width="22" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z"></path></svg>
                <svg viewBox="0 0 24 24" onClick={()=>setOpenMore(!OpenMore)} className=' cursor-pointer mt-[1px]' height="22" width="22" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
            </div>
            {
                OpenMore && (
                    <div className=' absolute right-4 top-5'>
                        <More CloseMe={setOpenMore}/>
                    </div>
                )
            }
        </div>
    </div>
  )
}
