import { useQuery } from "@tanstack/react-query";
import Axios from "./Axios";




export const FetchUsers = async()=>{
    async function fetchData () {
        const res = await Axios.get("/Users/FetchUsers")
        
        return res.data
    }
    
    
    const { data, isLoading, isError } = useQuery({
        queryFn:fetchData,
        queryKey:['usersWithData']
    
    });
    
    if (isLoading) {
        return isLoading;
    }

    
}