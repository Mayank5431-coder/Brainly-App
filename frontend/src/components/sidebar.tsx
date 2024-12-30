import { ReactElement } from "react"

export const Sidebar = ({icon , title}:{
  icon : ReactElement,
  title: 'youtube' | 'twitter'
})=>{
  return(
    <div className="flex justify-center p-2 cursor-pointer hover:bg-gray-100">
      <a href={title ==='twitter' ? "https://x.com/home?lang=en-in" :"https://youtube.com/"} target="_blank">
        <div className="flex jusitfy-center">
          <div className="mt-1 mr-1">
            {icon}
          </div>
          <div className="mt-1">
            {title}
          </div>
        </div>
      </a>
    </div>
  )
}