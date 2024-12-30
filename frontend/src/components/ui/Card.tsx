import {Icon_plus} from "../../icons/plus_icon"

interface Cardprops{
  title: string,
  link: string,
  type: "twitter" | "youtube"
}

export function Card({title,link,type}:Cardprops){
  return(
    <div className="bg-white rounded-md border-slate-300 border-2 p-6 max-w-96 min-h-64">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Icon_plus size="md"/>
          <div className="ml-2 text-lg">{title}</div>
        </div>
        <div className="flex items-center">
          <div className="p-2">
            <a href={link} target="_blank">
              <Icon_plus size="md"/>
            </a>
          </div>
          <Icon_plus size="md"/>
        </div>
      </div>
      <div className="pt-4">
        {type === "youtube" && <iframe className="w-full" src= {link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        {type === "twitter" && <blockquote className="twitter-tweet w-full">
              <a href={link.replace("x.com","twitter.com")}></a>
         </blockquote>}
      </div>
    </div>
  )
}
