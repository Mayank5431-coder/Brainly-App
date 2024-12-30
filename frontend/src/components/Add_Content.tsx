import { useRef, useState } from "react"
import axios from "axios"

interface PropsSchema{
  change : boolean,
  setChange : (value : boolean)=>void
}

enum notation{
  Twitter = "twitter",
  Youtube = "youtube"
}

import { Close_Icon } from "../icons/close_icon"
import { Button } from "./ui/Button";

export const Add_Content = ({change, setChange } : PropsSchema) => {
  const titleRef = useRef<any>();
  const linkRef = useRef<any>();
  const [click,setClick] = useState(notation.Youtube);
  async function addnew(){
    const title = titleRef.current.value;
    const link = linkRef.current.value;
    if(!title || !link){
      alert("Inputs Missing!");
      return;
    }
    try{
      await axios.post("http://localhost:3000/api/v1/content",{
        title : title,
        link : link,
        type : click
      },{
        headers:{
          "authorization" : localStorage.getItem("token")
        }
      })
      setChange(false);
      alert("item added successfully")
    }catch(err){
      alert("Error adding data to backend");
    }
  }
  return (
    <>
      {change && (
        <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center">
          {/* Background overlay with blur */}
          <div className="absolute w-full h-full bg-slate-950/30 backdrop-blur-sm" onClick={()=>setChange(false)}></div>
          
          {/* Fully visible inner content */}
          <div className="relative bg-white h-96 w-96 p-4 shadow-lg rounded z-10">
            <div className="flex justify-end mb-4 cursor-pointer" onClick={()=>setChange(false)}><Close_Icon size="lg"/></div>
            <div className="mb-4">
              <input
                ref={titleRef}
                type="text"
                placeholder="Title"
                className="border border-gray-400 p-4 w-full rounded-xl"
              />
            </div>
            <div>
              <input
                ref={linkRef}
                type="text"
                placeholder="Link"
                className="border border-gray-400 p-4 mb-4 w-full rounded-xl"
              />
            </div>
            <div className="flex justify-evenly">
              <Button onClick={()=> setClick(notation.Youtube)} text="Youtube" variant={click === notation.Youtube ? "primary" : "secondary"} size="md"></Button>
              <Button onClick={()=> setClick(notation.Twitter)} text="Twitter" variant={click === notation.Twitter ? "primary" : "secondary"} size="md"></Button>
            </div>
            <div className="mt-4 flex justify-center p-2 w-full">
              <Button onClick={addnew} text="Submit" size="lg" variant="primary"></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


