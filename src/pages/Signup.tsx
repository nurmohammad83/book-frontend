import { Link, useLocation, useNavigate } from 'react-router-dom';
import  toast from 'react-hot-toast'
import {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useSignupMutation } from '../redux/features/auth/authApislice';
import { ISignUp } from '../types';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors }, } = useForm<ISignUp>();
  const from = location.state?.from?.pathname || '/';

  const [signUp, {isSuccess}] = useSignupMutation()
  const handleSignUp = (data:ISignUp) => {
   const {email,password,confirmpassword}=data
    console.log(email, password, confirm);
    if (password.length < 6) {
      toast("Password must be 6 character", {duration:2000});
      return;
    }if (password !== confirmpassword) {
      toast("Password did not match", {duration:2000});
      return;
    }else {
      signUp(data)
     
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(from, { replace: true });
      toast("Sign up Successfully", {duration:2000});
    }
  }, [isSuccess,navigate,from]);

  return (
    <div className="w-full my-5 mx-auto max-w-md p-8 space-y-3 rounded-xl bg-gray-300 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        noValidate
        action=""
        className="space-y-6 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-400">
            Email
          </label>
          <input type="email"  {...register("email", { required: true })}  placeholder="Email " className="input input-bordered border-2 w-full bg-[#fff]"/>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-400">
            Password
          </label>
          <input type="password"  {...register("password", { required: true },)}  placeholder="Password " className="input input-bordered border-2 w-full bg-[#fff]"/>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-400">
            Password
          </label>
          <input type="password"  {...register("confirmpassword", { required:true},)}  placeholder="Confirm Password " className="input input-bordered border-2 w-full bg-[#fff]"/>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm text-white font-semibold bg-violet-400"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-center sm:px-6 dark:text-gray-400">
        Already have an account?{' '}
        <Link rel="noopener noreferrer" to="/login" className="underline dark:text-gray-100 font-bold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
