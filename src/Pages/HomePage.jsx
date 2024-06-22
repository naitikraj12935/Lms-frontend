
import { Link } from "react-router-dom"

import homePageMain from '../assets/Images/homePageMainImage.png';
import HomeLayout from "../Layout/HomeLayout"
export default function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-24 md:pt-48 lg:pt-48 mb-4 text-white flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10">
     
        <div className="w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
                Find out best 
                <span className="ml-2 text-yellow-500 font-bold">
                    Online Courses
                </span>
            </h1>
            <p className="text-xl text-gray-200 ">
                we have a large collection of courses for you to choose from
            </p>
            <div className="space-x-6 ">
             <Link to="/courses">
              <button className="px-4 py-4 text-xl bg-yellow-500 text-blue-500 rounded-xl hover:bg-yellow-800 mb-4 hover:text-white hover:scale-90 transition-all ease-in-out duration-200">
                Explore Courses
              </button>
              </Link>
              <Link to="/contact">
              <button className="px-4 py-4 text-xl  text-white border-2 rounded-xl hover:bg-yellow-800 hover:text-white hover:scale-90 transition-all ease-in-out duration-200">
               Contact us
              </button>
              </Link>
            </div>
           
        </div>
        <div>
          <img src={homePageMain} alt="homepagemain"/>
        </div>
      </div>
    </HomeLayout>
  )
}

