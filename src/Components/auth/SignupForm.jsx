import { useForm } from "react-hook-form"
import GoogleButton from "./GoogleButton"
import { Button } from "../ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "animate.css"
import useAuth from "@/hooks/useAuth"
import { toast } from "react-toastify"
import useAxiosPublic from "@/hooks/usePublicAxios"
import { useState } from "react"

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { createUser, updateUserProfile,googleSignIn } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const form = location?.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

   const onSubmit = (data) => {
    toast.promise(
      createUser(data.email, data.password)
        .then((result) => {
          console.log("User Created:", result);
          updateUserProfile(data.name);
          const userData = {
            name: data.name,
            email: data.email,
            role: "user",
            uid: result.user.uid,
            photoURL: "",
            createdAt: new Date().toISOString(),
          };
          axiosPublic.post("/createUser", userData).then((res) => {
            if(res?.data?.insertedId){
              navigate(form, { replace: true });
            }
          });
        })
        .catch((error) => {
          console.error("Error Creating User:", error);
          setError(error.code);
          throw error;
        }),
      {
        pending: "Creating User...",
        success: "User Created Successfully",
        error: `${error}`,
      }
    );
  };

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
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

        {/* NAME */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""}`}
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 animate__animated animate__fadeIn">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : ""}`}
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
          <input
            type="password"
            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 animate__animated animate__fadeIn">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">Sign Up</Button>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <GoogleButton onClick={handleGoogle} />
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
