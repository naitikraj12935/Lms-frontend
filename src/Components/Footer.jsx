import {BsFacebook,BsInstagram,BsLinkedin,BsTwitter} from 'react-icons/bs'

export default function Footer() {
 const currentDate=new Date();
 const year=currentDate.getFullYear();
  return (
    <>
    <footer className='relative left-0 bottom-0 h-[20vh]  sm:h-[10vh] lg:h-[10vh]  flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 py-5 px-2'>
       <section className='text-lg'>
        {year} &copy; All rights reserved
       </section>
       <section className='flex items-center justify-center gap-5 text-2xl text-white'>
          <a href='' className='hover:text-blue-500'><BsFacebook/></a>
          <a href='' className='hover:text-blue-500'><BsInstagram/></a>
          <a href='' className='hover:text-blue-500'><BsLinkedin/></a>
          <a href='' className='hover:text-blue-500'><BsTwitter/></a>
       </section>
    </footer>
      
    </>
  )
}
