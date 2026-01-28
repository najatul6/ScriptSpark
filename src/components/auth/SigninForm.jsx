import { useForm } from "react-hook-form"
import GoogleButton from "./GoogleButton"
import { Button } from "../ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "animate.css"
import { useState } from "react"
import { LucideEye, LucideEyeClosed } from "lucide-react"
import { toast } from "react-toastify"
import useAuth from "@/hooks/useAuth"
import useAxiosPublic from "@/hooks/usePublicAxios"

export default function SigninForm() {
    const { signInUser, googleSignIn } = useAuth()
    const [passShow, setPassShow] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const location = useLocation();
    const form = location?.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // Log in with Email and Password
    const onSubmit = (data) => {
        toast.promise(
            signInUser(data?.email, data?.password)
                .then((user) => {
                    navigate(form, { replace: true });
                    console.log("User Signed In:", user);
                })
                .catch((error) => {
                    console.error("Error Signing In:", error);
                    setError(error.code);
                    throw error;
                }),
            {
                pending: "Signing In...",
                success: "User Signed In Successfully",
                error: `${error}`,
            }
        );
    };

    // Log in Using Google Account 
    const handleGoogle = () => {
        toast.promise(
            googleSignIn()
                .then((result) => {
                    const userData = {
                        name: result.user.displayName,
                        email: result.user.email,
                        role: "user",
                        permission: "",
                        uid: result.user.uid,
                        photoURL: result.user.photoURL,
                        createdAt: new Date().toISOString(),
                    };
                    axiosPublic.post("/createUser", userData).then((res) => {
                        console.log(res.data);
                        navigate(form, { replace: true });
                    });
                })
                .catch((error) => {
                    console.error("Error Signing In:", error);
                    setError(error.code);
                    throw error;
                }),
            {
                pending: "Signing In...",
                success: "User Signed In Successfully",
                error: `${error}`,
            }
        );
    };

    return (
        <div className="max-w-sm w-full mx-auto p-6 border rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

            {/* Disable Chrome validation */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

                {/* EMAIL */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : ""
                            }`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 animate__animated animate__fadeIn">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <div className="relative flex items-center">
                        <input
                            type={passShow ? "text" : "password"}
                            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : ""
                                }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },

                            })}

                        />
                        <div className="w-[18px] h-[18px] absolute right-4 cursor-pointer" onClick={() => setPassShow(!passShow)}>
                            {
                                passShow ? <LucideEye /> : <LucideEyeClosed />
                            }
                        </div>
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#bbb"
                            stroke="#bbb"
                            
                            viewBox="0 0 128 128"
                            onClick={() => setPassShow(!passShow)}
                        >
                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                        </svg> */}
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1 animate__animated animate__fadeIn">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full">Sign In</Button>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <GoogleButton onClick={handleGoogle} />
            </form>

            <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <Link to="/signUp" className="text-blue-600 hover:underline">
                    Create one
                </Link>
            </p>
        </div>
    )
}
