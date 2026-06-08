import React from 'react'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
const ProtectedRoute = ({children}) => {
    const [isLoading, setisLoading] = useState(true);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    useEffect(() => {
        const checkValid=async()=>{
            try{
                const res = await axios("http://localhost:3000/loginstatus");
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
