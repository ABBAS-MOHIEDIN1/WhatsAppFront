"use client"
import React, { useEffect, useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {  useOpenModels } from '@/hooks/OpenModels'
import axios from 'axios';
import Axios from '@/lib/Axios';
import { redirect, useRouter } from 'next/navigation';

export default function Search() {
    const [Search,setSearch]=useState("")
    const [Friends,setFriends]=useState<any>()
    const {type,onClose,isOpen,Selected,SelectedId} = useOpenModels()

    const handleClick = async (id: string) => {
        Selected(id);
        
    };
    
  
    // api call
    useEffect(()=>{
        async function SearchFriend(){
            try {
                const res = await Axios.get(`/Users/SearchUser/${Search}`)
                
                setFriends(res.data.users)
                return                
            } catch (error) {
                console.log(error);
                return
            }
        }
        if(Search) SearchFriend()

    },[Search])

    
 

    function closeit() {
        onClose();
    }
  return (
    <>
    {
        isOpen && type =="SearchChat"&& (
    <div className='max-xl:min-w-[463px] max-xl:h-full min-w-[409.5px]  overflow-hidden h-full bg-[#111b21] absolute top-0 left-0 cursor-default animate-fade-right animate-once animate-duration-1000 animate-ease-in-out'>
        <div className='bg-[#202c33] w-full min-h-[98px] flex justify-start items-end gap-[25px] pb-[15.5px] pl-[22px] text-white '>
            <svg onClick={closeit} className=' cursor-pointer' viewBox="0 0 24 24" height="23" width="23" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path></svg>
            <span className='text-[16px] font-[500] '>New Chat</span>
        </div>
        <div className='pl-[11px] pr-[12px] mt-[6.5px]'>
            <div className='flex flex-row items-center  justify-between w-full text-[#aebac1]'>
                <div className=' relative w-full '>
                    <input onChange={(e)=>setSearch(e.target.value)} value={Search} type="text" placeholder='Search or start new chat' className='bg-[#202c33] h-[31px] pl-[58px]   pt-[1px] rounded-[7px] outline-none border-0 w-full placeholder:text-[12px] text-[12px] font-[300]' />
                    <div className=' absolute top-[5px] left-[11px]'>
                        <svg viewBox="0 0 24 24" height="21" width="21" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"></path></svg>
                    </div>
                </div>
            </div>        
        </div>

        <div className=' overflow-y-scroll h-[90%]'>
            <div className='flex flex-col mt-2'>
                <div className='flex flex-row pt-[9px]  justify-start text-white bg-[#111b21] hover:bg-[#212c33]/80 min-h-[64px] gap-[14px] cursor-pointer px-[12px]'>
                    <div className='h-[43.5px] w-[43.5px] rounded-full  flex items-center justify-center bg-[#00a884] mb-[1px]'>
                        <svg viewBox="0 0 28 19" height="20" width="26" preserveAspectRatio="xMidYMid meet" fill="none"><path d="M20.0836 6.83416C20.0967 6.92827 20.1139 7.01977 20.1351 7.10996C20.1457 7.1557 20.1573 7.20014 20.1699 7.24328C20.1948 7.33103 20.2238 7.41741 20.257 7.50208C20.3057 7.62659 20.3631 7.74717 20.4287 7.86283C20.4722 7.93865 20.5191 8.01315 20.5692 8.08373C20.7191 8.29755 20.8986 8.48655 21.1018 8.64447C21.2385 8.74999 21.3846 8.84147 21.538 8.91765C21.6555 8.97548 21.7769 9.0244 21.9011 9.06404C21.9848 9.09019 22.0705 9.11241 22.1581 9.13071C22.3376 9.16709 22.52 9.18547 22.7028 9.1856C24.1656 9.1856 25.3514 7.93912 25.3514 6.40152C25.3514 4.86391 24.1656 3.61742 22.7028 3.61742C22.52 3.61691 22.3375 3.6353 22.1581 3.67233C22.0713 3.68975 21.9855 3.712 21.9011 3.73899C21.7769 3.77819 21.6556 3.82668 21.538 3.88408C21.1547 4.07401 20.8219 4.36045 20.5692 4.71799C20.5195 4.78988 20.4722 4.86308 20.4287 4.9402C20.3629 5.05573 20.3055 5.17632 20.257 5.30095C20.2243 5.38461 20.1948 5.47087 20.1699 5.55845C20.1573 5.60289 20.1457 5.64733 20.1351 5.69177C20.1139 5.78196 20.0967 5.87346 20.0836 5.96757C20.0442 6.25494 20.0442 6.54678 20.0836 6.83416ZM7.91635 6.83416C7.90392 6.92827 7.88614 7.01977 7.865 7.10996C7.85439 7.1557 7.84278 7.20014 7.83018 7.24328C7.80534 7.33103 7.77629 7.41741 7.74314 7.50208C7.69429 7.62657 7.63685 7.74714 7.57129 7.86283C7.52789 7.93865 7.48101 8.01315 7.4309 8.08373C7.28093 8.29748 7.10143 8.48648 6.89832 8.64447C6.76157 8.74999 6.6155 8.84147 6.46212 8.91765C6.34456 8.97548 6.22322 9.0244 6.09902 9.06404C6.01521 9.09019 5.92954 9.11241 5.842 9.13071C5.66247 9.16708 5.48007 9.18546 5.29723 9.1856C3.83446 9.1856 2.64865 7.93912 2.64865 6.40152C2.64865 4.86391 3.83446 3.61742 5.29723 3.61742C5.4801 3.61692 5.66256 3.63531 5.842 3.67233C5.92873 3.68976 6.01453 3.71202 6.09902 3.73899C6.22319 3.77819 6.34453 3.82668 6.46212 3.88407C6.84541 4.07401 7.17818 4.36045 7.4309 4.71799C7.48064 4.78988 7.52789 4.86308 7.57129 4.9402C7.63709 5.05575 7.69454 5.17634 7.74314 5.30095C7.77584 5.38461 7.80531 5.47087 7.83018 5.55845C7.8427 5.60289 7.8543 5.64733 7.865 5.69177C7.88614 5.78196 7.90342 5.87345 7.91635 5.96756C7.95581 6.25494 7.95581 6.54678 7.91635 6.83416ZM27.8468 13.6264C27.8143 13.5695 27.7783 13.5074 27.7345 13.4386C27.6874 13.3645 27.6342 13.2852 27.5732 13.2006C27.5122 13.1159 27.4447 13.026 27.3688 12.9334C27.2929 12.8409 27.21 12.7456 27.1189 12.6478C26.7459 12.251 26.3196 11.9112 25.8531 11.6388C25.7058 11.5515 25.5492 11.4695 25.3839 11.3915C25.3789 11.3888 25.3745 11.3875 25.3698 11.3848C23.4911 10.5737 21.3746 10.5737 19.4959 11.3848C19.4694 11.3967 19.4445 11.41 19.4188 11.4232C19.3767 11.443 19.3381 11.4655 19.2973 11.4867C19.3202 11.4999 19.3434 11.5118 19.3661 11.525C19.8316 11.7975 20.2733 12.1107 20.6865 12.4613C20.9563 12.6896 21.213 12.9338 21.4555 13.1926C21.6054 13.3513 21.7424 13.5087 21.8677 13.6621C21.9961 13.8195 22.1086 13.9663 22.2091 14.1064C22.3125 14.2506 22.4017 14.3842 22.4814 14.5071C22.5568 14.6262 22.6206 14.732 22.6757 14.8298C22.7802 15.0091 22.8581 15.2035 22.9069 15.4064L22.9274 15.5492H28V13.9319C27.9558 13.8266 27.9046 13.7245 27.8468 13.6264ZM18.1157 4.52771C18.0952 4.37973 18.0682 4.23574 18.0348 4.09441C18.0182 4.02375 17.9999 3.95309 17.9801 3.88376C17.9407 3.74511 17.895 3.61045 17.8436 3.47846C17.767 3.28285 17.6768 3.09346 17.5736 2.91184C17.5053 2.79185 17.4318 2.67585 17.3529 2.56386C16.957 2.00113 16.4338 1.55112 15.8306 1.25463C15.646 1.16345 15.4552 1.0868 15.2598 1.02531C15.1281 0.983983 14.9934 0.947986 14.8559 0.919988C14.5739 0.86243 14.2872 0.833328 13.9999 0.833328C11.6415 0.833328 9.83784 2.72918 9.83784 5.209C9.83784 7.68881 11.6415 9.58333 13.9999 9.58333C14.2872 9.58333 14.5739 9.55423 14.8559 9.49667C14.9934 9.46867 15.1281 9.43267 15.2598 9.39134C15.4552 9.32986 15.646 9.25321 15.8306 9.16203C16.4338 8.86554 16.957 8.41553 17.3529 7.85279C17.4317 7.7408 17.5052 7.62481 17.5736 7.50482C17.6768 7.3232 17.767 7.13381 17.8436 6.9382C17.8944 6.80621 17.9407 6.67022 17.9801 6.5329C17.9999 6.46357 18.0182 6.39291 18.0348 6.32224C18.0682 6.18092 18.0952 6.03693 18.1157 5.88894C18.1776 5.43753 18.1776 4.97913 18.1157 4.52771ZM21.7225 15.3648C21.6762 15.281 21.6229 15.1891 21.5605 15.0877C21.4934 14.9795 21.4164 14.8619 21.3294 14.7376C21.2424 14.6132 21.1454 14.4807 21.0376 14.3455C20.9298 14.2104 20.8111 14.0684 20.6809 13.9265C20.4718 13.6967 20.2507 13.4796 20.0186 13.2763C19.661 12.9642 19.2789 12.6852 18.8765 12.4422C18.6664 12.3152 18.4434 12.1935 18.2074 12.0799C18.2009 12.0758 18.1942 12.0722 18.1872 12.0691C17.0911 11.5419 15.713 11.1742 13.9997 11.1742C12.2865 11.1742 10.9082 11.5419 9.81226 12.0691C9.77405 12.0867 9.73928 12.107 9.70208 12.1259C9.54196 12.2057 9.38809 12.2895 9.2402 12.3746C9.16004 12.4219 9.08166 12.4693 9.00506 12.5166C8.64626 12.7423 8.30392 12.9962 7.98093 13.2763C7.74876 13.4796 7.52762 13.6967 7.31855 13.9265C7.18863 14.0684 7.07003 14.209 6.96189 14.3455C6.85374 14.4821 6.75694 14.6118 6.66994 14.7376C6.58293 14.8633 6.50612 14.9795 6.439 15.0877C6.37658 15.1891 6.32333 15.281 6.2771 15.3648C6.27277 15.3713 6.26882 15.3781 6.26525 15.3851C6.21659 15.4729 6.17698 15.55 6.14564 15.6135C6.08297 15.7406 6.05405 15.8122 6.05405 15.8122V18.3333H21.9459V15.8122C21.8797 15.6586 21.8051 15.5092 21.7225 15.3648ZM5.08137 15.4078C5.09313 15.3077 5.1252 15.2113 5.17549 15.1248C5.2147 15.0481 5.24415 14.9556 5.30522 14.8485C5.37299 14.7308 5.42635 14.6263 5.50041 14.5087C5.57974 14.3844 5.66499 14.2508 5.76708 14.1094C5.86918 13.9679 5.98079 13.8185 6.10628 13.6651C6.23177 13.5117 6.36961 13.3531 6.52044 13.1918C7.09885 12.5757 7.75594 12.0433 8.4737 11.6091C8.54828 11.5641 8.62517 11.5192 8.7027 11.4756C8.66914 11.4584 8.63841 11.4399 8.60357 11.424C8.57785 11.4108 8.55213 11.3975 8.52642 11.3856C7.60024 10.9683 6.59752 10.7608 5.58643 10.7774C4.57538 10.7608 3.57271 10.9683 2.64657 11.3856C2.64168 11.3883 2.63731 11.3896 2.63243 11.3923C2.46681 11.4703 2.31007 11.5522 2.16259 11.6395C1.88006 11.8047 1.6118 11.9945 1.36077 12.2067C1.19789 12.345 1.04254 12.4925 0.895433 12.6483C0.804141 12.7462 0.720736 12.8414 0.645216 12.9339C0.569482 13.0265 0.501335 13.1164 0.440259 13.201C0.379183 13.2856 0.32518 13.365 0.277991 13.439C0.234273 13.5078 0.192871 13.5699 0.16034 13.6268C0.0524608 13.8145 0 13.9322 0 13.9322V15.5492H5.07198L5.08137 15.4078Z" fill="white"></path></svg>
                    </div>
                    <span className='text-[14px] font-[400] pt-[10px]'>New group</span>
                </div>
                <div className='flex w-full items-end justify-end'>
                    <div  className='w-[338px] h-[1px] bg-[#212c33] '/> 
                </div>
            
                <div className='flex flex-row pt-[9px] mt-[3px] justify-start text-white bg-[#111b21] hover:bg-[#212c33]/80 h-[64px] gap-[14px] cursor-pointer px-[12px]'>
                    <div className='h-[43.5px] w-[43.5px] rounded-full  flex items-center justify-center bg-[#00a884] mb-[1px]'>
                        <svg viewBox="0 0 28 19" height="20" width="26" preserveAspectRatio="xMidYMid meet" fill="none"><path d="M20.0836 6.83416C20.0967 6.92827 20.1139 7.01977 20.1351 7.10996C20.1457 7.1557 20.1573 7.20014 20.1699 7.24328C20.1948 7.33103 20.2238 7.41741 20.257 7.50208C20.3057 7.62659 20.3631 7.74717 20.4287 7.86283C20.4722 7.93865 20.5191 8.01315 20.5692 8.08373C20.7191 8.29755 20.8986 8.48655 21.1018 8.64447C21.2385 8.74999 21.3846 8.84147 21.538 8.91765C21.6555 8.97548 21.7769 9.0244 21.9011 9.06404C21.9848 9.09019 22.0705 9.11241 22.1581 9.13071C22.3376 9.16709 22.52 9.18547 22.7028 9.1856C24.1656 9.1856 25.3514 7.93912 25.3514 6.40152C25.3514 4.86391 24.1656 3.61742 22.7028 3.61742C22.52 3.61691 22.3375 3.6353 22.1581 3.67233C22.0713 3.68975 21.9855 3.712 21.9011 3.73899C21.7769 3.77819 21.6556 3.82668 21.538 3.88408C21.1547 4.07401 20.8219 4.36045 20.5692 4.71799C20.5195 4.78988 20.4722 4.86308 20.4287 4.9402C20.3629 5.05573 20.3055 5.17632 20.257 5.30095C20.2243 5.38461 20.1948 5.47087 20.1699 5.55845C20.1573 5.60289 20.1457 5.64733 20.1351 5.69177C20.1139 5.78196 20.0967 5.87346 20.0836 5.96757C20.0442 6.25494 20.0442 6.54678 20.0836 6.83416ZM7.91635 6.83416C7.90392 6.92827 7.88614 7.01977 7.865 7.10996C7.85439 7.1557 7.84278 7.20014 7.83018 7.24328C7.80534 7.33103 7.77629 7.41741 7.74314 7.50208C7.69429 7.62657 7.63685 7.74714 7.57129 7.86283C7.52789 7.93865 7.48101 8.01315 7.4309 8.08373C7.28093 8.29748 7.10143 8.48648 6.89832 8.64447C6.76157 8.74999 6.6155 8.84147 6.46212 8.91765C6.34456 8.97548 6.22322 9.0244 6.09902 9.06404C6.01521 9.09019 5.92954 9.11241 5.842 9.13071C5.66247 9.16708 5.48007 9.18546 5.29723 9.1856C3.83446 9.1856 2.64865 7.93912 2.64865 6.40152C2.64865 4.86391 3.83446 3.61742 5.29723 3.61742C5.4801 3.61692 5.66256 3.63531 5.842 3.67233C5.92873 3.68976 6.01453 3.71202 6.09902 3.73899C6.22319 3.77819 6.34453 3.82668 6.46212 3.88407C6.84541 4.07401 7.17818 4.36045 7.4309 4.71799C7.48064 4.78988 7.52789 4.86308 7.57129 4.9402C7.63709 5.05575 7.69454 5.17634 7.74314 5.30095C7.77584 5.38461 7.80531 5.47087 7.83018 5.55845C7.8427 5.60289 7.8543 5.64733 7.865 5.69177C7.88614 5.78196 7.90342 5.87345 7.91635 5.96756C7.95581 6.25494 7.95581 6.54678 7.91635 6.83416ZM27.8468 13.6264C27.8143 13.5695 27.7783 13.5074 27.7345 13.4386C27.6874 13.3645 27.6342 13.2852 27.5732 13.2006C27.5122 13.1159 27.4447 13.026 27.3688 12.9334C27.2929 12.8409 27.21 12.7456 27.1189 12.6478C26.7459 12.251 26.3196 11.9112 25.8531 11.6388C25.7058 11.5515 25.5492 11.4695 25.3839 11.3915C25.3789 11.3888 25.3745 11.3875 25.3698 11.3848C23.4911 10.5737 21.3746 10.5737 19.4959 11.3848C19.4694 11.3967 19.4445 11.41 19.4188 11.4232C19.3767 11.443 19.3381 11.4655 19.2973 11.4867C19.3202 11.4999 19.3434 11.5118 19.3661 11.525C19.8316 11.7975 20.2733 12.1107 20.6865 12.4613C20.9563 12.6896 21.213 12.9338 21.4555 13.1926C21.6054 13.3513 21.7424 13.5087 21.8677 13.6621C21.9961 13.8195 22.1086 13.9663 22.2091 14.1064C22.3125 14.2506 22.4017 14.3842 22.4814 14.5071C22.5568 14.6262 22.6206 14.732 22.6757 14.8298C22.7802 15.0091 22.8581 15.2035 22.9069 15.4064L22.9274 15.5492H28V13.9319C27.9558 13.8266 27.9046 13.7245 27.8468 13.6264ZM18.1157 4.52771C18.0952 4.37973 18.0682 4.23574 18.0348 4.09441C18.0182 4.02375 17.9999 3.95309 17.9801 3.88376C17.9407 3.74511 17.895 3.61045 17.8436 3.47846C17.767 3.28285 17.6768 3.09346 17.5736 2.91184C17.5053 2.79185 17.4318 2.67585 17.3529 2.56386C16.957 2.00113 16.4338 1.55112 15.8306 1.25463C15.646 1.16345 15.4552 1.0868 15.2598 1.02531C15.1281 0.983983 14.9934 0.947986 14.8559 0.919988C14.5739 0.86243 14.2872 0.833328 13.9999 0.833328C11.6415 0.833328 9.83784 2.72918 9.83784 5.209C9.83784 7.68881 11.6415 9.58333 13.9999 9.58333C14.2872 9.58333 14.5739 9.55423 14.8559 9.49667C14.9934 9.46867 15.1281 9.43267 15.2598 9.39134C15.4552 9.32986 15.646 9.25321 15.8306 9.16203C16.4338 8.86554 16.957 8.41553 17.3529 7.85279C17.4317 7.7408 17.5052 7.62481 17.5736 7.50482C17.6768 7.3232 17.767 7.13381 17.8436 6.9382C17.8944 6.80621 17.9407 6.67022 17.9801 6.5329C17.9999 6.46357 18.0182 6.39291 18.0348 6.32224C18.0682 6.18092 18.0952 6.03693 18.1157 5.88894C18.1776 5.43753 18.1776 4.97913 18.1157 4.52771ZM21.7225 15.3648C21.6762 15.281 21.6229 15.1891 21.5605 15.0877C21.4934 14.9795 21.4164 14.8619 21.3294 14.7376C21.2424 14.6132 21.1454 14.4807 21.0376 14.3455C20.9298 14.2104 20.8111 14.0684 20.6809 13.9265C20.4718 13.6967 20.2507 13.4796 20.0186 13.2763C19.661 12.9642 19.2789 12.6852 18.8765 12.4422C18.6664 12.3152 18.4434 12.1935 18.2074 12.0799C18.2009 12.0758 18.1942 12.0722 18.1872 12.0691C17.0911 11.5419 15.713 11.1742 13.9997 11.1742C12.2865 11.1742 10.9082 11.5419 9.81226 12.0691C9.77405 12.0867 9.73928 12.107 9.70208 12.1259C9.54196 12.2057 9.38809 12.2895 9.2402 12.3746C9.16004 12.4219 9.08166 12.4693 9.00506 12.5166C8.64626 12.7423 8.30392 12.9962 7.98093 13.2763C7.74876 13.4796 7.52762 13.6967 7.31855 13.9265C7.18863 14.0684 7.07003 14.209 6.96189 14.3455C6.85374 14.4821 6.75694 14.6118 6.66994 14.7376C6.58293 14.8633 6.50612 14.9795 6.439 15.0877C6.37658 15.1891 6.32333 15.281 6.2771 15.3648C6.27277 15.3713 6.26882 15.3781 6.26525 15.3851C6.21659 15.4729 6.17698 15.55 6.14564 15.6135C6.08297 15.7406 6.05405 15.8122 6.05405 15.8122V18.3333H21.9459V15.8122C21.8797 15.6586 21.8051 15.5092 21.7225 15.3648ZM5.08137 15.4078C5.09313 15.3077 5.1252 15.2113 5.17549 15.1248C5.2147 15.0481 5.24415 14.9556 5.30522 14.8485C5.37299 14.7308 5.42635 14.6263 5.50041 14.5087C5.57974 14.3844 5.66499 14.2508 5.76708 14.1094C5.86918 13.9679 5.98079 13.8185 6.10628 13.6651C6.23177 13.5117 6.36961 13.3531 6.52044 13.1918C7.09885 12.5757 7.75594 12.0433 8.4737 11.6091C8.54828 11.5641 8.62517 11.5192 8.7027 11.4756C8.66914 11.4584 8.63841 11.4399 8.60357 11.424C8.57785 11.4108 8.55213 11.3975 8.52642 11.3856C7.60024 10.9683 6.59752 10.7608 5.58643 10.7774C4.57538 10.7608 3.57271 10.9683 2.64657 11.3856C2.64168 11.3883 2.63731 11.3896 2.63243 11.3923C2.46681 11.4703 2.31007 11.5522 2.16259 11.6395C1.88006 11.8047 1.6118 11.9945 1.36077 12.2067C1.19789 12.345 1.04254 12.4925 0.895433 12.6483C0.804141 12.7462 0.720736 12.8414 0.645216 12.9339C0.569482 13.0265 0.501335 13.1164 0.440259 13.201C0.379183 13.2856 0.32518 13.365 0.277991 13.439C0.234273 13.5078 0.192871 13.5699 0.16034 13.6268C0.0524608 13.8145 0 13.9322 0 13.9322V15.5492H5.07198L5.08137 15.4078Z" fill="white"></path></svg>
                    </div>
                    <span className='text-[14px] font-[400] pt-[10px]'>New community</span>
                </div>
                <div className='flex w-full items-end justify-end'>
                    <div  className='w-[338px] h-[1px] bg-[#212c33] '/> 
                </div>
                <div className='pt-[26px] pl-[28px] uppercase font-[400] text-[15px] text-[#008069]'>contacts on whatsapp</div>
                <div className='flex w-full items-end justify-end mt-[15.9px]'>
                    <div  className='w-[338px] h-[1px] bg-[#212c33] '/> 
                </div>
                <div className='flex flex-col  gap-1'> 
                    {
                        Friends && Friends?.map((per:any)=>{
                            return(
                                // FetchChat({to:per.id})
                                <div key={per.id} onClick={()=>handleClick(per.id)} className='text-white min-h-[65px]  cursor-pointer w-full hover:bg-[#212c33]  group flex items-center justify-start  animate-pulse animate-once animate-duration-1000 animate-delay-1000 animate-ease-in-out'>
                                    <div className='pl-[10px] pr-[19px] relative flex flex-row items-center justify-start w-full'>
                                        <div className=' w-[72px]'>
                                            <Avatar className={"w-[45px] h-[45px] cursor-pointer"}>
                                                <AvatarImage src={per.image ? `http://localhost:8179/imges/${per.image}` : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"} alt="@shadcn" />
                                                <AvatarFallback>{per.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className='flex flex-col items-start  w-full gap-[1px]'>
                                            <div className='flex flex-row justify-between w-full mt-[2px]'>
                                                <span className='text-[15px] font-[400]'>{per.name || per.phone}</span>
                                            </div>
                                            <div className='flex flex-row justify-between w-full '>
                                                <span className='text-[11px] font-[300] text-gray-400 '>{per.about}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
       
      
        


   
    </div>
        )
    }
    
    </>
  )
}
