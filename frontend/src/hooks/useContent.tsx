import axios from "axios";
import { useEffect, useState } from "react";

export function UseContent(){
  const [data,setData] = useState([]);

  function refresh(){
    axios.get("http://localhost:3000/api/v1/content",{
      headers : {
        "authorization" : localStorage.getItem("token")
      }
    }).then((response)=>{
      setData(response.data.course)
    })
    
  }

  useEffect(()=>{
    refresh();
    let interval = setInterval(()=>{
      refresh()
    },10 * 1000)

    return () => {
      clearInterval(interval);
    }
  },[])
  return data;
}