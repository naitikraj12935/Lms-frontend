import { Route,Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import Footer from "./Components/Footer";
import AboutUs from "./Pages/AboutUs";
import Changepass from "./Pages/Changepass";
import Contact from "./Pages/Contact";
import AddLecture from "./Pages/Courses/AddLecture";
import CheckoutFailure from "./Pages/Courses/CheckoutFailure";
import CheckoutSuccess from "./Pages/Courses/CheckoutSuccess";
import CourseCheckout from "./Pages/Courses/CourseCheckout";
import CourseDescription from "./Pages/Courses/CourseDescription";
import CourseLecture from "./Pages/Courses/CourseLecture";
import CourseList from "./Pages/Courses/CourseList";
import CreateCourse from "./Pages/Courses/CreateCourse";
import Denied from "./Pages/Denied";
import EditProfile from "./Pages/EditProfile";
import ForgetPass from "./Pages/ForgetPass";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import UpdatePassword from "./Pages/UpdatePassword";

export default function App() {
 
  return (
    <>
   
     <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/courses" element={<CourseList/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/Denied" element={<Denied/>}></Route>
      <Route path='/course/description/' element={<CourseDescription/>}></Route>
      <Route path='/forget/pass' element={<ForgetPass/>}></Route>
      <Route path='/reset-password/:token' element={<Changepass/>}></Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
        <Route path="/course/create" element={<CreateCourse/>}></Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path="/user/profile" element={<Profile/>}></Route>
        <Route path="/user/Editprofile" element={<EditProfile/>}></Route>
        <Route path="/checkout" element={<CourseCheckout/>}></Route>
        <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFailure />} />
          <Route path='/course/displaylectures' element={<CourseLecture />} />
          <Route path='/course/addlecture' element={<AddLecture />} />
          <Route path='/changepassword' element={<UpdatePassword />} />
      </Route>
    
      <Route path="*" element={<NotFound/>}></Route>
      
     </Routes>
     <Footer/>
    </>
  )
}
