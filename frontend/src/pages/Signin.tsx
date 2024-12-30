import axios from "axios";
import { Button } from "../components/ui/Button"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = ()=>{
  const navigate = useNavigate();
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [open,setOpen] = useState(true);
  const [loading,setLoaing] = useState(false);
  async function Backend(){
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if(!username || !password){
      alert("Username and Password are required")
    }
    const response = await axios.post("http://localhost:3000/api/v1/signin",{
      username : username,
      password : password
    })

    if(response){
      const jwt = response.data.token;
      localStorage.setItem("token",jwt);
      navigate("/dashboard");
    }
  }
  return(
    <div className="flex justify-center items-center bg-slate-200 h-screen w-full rounded-3xl">
      <div className="bg-white h-96 w-80 flex flex-col items-center p-2">
        <div className="font-bold text-purple-600 text-4xl mb-10 mt-6">
          Signin
        </div>
        <input ref={usernameRef} type="text" className="p-4 mt-4 w-full border-2" placeholder="Username"/>
        <input ref={passwordRef} type="password" className="p-4 mt-4 w-full border-2 mb-4" placeholder="Password"/>
        <Button onClick={Backend} size="lg" variant="primary" text="Submit" open={open} loading={loading}/>
      </div>
    </div>
  )
}