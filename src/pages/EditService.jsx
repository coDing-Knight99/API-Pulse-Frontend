import React from 'react';
import { useState } from 'react';

import { Power, Server, XIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
const EditService = ({ service, setEditService, setloader, fetchServices }) => {
    const [serviceName, setserviceName] = useState(service?.service_name || '');
    const [url, seturl] = useState(service?.url || '');
    const [isActive, setIsActive] = useState(service?.isActive ?? true);
    
    const isFormValid = serviceName.trim()!='' && url.trim()!='';
    const handleAdd = async()=>{
        try{
            const res = await axios.post("http://localhost:3000/edit-service",{serviceId: service?._id, service_name: serviceName, url: url, isActive: isActive },{
                withCredentials: true,
            })
            toast("Service Edited Successfully!",{className:"font-bold text-lg"})
            const data = res.data;
            console.log(data)
            setloader(true);
            fetchServices();
            setEditService(null);
            setloader(false);
        }
        catch(error)
        {
            console.error("Error editing Service",error)
        }
    }
  return (
    <div onClick={()=>{
        setEditService(null)
        document.body.classList.remove("overflow-hidden")
    }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <div onClick={(e)=>{e.stopPropagation()}} className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/60 sm:p-8">
        <div className='flex items-start justify-between gap-4'>
        <div className='pb-8'>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/25">
                <Server size={22} />
            </div>
            <p className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>Edit Service</p>
        </div>
        <div onClick={()=>{
                setEditService(null)
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
                <input value={serviceName} onChange={(e)=>{setserviceName(e.target.value)}} type="text" id="serviceName" placeholder={service?.service_name || 'e.g. User Management API'} className='h-12 w-full rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10' />
                </div>
                <div className="grid gap-2">
                <label htmlFor="url" className='text-sm font-semibold text-slate-300'>URL</label>
                <input value={url} onChange={(e)=>{seturl(e.target.value)}} type="text" id="url" placeholder={service?.url || 'e.g. https://api.example.com/users'} className='h-12 w-full rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10' />
                </div>
                <button
                    type="button"
                    onClick={() => setIsActive((currentStatus) => !currentStatus)}
                    className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition ${
                        isActive
                            ? "border-rose-400/30 bg-rose-400/10 text-rose-300 hover:bg-rose-400/15"
                            : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15"
                    }`}
                >
                    <Power size={16} />
                    {isActive ? "Deactivate Service" : "Activate Service"}
                </button>
                <div className='mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                    <button onClick={()=>{
                        setEditService(null)
                        document.body.classList.remove("overflow-hidden")
                    }} className='flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#20202a] px-5 text-sm font-semibold text-slate-300 transition hover:bg-[#151521] hover:text-white'>Cancel</button>
                    <button onClick={async()=>{
                        setloader(true);
                        await handleAdd();
                        setloader(false);
                        setEditService(null);
                        document.body.classList.remove("overflow-hidden")
                    }} disabled={isFormValid?false:true} className={`flex h-11 cursor-pointer items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition ${isFormValid?"bg-purple-500 shadow-lg shadow-purple-950/30 hover:bg-purple-400":"bg-slate-700 text-slate-400 cursor-not-allowed"}`}>Save Changes</button>
                   </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
