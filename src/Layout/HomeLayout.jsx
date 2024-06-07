import { AiFillCloseCircle } from "react-icons/ai";
import {  FiMenu } from "react-icons/fi";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { LogoutAccount } from "../Redux/Slices/AuthSlice";
export default function HomeLayout({children}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const isLoggedIn=useSelector(state=>state?.auth?.isLoggedIn);
  const role=useSelector(state=>state?.auth?.role);
    function changeWidth(){
      const drawer=document.querySelector('.drawer-side');
      console.log(drawer)
      drawer.style.width='auto';
    }
    function hideDrawer(){
        const element=document.querySelector('.drawer-toggle');
        element.checked=false;
        const drawer=document.querySelector('.drawer-side');
        console.log(drawer)
        drawer.style.width='0';
        
      
    }
    const onLogout=(e)=>{
      e.preventDefault();
      const res=dispatch(LogoutAccount());
      if(res?.payload?.sucess) 
        navigate('/');
    }
  return (
    <div className="min-h-[90vh] ">

      <div className="drawer absolute left-0 z-50 w-fit">

       <input className="drawer-toggle" id="my-drawer" type="checkbox"/>
       <div className="drawer-content">
       <label htmlFor="my-drawer" className="cursor-pointer relative">
         <FiMenu onClick={changeWidth}
          size={"32px"}
          className="font-bold text-white m-4"
          />

        
       </label>
       </div>
       <div className="drawer-side w-0">
        <label htmlFor="my-drawer" className="drawer-overlay">
         
        </label>
        <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
                <button onClick={hideDrawer}>
                    <AiFillCloseCircle></AiFillCloseCircle>
                </button>
            </li>
            <li>
                <Link to='/'>Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                        )

                        }
                        {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to="/course/create">Create Course</Link>
                            </li>
                        )

                        }
            <li>
                <Link to='/courses'>All Courses</Link>
            </li>
            <li>
                <Link to='/contact'>Contact us</Link>
            </li>
            <li>
                <Link to='/about'>About us</Link>
            </li>
            {!isLoggedIn ? (
                            <li >
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary px-4 py-4 bg-purple-500 font-semibold rounded-md w-full">
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-4 bg-yellow-200  font-semibold rounded-md w-full">
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li >
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary px-4 py-4 bg-purple-500 font-semibold rounded-md w-full">
                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-4 bg-yellow-200  font-semibold rounded-md w-full">
                                        <Link onClick={onLogout}>Logout</Link>
                                    </button>
                                </div>
                            </li>
                        )
            }

        </ul>
       </div>

      </div>
      
      {children}

       
    </div>
  )
}
