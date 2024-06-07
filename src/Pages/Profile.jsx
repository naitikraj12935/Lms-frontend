import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { getUserData } from "../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../Redux/Slices/RazorPaySlice";


function Profile() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    console.log(userData,"userData")

    async function handleCancellation() {
        toast("Initiating cancellation");
        const respone=await dispatch(cancelCourseBundle());
        if(respone?.payload?.success){
            await dispatch(getUserData());
            toast.success("Cancellation completed!");
            navigate("/");
        }
       

    }
    console.log(userData,'hello')
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    { userData?.avatar?.secure_url ? (<img
                        src={userData?.avatar?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />):(
                        <BsPersonCircle className="w-40 h-24 rounded-full mx-auto" />
                    )

                    }
                    <h3 className="text-xl text-white font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2 overflow-clip">
                        <p>Email: </p><p>{userData?.email}</p>
                        <p>Role: </p><p>{userData?.role}</p>
                        <p>Subscription: </p>
                        <p>{userData?.subscription?.status === "active" || userData?.Msubscription?.status==="active" ? "active" : "Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link 
                            to="/changepassword" 
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Change password</button>

                        </Link>
                        <Link 
                            to="/user/Editprofile" 
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Edit profile</button>

                        </Link>
                    </div>
                    { (userData?.subscription?.status === "active" || userData?.Msubscription?.status==="active") && (
                        <button  onClick={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );

}

export default Profile;