import { useState } from "react";
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { ForgetPassword } from "../Redux/Slices/AuthSlice";
export default function ForgetPass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loginData, setloginData] = useState({
    email: '',
    
    
    
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch your signup action here
    if( !loginData.email ){
      toast.error('please fill all the details');
      return ;

    }
    
    
    

    

    const response=await dispatch(ForgetPassword(loginData))
    console.log(response);
    console.log("response kya hai",response)
    if(response?.payload?.success){
      navigate("/");
    }

    
    setloginData({
      email: '',
     
      
     
    })
   
  };

  
  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh]">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          
         

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              required
              name="email"
              onChange={handleUserInput}
              value={loginData.email}
              id="email"
              placeholder="Enter your email"
              className="bg-transparent border-b-2 p-2"
            />

           

          
            
          </div>

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer" onClick={handleSubmit}>Login</button>

          <p className="text-center">back to<Link to='/login'>login</Link></p>
        </form>
      </div>
    </HomeLayout>
  );
}
