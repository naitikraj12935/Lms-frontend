import { useState } from "react";
import {toast} from 'react-hot-toast'
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const [signupData, setSignupData] = useState({
    email: '',
    fullname: '',
    password: '',
    avatar: ''
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const getImage = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setSignupData({ ...signupData, avatar: uploadImage });

      const reader = new FileReader();
      reader.readAsDataURL(uploadImage);
      reader.addEventListener('load', () => {
        setPreviewImage(reader.result);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch your signup action here
    if(!signupData.fullname || !signupData.email || !signupData.password){
      toast.error('please fill all the details');
      return ;

    }
    if(signupData.fullname.length<5){
      toast.error('FullName should atleast be 5 characters long');
    }
    if(signupData.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )==null){
      toast.error('please enter a valid email address');
      return ;
    }
    if(signupData.password.length<8 || signupData.password.length>16){
      toast.error('password should be between 8 to 16 characters long');
      return ;
    }
    console.log(signupData);

    const formdata=new FormData();
    formdata.append('email',signupData.email);
    formdata.append('fullName',signupData.fullname);
    formdata.append('password',signupData.password);
    formdata.append('avatar',signupData.avatar);
    // navigate('/somepath'); // Navigate to another route after signup

    const response=await dispatch(createAccount(formdata))
    console.log(response);
    if(response?.payload?.success){
      navigate("/");
    }

    
    setSignupData({
      email: '',
      fullname: '',
      password: '',
      avatar: ''
    })
    setPreviewImage(null)
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
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img className="w-24 h-24 rounded-full mx-auto" src={previewImage} alt="Avatar Preview" />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full mx-auto" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            onChange={getImage}
            id="image_uploads"
            name="image_uploads"
            accept=".jpg,.jpeg,.png,.svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              required
              name="email"
              onChange={handleUserInput}
              value={signupData.email}
              id="email"
              placeholder="Enter your email"
              className="bg-transparent border-b-2 p-2"
            />

            <label htmlFor="fullname" className="font-semibold">Full Name</label>
            <input
              type="text"
              required
              value={signupData.fullname}
              onChange={handleUserInput}
              name="fullname"
              id="fullname"
              placeholder="Enter your Full Name"
              className="bg-transparent border-b-2 p-2"
            />

            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              required
              value={signupData.password}
              onChange={handleUserInput}
              name="password"
              id="password"
              placeholder="Set a strong password"
              className="bg-transparent border-b-2 p-2"
            />
            <div className="password-strength">
              {evaluatePasswordStrength(signupData.password)}
            </div>
          </div>

          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer" onClick={handleSubmit}>Create Account</button>

          <p className="text-center">Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </HomeLayout>
  );
}
