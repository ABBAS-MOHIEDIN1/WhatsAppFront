"use client"
import React, { useEffect, useState } from 'react'
import SingleChat from './SingleChat'

export default function ChatContainer({data,CurrentUser,user}:any) {

  


  
  return (
   <>
   {
    data?.map((per:any,index:any)=>{
      return(
          <div key={index}>
              <SingleChat per={per} currentIndex={index} Ruser={user} CurrentUser={CurrentUser}  />
          </div> 
      )
    })
   }
   
   </>
    
   
  )
}



  


