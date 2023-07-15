/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const LogIn: React.FC = () => {
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    dispatch(loginUser({ email: email, password: password }));
    navigate(from, { replace: true });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-300 my-7 mx-auto dark:text-gray-100">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form
        onSubmit={handleLogIn}
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
            placeholder="Username"
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
        </div>
        <p className="text-red-600">{error}</p>
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
