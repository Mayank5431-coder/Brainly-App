import { ReactElement } from "react";

interface ButtonProps{
  variant : 'primary' | 'secondary';
  size : 'sm' | 'md' | 'lg';
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: ()=>void;
  open?: boolean;
  loading?: boolean
}

const variantStyles = {
  'primary' : "bg-purple-600 text-white",
  'secondary' : "bg-purple-300 text-purple-500"
}

const sizeStyles = {
  'sm': "px-2 py-1 text-sm rounded-sm",
  'md': "px-4 py-2 text-md rounded-md",
  "lg": "px-8 py-4 text-xl rounded-xl"
}


export const Button = (props : ButtonProps)=>{
  return(
    <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${props.open ? "w-full" : ""} flex justify-center ${props.loading ? "opacity-45" : ""}`} disabled={props.loading}><div className="flex items-center">
      <div>{props.startIcon ? props.startIcon : null}</div>
      <div>{props.text}</div> 
      <div>{props.endIcon ? props.endIcon : null}</div>
      </div></button>
  )
}

/*<Button variant="primary" size="sm" text="new" startIcon={'new.png'} endIcon={'old.png'} onClick={()=>{
  console.log("hello")
}}/>*/