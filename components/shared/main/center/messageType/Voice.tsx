"use client"
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'
import MessageStatus from '../MessageStatus';
import moment from 'moment';
import Image from 'next/image';
import WaveSurfer from 'wavesurfer.js';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface  Pars  {
    senderId: string;
    CurrentUserID: string;
    OpenMoreChat: boolean;
    setOpenMoreChat: (OpenMoreChat:boolean) => void | any; // Adjust this type if needed
    timestamp: Date;
    messageStatus:string,
    text:string;
    Voice:any,
    CurrentUserImg:string
    Ruser:any
};

export default function Voice({senderId,Ruser,CurrentUserID,OpenMoreChat,setOpenMoreChat,CurrentUserImg,timestamp,text,messageStatus,Voice}:Pars) {
    
    
  const [audiomessage,setaudiomessage]=useState<any>(null);
  const [isPlaying,setIsPlaying]=useState(false)
  const [currentPlayBacktime,setcurrentPlayBacktime ]=useState<any>(0);
  const [totalDuration,settotalDuration ]=useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

     
  const WaveFormRef:any =useRef(null)
  const waveform:any = useRef(null)


  const imageUrl = senderId ===CurrentUserID ?  `http://localhost:8179/imges/${CurrentUserImg}` :`http://localhost:8179/imges/${Ruser.image}`
 
  useEffect(() => {
    waveform.current = WaveSurfer.create({
        container: WaveFormRef.current,
        waveColor: '#4c8c80',
        progressColor: '#90b8b0',
        barWidth: 2,
        height: 30,
        cursorWidth:0
    });

    waveform?.current?.on('finish', () => {
        setIsPlaying(false);
    });

    return () => {
      waveform?.current?.destroy();
    };
  }, []);
    
  const handlePlaybackSpeedChange = (time: any) => {
    if (time <= 4) {
      setPlaybackSpeed(time);
      audiomessage.playbackRate = time;
      if (isPlaying) {
        // If the audio is currently playing, restart it with the new speed
        audiomessage.currentTime = 0;
        audiomessage.play();
      }
    } else {
      setPlaybackSpeed((playbackSpeed % 4) + 1);
    }
  };
  useEffect(() => {
        if(waveform){
            const audioURl = `http://localhost:8179/reqoreds/${Voice}`;
            const audio: any = new Audio(audioURl);
            audio.playbackRate = playbackSpeed; // Set the initial playback speed

            setaudiomessage(audio);
        
            waveform?.current?.load(audioURl);
        
            waveform?.current?.on('ready', () => {

            
                settotalDuration(waveform.current.getDuration());
            });
        }
   
    }, [Voice]);
    
  useEffect(() => {
      if (audiomessage) {
          const update = () => {
              // Calculate the adjusted playback time based on the original playback time and speed
              const adjustedTime = audiomessage.currentTime / audiomessage.playbackRate;
              setcurrentPlayBacktime(adjustedTime);
  
              // If the audio is playing, request the next animation frame
              if (isPlaying) {
                  requestAnimationFrame(update);
              }
          };
  
          audiomessage.addEventListener('timeupdate', update);
  
          return () => {
              audiomessage.removeEventListener('timeupdate', update);
          };
      }
  }, [audiomessage, isPlaying]);
  
  
    
    const FormatTime = (time: any) => {
        if (isNaN(time)) return '0:00';
        const min = Math.floor(time / 60);
        const second = Math.floor(time % 60);
        return `${min.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    };
    
    const handelPlayAuuo = () => {
        if (audiomessage) {
          waveform?.current?.stop();
          waveform?.current?.play();
          audiomessage?.play();
          setIsPlaying(true);
        }
    };

    
    
    const handelPussingAudio = () => {
      waveform.current.stop();
      audiomessage.pause();
      setIsPlaying(false);
  
      audiomessage.currentTime = currentPlayBacktime;
    };

    
      
      
  
    return (
    <div className={cn("p-[3px]  rounded-[8px] max-w-[65%] relative ",senderId===CurrentUserID?"bg-[#005c4b]":"bg-[#202c33]  ")}>
                <div onClick={()=>setOpenMoreChat(!OpenMoreChat)} className='hidden group-hover:flex animate-fade-left33 animate-once   cursor-pointer  animate-ease-in-out text-gray-400 absolute z-[9999] right-[2px] top-[0px]'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='  opacity-[0.90]' width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>
                </div>
                
               
                <div className=' relative flex flex-row  px-3 h-[60px] w-full  gap-4   items-center justify-center  '>
                   
                    <div className='flex items-center justify-center'>
                        {
                          isPlaying?(
                            <div onClick={()=>handlePlaybackSpeedChange(playbackSpeed+1)}  className='text-xs p-[3px] w-[45px] flex items-center justify-center bg-[#172229] rounded-[20px] cursor-pointer text-white'>

                                <span className=' cursor-pointer'>{playbackSpeed}x</span>

                            </div>
                          ):(
                            <img src={imageUrl} alt="userImg" className='cursor-pointer object-cover  rounded-full h-[55px] min-w-[55px]'/>

                          )
                        }
                    </div>
                   <div className='flex items-center   w-[210px] h-full'>
                      <div className=' cursor-pointer text-sm ml-1 flex flex-1   '>
                            {
                                isPlaying?(
                                    <svg onClick={handelPussingAudio} xmlns="http://www.w3.org/2000/svg" width="16px" height="18px" viewBox="0 0 16 18" className='text-white cursor-pointer'><path d="M1.9,1c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1H5c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H1.9z" fill="currentColor"></path><path fill="currentColor" d="M10.9,1c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1h3.1c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H10.9z"></path></svg>
                        
                                  ):(
                                    <svg onClick={handelPlayAuuo}  xmlns="http://www.w3.org/2000/svg" width="16px" height="18px" viewBox="0 0 16 18" className="text-white cursor-pointer"><path d="M15.05,8.39,2,.32a1,1,0,0,0-1.53.85V16.83A1,1,0,0,0,2,17.7L15,10.1A1,1,0,0,0,15.05,8.39Z" fill="currentColor"></path></svg>
                        
                                  )
                            }
                        </div>
                        <div className=' relative   flex  w-[175px]'>
                          <div className='w-full z-[1]  max-md:w-[90px] ' ref={WaveFormRef}/>
                            <div className='text-gray-400 text-[11px] pt-1 flex justify-between absolute bottom-[-15px] w-full ' >
                                <span>{FormatTime(isPlaying?currentPlayBacktime:totalDuration)}</span>
                            </div>
                        </div>
                      <div className='flex gap-1 items-end justify-end'>
                          <div className='flex items-center justify-center pt-1 gap-1 absolute bottom-0 right-0'>
                              <span className='text-gray-400 text-[10px] mt-2 min-w-fit'>{moment(timestamp).format('h:mm A')}</span>
                              <span className='mt-[7px]'>
                                <span><MessageStatus MessageStatu={messageStatus}/></span>
                              </span>
                          </div>
                      </div>
                   </div>
          </div>
                
    </div>
  )
}
