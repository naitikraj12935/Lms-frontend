
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"

import HomeLayout from "../../Layout/HomeLayout";


export default function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const data=JSON.parse(localStorage.getItem('data'));

    return (
        <HomeLayout>
            <div className="min-h-[90vh] py-20 px-4 lg:px-20 md:px-20 flex flex-col items-center justify-center text-white">
                <div className="flex flex-col md:flex-row lg:flex-row gap-10  relative">
                    <div className="w-full">
                        <img 
                            className="w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numbersOfLectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>

                            </div>

                            { data?.role === "ADMIN" || data?.subscription?.status === "active" || data?.Msubscription?.status === "active"? (
                                <button onClick={() => navigate("/course/displaylectures", {state: {...state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch lectures
                                </button>
                                ) : (
                                    <button onClick={() => navigate("/checkout")} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        Subscribe
                                    </button>
                                )

                            }
                        </div>
                       

                    </div>

                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state?.title}
                        </h1>

                        <p className="text-yellow-500 text-justify">Course description: </p>
                        <p>{state?.description}</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
