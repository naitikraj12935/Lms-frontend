import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { getRazorPayId, purchaseCourseBundleM, purchaseCourseBundleY, verifyUserPayment } from "../../Redux/Slices/RazorPaySlice";

function CourseCheckout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state.razorpay.key);
    const Ysubscription_id = useSelector((state) => state.razorpay.Ysubscription_id);
    const Msubscription_id = useSelector((state) => state.razorpay.Msubscription_id);

    const YpaymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    };
    const MpaymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    };

    // Handle Yearly Subscription
    async function handleSubscriptionY(e) {
        e.preventDefault();
        

        if (!razorpayKey || !Ysubscription_id) {
            toast.error("Something went wrong");
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: Ysubscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: { color: '#F37254' },
            handler: async function (response) {
                YpaymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                YpaymentDetails.razorpay_signature = response.razorpay_signature;
                YpaymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successful");
               
                const res = await dispatch(verifyUserPayment(YpaymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    // Handle Monthly Subscription
    async function handleSubscriptionM(e) {
        e.preventDefault();
       

        if (!razorpayKey || !Msubscription_id) {
            toast.error("Something went wrong");
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: Msubscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: { color: '#F37254' },
            handler: async function (response) {
                MpaymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                MpaymentDetails.razorpay_signature = response.razorpay_signature;
                MpaymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successful");
                
                const res = await dispatch(verifyUserPayment(MpaymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    // Load RazorPay Key
    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundleM());
        await dispatch(purchaseCourseBundleY());
    }

    useEffect(() => {
        const user=JSON.parse(localStorage.getItem("data"));
        if(user.subscription.status==="active" || user.Msubscription.status==="active")
            {   toast.success("you already have active subscription")
                navigate("/courses")
            }
            else{
                load();
            }
       
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col md:flex-row lg:flex-row gap-10 justify-center items-center">
                <form onSubmit={handleSubscriptionY} className="min-h-[90vh] flex items-center justify-center text-white">
                    <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                        <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Subscription Bundle</h1>
                        <div className="px-4 space-y-5 text-center">
                            <p className="text-[17px]">
                                This purchase will allow you to access all available courses on our platform for
                                <span className="text-yellow-500 font-bold">
                                    <br />
                                    1 Year duration
                                </span>.
                                All existing and new courses will also be available.
                            </p>
                            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                                <BiRupee /><span>2500</span> only
                            </p>
                            <div className="text-gray-200">
                                <p>100% refund on cancellation</p>
                                <p>* Terms and conditions applied *</p>
                            </div>
                            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                                Buy now
                            </button>
                        </div>
                    </div>
                </form>
                <form onSubmit={handleSubscriptionM} className="min-h-[90vh] flex items-center justify-center text-white">
                    <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                        <h1 className="bg-purple-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Subscription Bundle</h1>
                        <div className="px-4 space-y-5 text-center">
                            <p className="text-[17px]">
                                This purchase will allow you to access all available courses on our platform for
                                <span className="text-purple-500 font-bold">
                                    <br />
                                    1 Month duration
                                </span>.
                                All existing and new courses will also be available.
                            </p>
                            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-purple-500">
                                <BiRupee /><span>450</span> only
                            </p>
                            <div className="text-gray-200">
                                <p>100% refund on cancellation</p>
                                <p>* Terms and conditions applied *</p>
                            </div>
                            <button type="submit" className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                                Buy now
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CourseCheckout;
