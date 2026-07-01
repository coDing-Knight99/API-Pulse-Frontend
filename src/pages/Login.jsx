import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Base_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [loader, setloader] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [emaillog, setemaillog] = useState('')
  const [passwordlog, setpasswordlog] = useState('')
  const navigate = useNavigate();
  const Register = async function(){
    console.log({username,email,password});
    try{
        setloader(true);
        const res=await axios.post(`${Base_URL}/register`,{username,email,password},{
          withCredentials: true,
        });
        document.getElementById("username").value='';
        document.getElementById("email").value='';
        document.getElementById("password").value='';
        setemail('');
        setusername('');
        setpassword('');
        toast(res.data.message,{className:"font-bold text-lg"});
        console.log(res.status)
        if(res.status==201)
        {
          try{
            const resLog = await axios.post(`${Base_URL}/login`,{email,password},{
              withCredentials: true,
            });
            toast(resLog.data.message,{className:"font-bold text-lg background-black text-white"});
            console.log(res.data);
            navigate('/',{replace:true})
          }
          catch(error)
          {
            console.error("Error Logging in after registering",error);
            toast("Login Failed!",{className:"font-bold text-lg"});
          }
        }
        // await handleLogin();
        setloader(false);
        console.log(res.data);

    }catch(error)
    {
        setloader(false);
        console.error('Error registering user:', error);
        toast(error.response.data.message||"Registration Failed",{className:"font-bold text-lg"});
    }
}
const handleLogin = async function(){
  console.log({emaillog,passwordlog});
  try{
    setloader(true);
    const res = await axios.post(`${Base_URL}/login`,{email:emaillog,password:passwordlog},{
      withCredentials:true
    });
    document.getElementById("emaillog").value='';
    document.getElementById("passwordlog").value='';
    setpasswordlog('');
    setemaillog('');
    setloader(false);
    // toast(res.data.message,{className:"font-bold text-lg"});
    navigate('/',{replace:true})
    // console.log(res.data);
  }catch(error){
    setloader(false);
    console.log("Error Logging In");
    toast(error.response.data.message || "Login Failed",{className:"font-bold text-lg"});
  }
  
}

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-[#050508] text-slate-100">
      <ToastContainer className="font-bold text-lg background-black text-white"/>
      {loader && <Loader/>}
      <div
        className={`absolute top-0 hidden h-full w-1/2 overflow-hidden border-[#20202a] transition-all duration-700 ease-in-out lg:block lg:z-50 ${
          isLogin ? "left-1/2" : "left-0"
        }`}
      >
        <img
          className="h-full w-full object-cover opacity-500"
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
          alt="Background"
        />
        <div className="absolute inset-0 bg-[#050508]/45" />
        <div className="absolute inset-0" />
      </div>

      <div
        className={`flex min-h-screen items-center justify-center px-4 py-8 ${isLogin?"w-screen z-10":"w-0 overflow-hidden"} bg-[#050508] lg:w-1/2`}
      >
        <div className="flex w-full max-w-[400px] flex-col items-center justify-center rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
          <h1 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
            Welcome Back !
          </h1>

          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col text-left">
              <label className="mb-2 text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="text"
                onChange={(e)=>{setemaillog(e.target.value)}}
                id="emaillog"
                placeholder="Enter your email"
                className="h-11 rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-2 text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                onChange={(e)=>{
                  setpasswordlog(e.target.value)
                }}
                id="passwordlog"
                placeholder="Enter your password"
                className="h-11 rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
              />
            </div>

            <button onClick={()=>{
              handleLogin();
            }} className="mt-3 h-11 rounded-lg bg-purple-500 px-4 text-sm font-semibold text-white transition hover:bg-purple-400">
              Sign In
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                setIsLogin(false)
                document.getElementById("emaillog").value='';
                document.getElementById("passwordlog").value='';

                setemaillog('');
                setpasswordlog('');
              }}
              className="cursor-pointer font-medium text-purple-300 transition hover:text-purple-200 hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      <div
        className={`absolute right-0 flex min-h-screen items-center ${isLogin?"w-0 overflow-hidden":"w-full px-4 py-8"} justify-center bg-[#050508] lg:w-1/2`}
      >
        <div className="flex w-full max-w-[450px] flex-col items-center justify-center rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
          <h1 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
            Create Account
          </h1>

          <div className="flex w-full flex-col gap-5">

            <div className="flex flex-col text-left">
              <label className="mb-2 text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                id="email"
                onChange={(e)=>{
                  setemail(e.target.value)
                }}
                type="email"
                placeholder="Enter your email"
                className="h-11 rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-2 text-sm font-medium text-slate-300">
                Username
              </label>
              <input
                id="username"
                onChange={(e)=>{
                  setusername(e.target.value)
                }}
                type="text"
                placeholder="Choose a username"
                className="h-11 rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="mb-2 text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                id="password"
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}
                type="password"
                placeholder="Create a password"
                className="h-11 rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
              />
            </div>

            <button onClick={()=>Register()} className="mt-3 h-11 rounded-lg bg-purple-500 px-4 text-sm font-semibold text-white transition hover:bg-purple-400">
              Sign Up
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <span
              onClick={() => {
                setIsLogin(true)
                document.getElementById("name").value='';
        document.getElementById("email").value='';
        document.getElementById("password").value='';
        setusername('');
        setemail('');
        setpassword('');
              }
              }
              className="cursor-pointer font-medium text-purple-300 transition hover:text-purple-200 hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
