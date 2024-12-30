import { Button } from "../components/ui/Button";
import {Icon_plus} from "../icons/plus_icon"
import {Card} from "../components/ui/Card"
import { Add_Content } from "../components/Add_Content";
import { useState } from "react";
import { Twitter_icon } from "../icons/twitter_icon";
import { Youtube_icon } from "../icons/youtube_icon";
import { Sidebar } from "../components/sidebar";
import { Top_Content } from "../components/Top_content";
import { UseContent } from "../hooks/useContent";
import axios from "axios";


export const Dashboard = ()=>{
  const [change,setChange] = useState(false);
  const contents = UseContent();
  return(
    <>
      <Add_Content change={change} setChange={setChange}/>
      <div className="fixed bg-white border-2 top-0 left-0 w-60 h-screen">
        <Top_Content/>
        <Sidebar icon={<Twitter_icon/>} title="twitter"/>
        <Sidebar icon={<Youtube_icon/>} title="youtube"/>
      </div>
      <div className="bg-gray-100 w-full h-screen mt-0">
        <div className="flex gap-2 pt-5 justify-end">
          <Button startIcon={<Icon_plus size="md"/>} onClick={()=>setChange(true)} variant="primary" size="md" text="Add Content"></Button>
          <Button onClick={async()=>{
            const response = axios.post("http://localhost:3000/api/v1/brain/share",{
              share : true,
            },{
              headers : {
                "authorization" : localStorage.getItem("token")
              }
            });
            const shareUrl = `http://localhost:3000/api/v1/brain/share/${(await response).data.hash}`;
            alert(shareUrl);
          }} startIcon={<Icon_plus size="md"/>} variant='secondary' size="md" text="Share Brain"></Button>
        </div>
        <div className="flex gap-4 m-4 ml-64 flex-wrap">
          {contents.map(({title, type,link})=><Card link={link} title={title} type={type}/>)}
        </div>
      </div>
    </>
  )
}