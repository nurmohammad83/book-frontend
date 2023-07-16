import  { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import  toast from 'react-hot-toast'
import { createUser } from '../redux/features/user/userSlice';
import { useAppDispatch } from '../redux/hook';


const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const confirm = (form.confirm as HTMLInputElement).value;
    console.log(email, password, confirm);
    if (password.length < 6) {
      toast("Password must be 6 character", {duration:2000});

      return;
    }
    if (password !== confirm) {
      toast("Password did not match", {duration:2000});
      return;
    } else {
      dispatch(createUser({ email: email, password: password }));
      navigate(from, { replace: true });
      toast("Sign up Successfully", {duration:2000});
      form.reset();
    }
  };

  return (
    <div className="w-full my-5 mx-auto max-w-md p-8 space-y-3 rounded-xl bg-gray-300 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        noValidate
        action=""
        className="space-y-6 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-400">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            required
          />
          <label htmlFor="password" className="block dark:text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            required
          />
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
