import emailjs from '@emailjs/browser';
import { useRef } from "react";
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

import HomeLayout from "../Layout/HomeLayout";

export default function Contact() {
  const form = useRef();
  const navigate=useNavigate();
 let data=localStorage.getItem('data');
 if(!data)
  {
    toast.error('please login to contact us');
    navigate('/login')
  }
  
  data=JSON.parse(data);
  

  const sendEmail = (e) => {
    e.preventDefault();
    if(form.current.message.value.length<20)
      {
        toast.error('message should be atleast 20 characters long');
        return ;
      }
    emailjs
      .sendForm("service_du5kjym","template_tl7ljd1", form.current, {
        publicKey: '07M3O3KUncfJW23n4',
      })
      .then(
        () => {
          toast.success('Email sent successfully!');
          toast.success('we will get back to you soon! Thank You!')
          console.log('SUCCESS!');
          form.current.message.value=''
          setTimeout(()=>{
            navigate('/');
          },3000)
        },
        (error) => {
          toast.error('failed to send email!')
          console.log('FAILED...', error.text);
        },
      );
  };
  
  return (
    <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                    noValidate
                    ref={form} onSubmit={sendEmail}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">

                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <label  className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            type="text" name="user-name" value={data.fullName} readOnly
                            placeholder="Enter your name"
                           
                        />

                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label  className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            type="email" name="user-email" value={data.email} readOnly
                            placeholder="Enter your email"
                            
                        />

                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label  className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            name="message"
                            placeholder="Enter your message"
                           
                        />

                    </div>
                    <button type="submit" value="Send"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                    >
                        Submit
                    </button>

                </form>
            </div>
            
        </HomeLayout>
  )
}
