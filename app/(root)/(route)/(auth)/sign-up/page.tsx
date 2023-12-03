"use client"
import Loder from "@/components/shared/main/Loder";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function Page() {
  const router = useRouter();
  const [LoginUserData,setLoginUserData]=useState({
    LoginMethod:"",
    password:"",
  })
  const [error,seterror]=useState("")
  const [loading,setLoading] =useState(false)
  


  async function  Login() {
    setLoading(true)
    seterror("")
    const res:any = await axios.post("http://localhost:8179/api/auth/sign-up", {LoginUserData});
    
    console.log(res);
    
  
    if(res.data.error){
      seterror(res.data.error);
      return setLoading(false)
    }
    if(res.data.user){
      seterror('')
      Cookies.set('token', res.data.token, { expires: 7, secure: false });
      router.push("/")
    }
  }

  
  const handleLogin = async(e: any) => {
    e.preventDefault();
  
    if (!LoginUserData.LoginMethod ||  !LoginUserData.password) {
      seterror('Please provide all required filed');
      return;
    }
    Login()
  };
  return (
      <div className="flex   bg-[#00a884] h-[31.5VH] w-screen flex-col ">
            <div className=" w-[389px] h-[138px] flex justify-end   ">
                <div className="flex flex-row items-center justify-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 39 39"><path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg>
                    <span className="text-white font-[600] text-[12px]">WHATSAPP WEB</span>
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-full">
              <div className="bg-white rounded-[4px] h-full w-[910px]  absolute top-[86px] flex  justify-center ">
                  <div className="pt-[65px] flex flex-col ">
                    <div>
                      <span className="text-[#41525d] text-2xl font-[200]">Sign up with WhatsApp</span>
                    </div>

                    <div className="flex  justify-center items-center">
                        <form className="pt-[20px] flex flex-col items-center gap-2" onSubmit={handleLogin}>
                            <div className="flex flex-col w-[244px] gap-1 ">
                              {/* 41525d  ; 029275*/}
                              <label htmlFor="username" className="text-[12px] text-[#029275] ">username or Phone</label>
                              <input onChange={(e)=>setLoginUserData({...LoginUserData,LoginMethod:e.target.value})} type="text" id="username" className="border text-[13px]  duration-500 focus:border-[#029275] border-gray-200 py-[9px] px-[9px] rounded-[5px] outline-none"/>
                            </div>

                        
                            
                            <div className="flex flex-col w-[244px] gap-1 ">
                              {/* 41525d  ; 029275*/}
                              <label htmlFor="password" className="text-[12px] text-[#029275] ">Password</label>
                              <input  onChange={(e)=>setLoginUserData({...LoginUserData,password:e.target.value})} type="password" id="username" className="border text-[13px]  duration-500 focus:border-[#029275] border-gray-200 py-[9px] px-[9px] rounded-[5px] outline-none"/>
                            </div>


                            <div className="flex flex-col items-center gap-3">
                                <div>
                                  <button type="submit" className="bg-[#029275] py-[8px] w-[80px] flex items-center justify-center rounded-[5px] text-white font-[500] text-[12px]">
                                    {
                                      loading?(
                                        <Loder/>

                                      ):(
                                        "Sign up"
                                      )
                                    }
                                  </button>
                                </div>
                                <Link href="/sign-in  ">
                                  <span className="text-[12px] text-[#029275]  cursor-pointer   ">No account yet?</span>
                                </Link>
                                <span className="text-red-500 text-[12px] font-[500]">{error}</span>


                            </div>
                        </form>
                    </div>
                      


                  </div>
              </div>
            </div>
        </div>
        
  )
}