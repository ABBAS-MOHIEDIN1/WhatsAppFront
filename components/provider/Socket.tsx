"use client"
import Axios from "@/lib/Axios";
import { CurrentUser } from "@/lib/CurrentUser";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {io} from "socket.io-client"
const Socket = createContext({});

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useRef<any>();
  const [socketEvent,setSocketEvent]=useState(false)
  const [messages,setMessages]=useState<any[]>()
  const [RecPerson,setRecPerson]=useState()
  const [ShowIamage,setShowIamage]=useState<any>()
 


  
  async function FetchMesssages(id: any) {
        try {
        if (id) {
            const res = await Axios.get(`/MessageRoute/FetchMesssage/${id}`);            
            setMessages(res?.data?.messages)
            setRecPerson(res?.data?.receiverPerson)
            return 
        }
        return [];
        } catch (error) {
        console.error(error);
        }
        
  }

  async function DeleteMessageSendSocket(messageID:any,Rec:any,currentIndex:any) {
    //  we use currentIndex insted of looping.
    socket.current.emit("send-Delet",{messageID,Rec,currentIndex})

    setMessages((prev:any)=>{

      prev[currentIndex].isDeleted=true;
      return [...prev]
    })
    
  }

  
  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data: any) => {
        
        setMessages((prevMessages: any) => {   
          return [...prevMessages, data.SendMessageData];
       });
      });

      socket.current.on("delete-msg",(data:any)=>{        
        setMessages((prevMessages: any) => {
          prevMessages[data.data.currentIndex].isDeleted = true;
          return [...prevMessages];
        });
      })
  
      setSocketEvent(true); // Run only once.
    }
  }, [socketEvent]);


  const handleFileChange = async (e: any) => {
        const selectedFile = e
    
        if (!selectedFile) {
            return;
        }
       
    
        const formData = new FormData();
        const originalFileName = selectedFile.name;
        const uniqueFileName = `${Date.now()}_${originalFileName}`;
        formData.append("file", selectedFile, uniqueFileName);
    
        try {
            const response = await Axios.post("/upload", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
         
            return uniqueFileName
        } catch (error) {
            console.log(error);
        }

        
    
       
    

  };
  function OnlineUser(id:any) {
      if (id) {
          socket.current = io('http://localhost:8179');
          // Emit to add user online.
          socket.current.emit("add-user", id);
        }
  }
  return (
    <Socket.Provider value={{ OnlineUser,socket,FetchMesssages,DeleteMessageSendSocket,messages,setMessages,RecPerson,setShowIamage,ShowIamage,handleFileChange,setSocketEvent }}>
      {children}
    </Socket.Provider>
  );
}

export const useSocket = () => useContext(Socket);
