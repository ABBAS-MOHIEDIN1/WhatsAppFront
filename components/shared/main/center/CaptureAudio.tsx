"use client"
import Axios from '@/lib/Axios';
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default  function CaptureAudio({setShowAudioRecordComponent,SetSendMessageData,userInfo,SendMessageData,SendToServer}:any) {

    // 


  const [isRecording,setisRecording]=useState(false);
  const [RecordAudios,setRecordAudios]=useState<any>(null);
  const [WaveForm,setWaveForm]=useState<any>(null);
  const [RecordingDuration,setRecordingDuration ]=useState(0);
  const [currentPlayBacktime,setcurrentPlayBacktime ]=useState<any>(0);
  const [totalDuration,settotalDuration ]=useState(0);
  const [isPlaying,setIsPlaying]=useState(false)

  const[RenderAudio,setRenderAudio]=useState(null)

  const audioRef:any =useRef(null)
  const mediaRecordRed:any =useRef(null)
  const WaveFormRef =useRef(null)

  useEffect(()=>{
    let interval:any;
    if(isRecording){
      interval = setInterval(()=>{
        setRecordingDuration((prev)=>{
          settotalDuration(prev+1);
          return prev +1;
        })
      },1000)
    }
    return ()=>{
      clearInterval(interval)
    }
  },[isRecording])
  useEffect(() => {
    if (WaveFormRef.current) {
      const WaveSurfRef = WaveSurfer.create({
        container: WaveFormRef.current,
        waveColor: '#ccc',
        progressColor: '#4a9eff',
        barWidth: 2,
        height: 30,
      });
  
      setWaveForm(WaveSurfRef);
  
      WaveSurfRef.on("finish", () => {
        setIsPlaying(false);
      });
  
      return () => {
        WaveSurfRef.destroy();
      };
    }
  }, [WaveFormRef]);
  


  useEffect(() => {
    if (WaveForm) {
      handelStartRecording();
    }
  }, [WaveForm]);



  useEffect(()=>{
    if(RecordAudios){
      const update = ()=>{
        setcurrentPlayBacktime(RecordAudios.currentTime);
      }
      RecordAudios.addEventListener("timeupdate",update)
      return ()=>{
        RecordAudios.addEventListener("timeupdate",update)

      }
    }

  },[RecordAudios])
  
  const handelPlayRecording = () => {
    if (RecordAudios) {
      WaveForm.stop();
      WaveForm.play();
      RecordAudios.play();
      setIsPlaying(true);
    }
  };

  const handelPussingRecording = () => {
    WaveForm.stop();
    RecordAudios.pause();
    setIsPlaying(false);

  };



  
  const handelStopRecording = ()=>{
    if(mediaRecordRed.current && isRecording){
      mediaRecordRed.current.stop();
      setisRecording(false);
      WaveForm.stop();

      const audioChunks:any=[]
      mediaRecordRed.current.addEventListener("dataavailable", (event: any) => {
        audioChunks.push(event.data);
      });
      
      mediaRecordRed.current.addEventListener("stop",()=>{
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioFile:any =new File([audioBlob],`${userInfo.name}-${Date.now()}_recording.mp3`)
        setRenderAudio(audioFile)
      })

    }
  } 


  const handelStartRecording = () => {
    // handelPussingRecording()
    setRecordingDuration(0);
    setcurrentPlayBacktime(0);
    settotalDuration(0);
    setisRecording(true);
    setRecordAudios(null);
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream: any) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecordRed.current = mediaRecorder;
        audioRef.current.srcObject = stream;
        const chunks: any = [];
  
        mediaRecorder.addEventListener("dataavailable", (e) => chunks.push(e.data));
  
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
  
          setRecordAudios(audio);
          WaveForm.load(audioUrl);
        };
  
        mediaRecorder.start();
      })
      .catch(err => {
        console.log(err);
      });
  };

  

   const Send = async()=>{
    try {
      const formData:any = new FormData()
      formData.append("audio",RenderAudio)
      const response = await Axios.post("/uploadVoice",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      if(response.status===200){
        
        const newState = { ...SendMessageData, Voice: response.data.newFileName };

        
        await SendToServer(newState)

        setShowAudioRecordComponent(false)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const FormatTime=(time:any)=>{
    if(isNaN(time)) return "0:00";
    const min =  Math.floor(time/60);
    const second =  Math.floor(time%60);
    return `${min.toString().padStart(2,"0")}:${second.toString().padStart(2,"0")}`

  }


  return (
    <div className='h-[54px] flex text-2xl pr-[5px] w-full  justify-end items-center'>
      <div  onClick={()=>setShowAudioRecordComponent(false)}className='pt-1 flex items-center justify-center h-full   cursor-pointer'>
        <svg className='text-[#8696a0] fill-[#8696a0]' width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" ><path d="M5,0,3,2H0V4H16V2H13L11,0ZM15,5H1V19.5A2.5,2.5,0,0,0,3.5,22h9A2.5,2.5,0,0,0,15,19.5Z" fill="currentColor"></path></svg>
      </div>

      <div className='ml-4 mr-2 py-1 px-4 text-white min-w-[100px] text-[14px] flex gap-3 justify-end  items-center bg-[#3b4a54] rounded-[20px]'>
        {
          !isRecording&&(
            isPlaying?(
              <svg onClick={handelPussingRecording} xmlns="http://www.w3.org/2000/svg" width="16px" height="18px" viewBox="0 0 16 18" className='text-[#8696a0] cursor-pointer'><path d="M1.9,1c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1H5c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H1.9z" fill="currentColor"></path><path fill="currentColor" d="M10.9,1c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1h3.1c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H10.9z"></path></svg>
  
            ):(
              <svg onClick={handelPlayRecording}  xmlns="http://www.w3.org/2000/svg" width="16px" height="18px" viewBox="0 0 16 18" className="text-[#8696a0] cursor-pointer"><path d="M15.05,8.39,2,.32a1,1,0,0,0-1.53.85V16.83A1,1,0,0,0,2,17.7L15,10.1A1,1,0,0,0,15.05,8.39Z" fill="currentColor"></path></svg>
  
            )
          )
        }
        {
          isRecording&&(
            <div className='text-red-500 text-center animate-pulse animate-infinite animate-duration-[1300ms] animate-delay-[1300ms] animate-ease-in-out'>Recording <span>{RecordingDuration}s</span></div>
          )
        }
        
        <div className='w-60' ref={WaveFormRef} hidden={isRecording}/>
        {
          RecordAudios && 
            isPlaying && (<span>{FormatTime(currentPlayBacktime)}</span>)
        }
        {
          RecordAudios && !isPlaying &&(<span>{FormatTime(totalDuration)}</span>)
        }
        <audio ref={audioRef} hidden />
        
      </div>
      <div>
        { !isRecording?(<span onClick={handelStartRecording}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className='text-red-500 cursor-pointer' width={28} height={28}><path fill="currentColor" d="M16,4c1.9,0,3.4,1.4,3.4,3.1v8.6c0,1.7-1.5,3.1-3.4,3.1 c-1.9,0-3.4-1.4-3.4-3.1V7.1C12.6,5.4,14.1,4,16,4"></path><path fill="currentColor" d="M16.3,23.4c-0.2,0-0.6,0-0.9,0l-0.3,0c-3.7-0.4-6.6-3.7-7.1-7.8 L8,15.2c0-0.5,0.3-0.9,0.8-0.9h0.4c0.5,0,0.8,0.4,0.9,0.9l0.1,0.4c0.5,3.1,3,5.5,5.9,5.5c2.9,0,5.3-2.3,5.9-5.4l0.1-0.4 c0-0.5,0.4-0.9,0.9-0.9h0.4c0.4,0,0.8,0.4,0.8,0.9c0,0,0,0.1-0.1,0.6c-0.6,4.1-3.7,7.3-7.4,7.6L16.3,23.4z"></path><path fill="currentColor" d="M17.1,27.3c0,0.4-0.4,0.7-0.9,0.7h-0.5c-0.5,0-0.9-0.3-0.9-0.7V23 c0-0.4,0.4-0.7,0.9-0.7h0.5c0.5,0,0.9,0.3,0.9,0.7V27.3z"></path></svg>

        </span>):(
        <span onClick={handelStopRecording}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="16px" className='text-red-500 cursor-pointer' viewBox="0 0 16 18"><path d="M1.9,1c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1H5c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H1.9z" fill="currentColor"></path><path fill="currentColor" d="M10.9,1c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1h3.1c0.6,0,1-0.4,1-1V2c0-0.6-0.4-1-1-1H10.9z"></path></svg>
        </span>
        )}
      </div>

      <div className='mx-2' onClick={Send}>
          <div className='bg-[#00a884]  rounded-full p-1 min-w-[35px] min-h-[35px] flex items-center justify-center cursor-pointer'>
            <svg viewBox="0 0 24 24" height="18" width="18"  className='text-white' preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>

          </div>
      </div>
      
    </div>
  )
}
