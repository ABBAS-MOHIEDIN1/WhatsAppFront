import Axios from "./Axios";
import {redirect} from 'next/navigation';


const CurrentUser = async ()=>{





    
    try {
        const response = await Axios.get('/auth/FetchUser')       
        
        
        
        return response.data
    } catch (error) {
        redirect("/sign-up"); 
        console.log(error);
    }


}

export  {CurrentUser}