"use client"
import { useChatModel } from '@/hooks/UseChatModel'
import React, { useEffect, useState } from 'react'
import Axios from '@/lib/Axios'
import { useOpenModels } from '@/hooks/OpenModels'
export default function ContactInfo({Ruser,messages}:any) {
    const { onClose } = useChatModel()
    const {Selected}=useOpenModels()
    const [isloading,setisloading]=useState(false)
    const [Images,setImages]=useState<any>()
  
    const imageUrl = Ruser?.image ? `http://localhost:8179/imges/${Ruser?.image}` : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";
    
   
    if(!Ruser){
        return <div className='loading animate-fade-up animate-once animate-duration-500 animate-delay-500 animate-ease-in-out'></div>
    }

    function GetImges() {
        const imageMessages = messages?.filter((message: any) => message.image && !message.isDeleted);
        // Now lastThreeImages contains the last three image messages
        setImages(imageMessages);
    }
    useEffect(()=>{
        GetImges()
    },[])
    async function  DeleteMessage() {
        setisloading(true)
        await Axios.get(`/MessageRoute/DeleteMessages/${Ruser.id}`)
        setisloading(false)
        Selected(null)      
    }
   
    if(isloading){
        return <div className='loading animate-fade-up animate-once animate-duration-500 animate-delay-500 animate-ease-in-out'></div>
    }
  return (
    <div className=' w-full flex flex-col text-white h-full  bg-[#0c1317]  border-l  border-gray-200/20 '>
        <div className=' overflow-y-scroll '>
            <div className='bg-[#202c33]  sticky top-0 pl-[22px]  flex flex-row items-center gap-7 min-h-[53.5px]   z-[10]'>
                <div onClick={onClose} className='text-[#6b7a83] cursor-pointer'>
                    <svg viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet" fill="currentColor" ><path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z"></path></svg>
                </div>
                <div className='text-sm font-[300]'>
                 <span>Contact Info</span>
                </div>
            </div>  

            <div className='bg-[#141e24] w-full min-h-[295px] flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-full gap-4'>
                    <div className=' flex items-center justify-center w-full h-full'>
                        <img src={imageUrl} className='rounded-[100%]   h-[185px] w-[185px]'  alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col  text-center'>
                            <span className='text-lg'>{Ruser.name}</span>
                            <span className='text-xs text-[#6b7a83]'>+{Ruser.phoneNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#141e24] w-full min-h-[170px] flex flex-col items-center   mt-[10px]'>
                <div className='flex flex-row  justify-between px-[26px] mt-5 w-full'>
                    <span className='text-[#81919e] text-[13px]'>Media,Links and docs</span>
                    <div className='flex flex-row cursor-pointer  items-center justify-center gap-2 text-[#81919e] '>
                        <span className='text-xs'>{Images?.length}</span>
                        <svg viewBox="0 0 10 21" height="21" width="10" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" ><path fill="currentColor" d="M1,15.75l5.2-5.2L1,5.35l1.5-1.5l6.5,6.7l-6.6,6.6L1,15.75z"></path></svg>
                    </div>
                </div>

                <div className='flex flex-row mt-6 items-center justify-center gap-2 w-full h-full'>
                    
                    {
                        Images?.slice(0, 3).map((e:any, index:any) => (
                            <div key={index} className=' cursor-pointer'>
                                <img src={`http://localhost:8179/imges/${e.image}`}  className='rounded-[10px] h-[85px] w-[100px] object-cover' alt={e.name} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='bg-[#141e24] mb-7 w-full h-[415px] flex flex-col items-center   mt-[10px]'>
                <div className='flex flex-col w-full gap-1  pl-[35px] pr-[28px] items-start  justify-center'>
                        <div className='flex flex-row items-center  cursor-pointer justify-between w-full h-[50px]'>
                            <div className='flex flex-row gap-3'>
                                <svg className='text-[#81919e]' viewBox="0 0 16 15" height="20" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" ><path fill="currentColor" d="M8.3,10.2l-2.5,1.7c-0.3,0.2-0.8-0.1-0.7-0.5L6,8.6c0.1-0.2,0-0.4-0.2-0.5L3.5,6.3C3.1,6,3.3,5.5,3.7,5.5 l3-0.1c0.2,0,0.3-0.1,0.4-0.3l1-2.8c0.1-0.4,0.7-0.4,0.8,0l1,2.8c0.1,0.2,0.2,0.3,0.4,0.3l3,0.1c0.4,0,0.6,0.5,0.3,0.8l-2.4,1.8 C11.1,8.2,11,8.4,11,8.6l0.9,2.9c0.1,0.4-0.3,0.7-0.7,0.5l-2.5-1.7C8.6,10.1,8.4,10.1,8.3,10.2z"></path></svg>
                                <span className='text-[15px] font-[400]'>Started messages</span>
                            </div>
                            <div className='text-[#81919e]'>
                                <svg viewBox="0 0 10 21" height="19" width="10" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" ><path fill="currentColor" d="M1,15.75l5.2-5.2L1,5.35l1.5-1.5l6.5,6.7l-6.6,6.6L1,15.75z"></path></svg>
                            </div>
                        </div>
                        <div className='flex flex-row items-center  cursor-pointer justify-between w-full h-[50px]'>
                            <div className='flex flex-row gap-4'>
                                    <svg className='fill-[#81919e]' viewBox="0 0 24 24" height="18" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" ><path  d="M12,21.7c0.9,0,1.7-0.8,1.7-1.7h-3.4C10.3,20.9,11.1,21.7,12,21.7z M17.6,16.5v-4.7 c0-2.7-1.8-4.8-4.3-5.4V5.8c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3v0.6C8.2,7,6.4,9.1,6.4,11.8v4.7l-1.7,1.7v0.9h14.6v-0.9 L17.6,16.5z"></path></svg>
                                    <span className='text-[15px] font-[400]'>Mute notifications</span>
                                </div>
                                <div>
                                    <div className="cl-toggle-switch">
                                        <label className="cl-switch">
                                            <input type="checkbox"/>
                                            <span></span>
                                        </label>
                                    </div>
                                </div>
                        </div>

                        <div className='flex flex-row items-start mt-[15px]   cursor-pointer justify-between w-full h-[50px]'>
                                <div className='flex flex-row gap-4'>
                                    <svg className='text-[#81919e]' viewBox="0 0 36 36" height="20" preserveAspectRatio="xMidYMid meet" fill="none"><path d="M18 31.5C18.0909 31.5 18.1817 31.4991 18.2722 31.4973C19.1005 31.4809 19.7586 30.7961 19.7422 29.9679C19.7258 29.1396 19.041 28.4815 18.2128 28.4979C18.142 28.4993 18.0711 28.5 18 28.5V31.5ZM18 7.5C18.0711 7.5 18.142 7.5007 18.2128 7.50211C19.041 7.51853 19.7258 6.86039 19.7422 6.03213C19.7586 5.20387 19.1005 4.51912 18.2722 4.5027C18.1817 4.5009 18.0909 4.5 18 4.5V7.5ZM24.5153 6.17374C23.7901 5.77341 22.8776 6.03683 22.4772 6.76211C22.0769 7.48739 22.3403 8.39988 23.0656 8.8002C23.1891 8.86838 23.3111 8.93898 23.4316 9.01195C24.1401 9.44118 25.0625 9.21475 25.4917 8.5062C25.921 7.79765 25.6945 6.87529 24.986 6.44605C24.8311 6.35223 24.6742 6.26144 24.5153 6.17374ZM29.554 11.014C29.1247 10.3055 28.2024 10.079 27.4938 10.5083C26.7852 10.9375 26.5588 11.8599 26.9881 12.5684C27.061 12.6889 27.1316 12.8109 27.1998 12.9344C27.6001 13.6597 28.5126 13.9231 29.2379 13.5228C29.9632 13.1224 30.2266 12.2099 29.8263 11.4847C29.7386 11.3258 29.6478 11.1689 29.554 11.014ZM31.4973 17.7278C31.4809 16.8995 30.7961 16.2414 29.9679 16.2578C29.1396 16.2742 28.4815 16.959 28.4979 17.7872C28.4993 17.858 28.5 17.9289 28.5 18C28.5 18.0711 28.4993 18.142 28.4979 18.2128C28.4815 19.041 29.1396 19.7258 29.9679 19.7422C30.7961 19.7586 31.4809 19.1005 31.4973 18.2722C31.4991 18.1817 31.5 18.0909 31.5 18C31.5 17.9091 31.4991 17.8183 31.4973 17.7278ZM29.8263 24.5153C30.2266 23.7901 29.9632 22.8776 29.2379 22.4772C28.5126 22.0769 27.6001 22.3403 27.1998 23.0656C27.1316 23.1891 27.061 23.3111 26.9881 23.4316C26.5588 24.1401 26.7852 25.0625 27.4938 25.4917C28.2024 25.921 29.1247 25.6945 29.554 24.986C29.6478 24.8311 29.7386 24.6742 29.8263 24.5153ZM24.986 29.554C25.6945 29.1247 25.921 28.2024 25.4917 27.4938C25.0625 26.7852 24.1401 26.5588 23.4316 26.9881C23.3111 27.061 23.1891 27.1316 23.0656 27.1998C22.3403 27.6001 22.0769 28.5126 22.4772 29.2379C22.8776 29.9632 23.7901 30.2266 24.5153 29.8263C24.6742 29.7386 24.8311 29.6478 24.986 29.554Z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M18.0001 4.5C18 4.5 17.9999 4.5 17.9998 4.5C10.5439 4.5 4.49976 10.5442 4.49976 18C4.49976 25.4558 10.5439 31.5 17.9998 31.5C17.9999 31.5 18 31.5 18.0001 31.5V28.5C18 28.5 17.9999 28.5 17.9998 28.5C12.2008 28.5 7.49976 23.799 7.49976 18C7.49976 12.201 12.2008 7.5 17.9998 7.5C17.9999 7.5 18 7.5 18.0001 7.5V4.5Z"></path><path fill="currentColor" d="M23.3247 12.0107C23.669 11.7525 24.1507 11.7867 24.455 12.091V12.091C24.7593 12.3953 24.7935 12.877 24.5353 13.2213L19.9714 19.3066C19.2589 20.2566 17.8701 20.3553 17.0304 19.5156V19.5156C16.1907 18.6759 16.2894 17.2871 17.2394 16.5746L23.3247 12.0107Z"></path></svg>
                                    <div className='flex flex-col'>
                                        <span className='text-[15px] font-[400]'>Disapperaing messages</span>
                                        <small className='text-[#81919e] text-xs'>Off</small>
                                    </div>
                                </div>
                                <div className='text-[#81919e]'>
                                    <svg viewBox="0 0 10 21" height="19" width="10" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" ><path fill="currentColor" d="M1,15.75l5.2-5.2L1,5.35l1.5-1.5l6.5,6.7l-6.6,6.6L1,15.75z"></path></svg>
                                </div>
                            
                        </div> 

                        <div className='flex flex-row items-start mt-[15px]   cursor-pointer justify-between w-full h-[50px]'>
                                <div className='flex flex-row gap-4'>
                                    <svg className='text-[#81919e]' viewBox="0 0 24 24" height="19" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" ><path fill="currentColor" d="M17.3,7.6h-0.9V5.8c0-2.5-1.9-4.4-4.4-4.4S7.6,3.3,7.6,5.8v1.8H6.7c-1,0-1.8,0.8-1.8,1.8v8.9 c0,1,0.8,1.8,1.8,1.8h10.6c1,0,1.8-0.8,1.8-1.8V9.4C19.1,8.4,18.3,7.6,17.3,7.6z M12,15.8c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S13.1,15.8,12,15.8z M14.7,7.6H9.2V5.8c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7v1.8C14.6,7.6,14.7,7.6,14.7,7.6z"></path></svg>
                                    <div className='flex flex-col'>
                                        <span className='text-[15px] font-[400]'>Encryption</span>
                                        <small className='text-[#81919e] text-[11px] w-[90%]'>Messages are end-to-end encryption Click to verify</small>
                                    </div>
                                </div>
                           
                        </div> 


                </div>

                <div className='flex flex-col  items-start h-full w-full   mt-[25px]'>
                    <div className='flex flex-row text-[#f15c6d] pt-0 cursor-pointer  pl-[34px] min-h-[50px] gap-6  hover:bg-gray-500/20  justify-start items-center w-full '>
                        <svg viewBox="0 0 24 24" height="21" width="21" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" ><path fill="currentColor" d="M12,2.8c-5.3,0-9.7,4.3-9.7,9.7s4.3,9.7,9.7,9.7s9.7-4.3,9.7-9.7S17.3,2.8,12,2.8z  M4.7,12.5c0-4,3.3-7.3,7.3-7.3c1.6,0,3.1,0.5,4.3,1.4L6.1,16.8C5.2,15.6,4.7,14.1,4.7,12.5z M12,19.8c-1.6,0-3-0.5-4.2-1.4 L17.9,8.3c0.9,1.2,1.4,2.6,1.4,4.2C19.3,16.5,16,19.8,12,19.8z"></path></svg>
                        <span className='text-sm'>Block {Ruser.name}</span>
                    </div>

                    <div className='flex flex-col  items-start h-full w-full'>
                        <div className='flex flex-row text-[#f15c6d] cursor-pointer  pt-0  pl-[34px] h-[50px] gap-6 hover:bg-gray-500/20  justify-start items-center w-full '>
                            <svg viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><g><g id="thumb-down"><path fill="currentColor" d="M14.091,4.2H6.318c-0.691,0-1.295,0.432-1.555,1.036l-2.591,6.132C2.086,11.541,2,11.714,2,11.973v1.641 l0,0V13.7c0,0.95,0.777,1.727,1.727,1.727h5.441L8.305,19.4c0,0.086,0,0.173,0,0.259c0,0.345,0.173,0.691,0.345,0.95l0.95,0.864 l5.7-5.7c0.345-0.345,0.518-0.777,0.518-1.209V5.927C15.818,4.977,15.041,4.2,14.091,4.2z M17.545,4.2v10.364H21V4.2H17.545z"></path></g></g></svg>                       
                            <span className='text-sm'>Report {Ruser.name}</span>
                        </div>
                    </div>
                    <div onClick={DeleteMessage} className='flex flex-col  items-start h-full w-full'>
                        <div className='flex flex-row text-[#f15c6d] cursor-pointer pl-[34px] h-[50px] gap-6  hover:bg-gray-500/20  justify-start items-center w-full '>
                            <svg viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M6,18c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H6V18z M19,3h-3.5l-1-1h-5l-1,1H5v2h14V3z"></path></svg>
                            <span className='text-sm'>Delete Chat</span>
                        </div>
                    </div>
                </div>
               
                                    
                        

                      
            </div>
        </div>
    </div>

  )
}
