


import Right from '@/components/shared/main/right/Right'
import {CurrentUser} from '@/lib/CurrentUser';
import Center from '@/components/shared/main/center/Center';
import { redirect } from 'next/navigation';
import SearchMessage from '@/components/module/chat/SearchMessage';


export default async function Home() {
  const user: any =await CurrentUser();
  
  
  




  return (
   <div className=' bg-[#0c1317]    w-screen h-screen flex items-center justify-center '>
      <div className=' w-[97.5%] h-[94.5%] max-xl:h-full max-xl:w-full  flex flex-row items-start justify-start '>
        {/* min-w-[409.5px]  */}
        {/* <div className='max-xl:max-w-[463px] box-border max-min-md:w-[400px] w-[583.5px] max-xl:h-full h-full'> */}
        <div className='max-w-[583.5px] sm:max-w-[400px] w-full h-full'>
          <Right User={user}/>
        </div>
        <div className='h-full w-full  '>
          <div className=' h-full  w-full '>
            <Center user={user}/>
          </div>
        </div>

       

      </div>
   </div>
  )
}

