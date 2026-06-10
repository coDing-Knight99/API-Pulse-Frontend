import React from 'react'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
const ProtectedRoute = ({children}) => {
    const [isLoading, setisLoading] = useState(true);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const BASE_URL=import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        const checkValid=async()=>{
            try{
                const res = await axios(`${BASE_URL}/loginstatus`,{
                    withCredentials:true,
                });
                setisAuthenticated(res.data.isLogin);
            }catch(error)
            {
                console.error("Error checking login status",error);
                setisAuthenticated(false);
            }
            finally{
                setisLoading(false);
            }
        }
        checkValid();
    }, [])
    
    if(isLoading){
        return <Loader/>
    }
    if(!isAuthenticated)
    {
        console.log("User is not authenticated, redirecting to login page.");
        return <Navigate to='/login' replace/>
    }
    return children;
};

export default ProtectedRoute
