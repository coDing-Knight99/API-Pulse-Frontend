import React from 'react';
import { useState } from 'react';

import { Server, XIcon } from 'lucide-react';
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
const RegisterService = ({ setaddService, setloader, fetchServices }) => {
    const [serviceName, setserviceName] = useState('');
    const [url, seturl] = useState('');
    
    const isFormValid = serviceName.trim()!='' && url.trim()!='';
    const handleAdd = async()=>{
        try{
            const res = await axios.post("http://localhost:3000/register-service",{service_name: serviceName, url: url},{
                withCredentials: true,
            })
            toast("Service Added Successfully!",{className:"font-bold text-lg"})
            const data = res.data;
            console.log(data)
            fetchServices();
        }
        catch(error)
        {
            console.error("Error adding new Service",error)
        }
    }
  return (
    <div onClick={()=>{
        setaddService(false)
        document.body.classList.remove("overflow-hidden")
    }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
        <ToastContainer/>
      <div onClick={(e)=>{e.stopPropagation()}} className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/60 sm:p-8">
        <div className='flex items-start justify-between gap-4'>
        <div className='pb-8'>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/25">
                <Server size={22} />
            </div>
            <p className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>Add New Service</p>
            <p className='mt-2 text-sm text-slate-400 sm:text-base'>Register a new API service with API-Pulse.</p>
        </div>
        <div onClick={()=>{
                setaddService(false)
                document.body.classList.remove("overflow-hidden")
                console.log("I was Clicked")
            }} className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#151521] hover:text-white'>
            <XIcon size={18}/>
        </div>
        </div>
        <div className=''>
            <div className='flex flex-col gap-5'>
                <div className="grid gap-2">
                <label htmlFor="serviceName" className='text-sm font-semibold text-slate-300'>Service Name</label>
                <input onChange={(e)=>{setserviceName(e.target.value)}} type="text" id="serviceName" placeholder='e.g. User Management API' className='h-12 w-full rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10' />
                </div>
                <div className="grid gap-2">
                <label htmlFor="url" className='text-sm font-semibold text-slate-300'>URL</label>
                <input onChange={(e)=>{seturl(e.target.value)}} type="text" id="url" placeholder='e.g. https://api.example.com/users' className='h-12 w-full rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10' />
                </div>
                <div className='mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                    <button onClick={()=>{
                        setaddService(false)
                        document.body.classList.remove("overflow-hidden")
                    }} className='flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#20202a] px-5 text-sm font-semibold text-slate-300 transition hover:bg-[#151521] hover:text-white'>Cancel</button>
                    <button onClick={async()=>{
                        setloader(true);
                        await handleAdd();
                        setloader(false);
                        setaddService(false);
                        document.body.classList.remove("overflow-hidden")
                    }} disabled={isFormValid?false:true} className={`flex h-11 cursor-pointer items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition ${isFormValid?"bg-purple-500 shadow-lg shadow-purple-950/30 hover:bg-purple-400":"bg-slate-700 text-slate-400 cursor-not-allowed"}`}>Register Service</button>
                   </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterService;
