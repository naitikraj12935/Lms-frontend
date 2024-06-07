import { useState } from "react";
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { changepassword } from "../Redux/Slices/AuthSlice";
export default function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loginData, setloginData] = useState({
   
    
    password: '',
    newpassword:''
    
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch your signup action here
    if( !loginData.newpassword || !loginData.password){
      toast.error('please fill all the details');
      return ;

    }

    if( loginData.newpassword ===loginData.password){
        toast.error('new and old both password are same please write different');
        return ;
  
      }
    
    
    

    

    const response=await dispatch(changepassword(loginData))
    console.log(response);
    console.log("response kya hai",response)
    if(response?.payload?.success){
      navigate("/");
    }

    
    setloginData({
      newpassword: '',
     
      password: '',
     
    })
   
  };
  const evaluatePasswordStrength = (password) => {
    let score = 0;

    if (!password) return '';

    // Check password length
    if (password.length > 8) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    // Contains numbers
    if (/\d/.test(password)) score += 1;
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return <h1 className="text-red-800">weak</h1>;
      case 3:
        return <h1 className="text-yellow-400">Medium</h1>;
      case 4:
      case 5:
        return <h1 className="text-green-400">Strong</h1>;
    }
  };

  
  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh]">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Update Password</h1>
          
         

          <div className="flex flex-col gap-1">
            

           

            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              required
              value={loginData.password}
              onChange={handleUserInput}
              name="password"
              id="password"
              placeholder="enter current password"
              className="bg-transparent border-b-2 p-2"
            />
            <label htmlFor="newpassword" className="font-semibold">New Password</label>
            <input
              type="password"
              required
              name="newpassword"
              onChange={handleUserInput}
              value={loginData.newpassword}
              id="newpassword"
              placeholder="Enter new password"
              className="bg-transparent border-b-2 p-2"
            />
            <div className="password-strength">
              {evaluatePasswordStrength(loginData.newpassword)}
            </div>
          </div>

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer" onClick={handleSubmit}>Update</button>

          <button onClick={()=>navigate(-1)} className="w-full bg-purple-500 hover:bg-purple-400 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg  cursor-pointer">Back</button>
        </form>
      </div>
    </HomeLayout>
  );
}
