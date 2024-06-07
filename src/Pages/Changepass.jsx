import { useState } from "react";
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { ResetPassword } from "../Redux/Slices/AuthSlice";
export default function Changepass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token}=useParams();
  
  const [loginData, setloginData] = useState({
    
    
    password: '',
    
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch your signup action here
    if(  !loginData.password){
      toast.error('please fill all the details');
      return ;

    }
    
    
    
   const data={
    token:token,
    password:loginData.password
   }
    

    const response=await dispatch(ResetPassword(data))
    console.log(response);
    console.log("response kya hai",response)
    if(response?.payload?.success){
      navigate("/login");
    }

    
    setloginData({
      
     
      password: '',
     
    })
   
  };

  
  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh]">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          
         

          

           

            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              required
              value={loginData.password}
              onChange={handleUserInput}
              name="password"
              id="password"
              placeholder="Set a strong password"
              className="bg-transparent border-b-2 p-2"
            />
            
          

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer" onClick={handleSubmit}>Login</button>

          
        </form>
      </div>
    </HomeLayout>
  );
}
