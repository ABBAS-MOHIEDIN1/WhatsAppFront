"use client"
import React, { useEffect, useState } from 'react'
import TopRight from './TopRight'
import SearchRight from './SearchRight'
import ChatItems from './ChatItems'
import Profile from '@/components/module/Profile'
import Communities from '@/components/module/Communities'
import Search from '@/components/module/Search'
import NewCommunity from '@/components/module/NewCommunity'
import Axios from '@/lib/Axios'
import { useQuery } from '@tanstack/react-query'
import { useOpenModels } from '@/hooks/OpenModels'
import { useSocket } from '@/components/provider/Socket'

export default function Right({User}:any) {
  
  const {Selected,SelectedId} = useOpenModels()
  const [SearchValue,setSearch]=useState<any>("")
  const [SearchResult,setSearchResult]=useState<any>()

  const {socket,socketEvent,setSocketEvent,OnlineUser}:any = useSocket()

  
  


  
  useEffect(()=>{
    if(User){
      OnlineUser(User.id)
    }
  },[User])


  async function fetchData () {
    try {
      const res = await Axios.get("/Users/FetchUsers")
      
      return res.data
    } catch (error) {
      console.log(error);
      
      return error
      
    }
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ['chat2'],
    queryFn: fetchData,
  })

  



  useEffect(() => {
    
    if(SearchValue){
      const filteredData = data?.filter((user: any) =>
        user.userData.name.toLowerCase().startsWith(SearchValue.toLowerCase())
      );
      setSearchResult(filteredData);
    }
 
    
    
  }, [SearchValue]);


  

  
  
  
  
  if(isLoading) {
    return(
      <div className='loading animate-fade-up animate-once animate-duration-500 animate-delay-500 animate-ease-in-out'></div>
    )

  }


  // const data =await fetchData()  
  
  
  
  
  return (
    // [409.5px]
    <div className='bg-[#111b21] relative  cursor-pointer flex flex-col  w-full  h-full  border-r border-gray-500/30 '>
      <TopRight User={User} />
      <SearchRight setSearch={setSearch}/>
      {SearchResult?.length !== 0&&<div className='flex flex-row text-white gap-[25px]  py-[10px] mt-[7px] px-[27px] items-center justify-start' >
        <svg viewBox="0 0 20 20" height="16" className='text-[#029275]' width="16" preserveAspectRatio="xMidYMid meet" fill="none"><path d="M18.54 3.23L17.15 1.55C16.88 1.21 16.47 1 16 1H4C3.53 1 3.12 1.21 2.84 1.55L1.46 3.23C1.17 3.57 1 4.02 1 4.5V17C1 18.1 1.9 19 3 19H17C18.1 19 19 18.1 19 17V4.5C19 4.02 18.83 3.57 18.54 3.23ZM4.24 3H15.76L16.57 3.97H3.44L4.24 3ZM3 17V6H17V17H3ZM11.45 8H8.55V11H6L10 15L14 11H11.45V8Z" fill="currentColor"></path></svg>
        <span className='text-[15px] font-[400] mt-[1px]'>Archived</span>
      </div>}
      {SearchResult?.length == 0&&<div className='flex flex-row  text-white gap-[25px]  py-[10px] mt-[19px] px-[28px] items-center justify-start' >
        <span className='text-[14px] font-[300] mt-[1px] text-[#029275]'>CHATS</span>
      </div>}
     { SearchResult?.length !== 0&&<div className='flex w-full items-end justify-end'>
          <div  className='w-[338px] h-[1px] bg-[#212c33] '/> 
      </div>}
      <div className=' flex flex-col gap-[0px] h-[465px]   overflow-y-scroll overflow-x-hidden'>
       
      {
        data.length === 0 ? (
          <div className='text-center flex items-center justify-center text-[#029275] h-full'>
            You do not have any current chats.
          </div>
        ) : (
          SearchValue&&SearchResult?.length !== 0 ? (
            // Render items based on SearchResult
            SearchResult?.map((per: any) => (
              <div key={per?.userData?.id} onClick={() => Selected(per?.userData?.id)}>
                <ChatItems
                  SelectedId={SelectedId}
                  name={per.userData.name}
                  lastseen={per?.lastMessage?.timestamp}
                  image={per.userData.image}
                  id={per.userData.id}
                  phone={per.userData.phone}
                  lastMessage={per.lastMessage.text}
                  typeMessage={per.lastMessage.type}
                  StatusMessage={per.lastMessage.messageStatus}
                  lastMessageSender={per.lastMessage.senderId}
                  currentUserId={User.id}


                />
              </div>
            ))
          ) : (
            // Render items based on original data
            data.map((per: any) => (
              <div key={per?.userData?.id} onClick={() => Selected(per?.userData?.id)}>
                <ChatItems
                  SelectedId={SelectedId}
                  name={per.userData.name}
                  lastseen={per?.lastMessage?.timestamp}
                  image={per.userData.image}
                  id={per.userData.id}
                  phone={per.userData.phone}
                  lastMessage={per.lastMessage.text}
                  typeMessage={per.lastMessage.type}
                  StatusMessage={per.lastMessage.messageStatus}
                  lastMessageSender={per.lastMessage.senderId}
                  currentUserId={User.id}

                />
              </div>
            ))
          )
        )
      }




      </div>
      <div>
        <Profile User={User}/>
        <Communities/>
        <Search/>
        <NewCommunity/>
      </div>
    </div>
  )
}
