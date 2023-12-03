"use client"
import { useChatModel } from '@/hooks/UseChatModel'
import React, { useEffect, useState } from 'react'

// SearchMessage
export default function SearchMessage({messages}:any) {
  const [SearchState,setSearchState]=useState("")
  const [Result,setResult]=useState<any>()
  const { onClose,type,isOpen } = useChatModel()
  useEffect(() => {
    
    if(SearchState){
      const filteredData = messages?.filter((message: any) =>
        message.text.toLowerCase().startsWith(SearchState.toLowerCase()) && !message.isDeleted
      );
      // Do something with filteredData (e.g., update state)
      setResult(filteredData);
    }
    console.log(Result);
    console.log(messages);
    
    

    
    
  }, [SearchState]);
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  
 
  
  return (
    <div className=' w-full flex flex-col text-white h-full bg-[#111b21] border-l border-gray-200/20 '>
        <div className='bg-[#202c33] pl-[22px]  flex flex-row items-center gap-7 min-h-[53.5px]   z-[10]'>
            <div onClick={onClose} className='text-[#6b7a83] cursor-pointer'>
                <svg viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet" fill="currentColor" ><path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z"></path></svg>
            </div>
            <div className='text-sm font-[300]'>
              <span>Search Messages</span>
            </div>
        </div>  
        <div className='w-full flex items-center justify-center mt-[6px]'>
          <div className=' relative w-[94.7%]  text-[#6b7a83]'>
              <input onChange={(e)=>setSearchState(e.target.value)} type="text" placeholder='Search...' className='bg-[#202c33] text-white  h-[32px] pl-[58px]   pt-[1px] rounded-[7px] outline-none border-0 w-full placeholder:text-[12px] text-[12px] font-[300]' />
              <div className=' absolute top-[5.5px] left-[11px]'>
                  <svg viewBox="0 0 24 24" height="21" width="21" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"></path></svg>
              </div>
          </div>
        </div>


        {
          Result?.length === 0 ?(
            <div className='text-[#6b7a83] h-[165px] flex w-full flex-col items-center justify-center text-xs'>
              <span>Search for messages within Ahmed</span>
            </div>
          ):(
            <div className='flex flex-col  w-full  mt-[6px] text-[#6b7a83]' >
              {
                Result?.map((e: any) => (
                  <div className='hover:bg-[#202c33] h-[65px] '>
                    <div key={e.id} className='pl-[15px] gap-1  transition-colors cursor-pointer flex flex-col justify-center h-full '>
                      <span className='text-[11px]'>{formatTimestamp(e.timestamp)}</span>
                      <span className='text-xs'>
                        {e.text.split('').map((char: string, index: number) => (
                          <span
                            key={index}
                            className={`${char.toLowerCase() === SearchState[index]?.toLowerCase() && 'text-[#01a684]'}`}
                          >
                            {char}
                          </span>
                      ))}
                    </span>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
    </div>
  )
}
