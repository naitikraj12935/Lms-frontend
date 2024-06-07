

import { useNavigate } from "react-router-dom"
export default function NotFound() {
    const nevigate=useNavigate();
  return (
    
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] gap-2">
    <h1 className="text-3xl md:text-5xl lg:text-9xl font-extrabold text-white">opps! page not found </h1>
    <h1 className="text-9xl font-extrabold text-white">404</h1>
    <button onClick={()=>nevigate(-1)} className="mt-5 border-y-2 border-red-500">
     Go back
    </button>
    </div>
      
   
  )
}
