import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ISignIn } from "../types";
import { useLoginMutation } from "../redux/features/auth/authApislice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
const LogIn: React.FC = () => {
  const {accessToken} = useAppSelector(state=>state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.path || '/';
  const { register, handleSubmit, formState: { errors },} = useForm<ISignIn>();
  const [login, {data:loginData,isError,isSuccess}]= useLoginMutation()
  const handleLogin = (data:ISignIn) => {
   login(data)
   };

   useEffect(() => {
    if (accessToken) {
      navigate(from, { replace: true });
    }if(isError){
      toast('Login Field',{duration:2000})
    }if (isSuccess) {
      localStorage.setItem("auth", JSON.stringify(loginData.data));
      dispatch(setUser(loginData.data));
        navigate(from, { replace: true });
    }
}, [isError,accessToken, dispatch,isSuccess,loginData,navigate, from]);
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const email = (form.email as HTMLInputElement).value;
  //   const password = (form.password as HTMLInputElement).value;
  //   if(!email && !password ){
  //     return alert('Please enter your email & password')
  //   }else{
  //     dispatch(loginUser({ email: email, password: password }));
  //     toast('Login Successfully')
  //     navigate(from, {replace:true})
  //   }
  // };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-300 my-7 mx-auto dark:text-gray-100">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        noValidate
        action=""
        className="space-y-6 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-400">
            Email
          </label>
          <input type="email"  {...register("email",{required:"Email is required"})}  placeholder="Email" className="input input-bordered border-2 w-full bg-[#fff]"/>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-400">
            Password
          </label>
          <input type="password"  {...register("password",{required:"Password is required"})}  placeholder="Password " className="input input-bordered border-2 w-full bg-[#fff]"/>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <button className="block w-full p-3 text-center rounded-sm text-white font-semibold bg-violet-400">
          Log in
        </button>
      </form>
      <p className="text-xs text-center sm:px-6 dark:text-gray-400">
        Don't have an account?
        <Link
          rel="noopener noreferrer"
          to="/signup"
          className="underline dark:text-gray-100 font-semibold"
        >
          {" "}
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
