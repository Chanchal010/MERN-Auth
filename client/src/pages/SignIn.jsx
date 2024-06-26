import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/user/user.slice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/v1/auth/sign-in", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      // console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    // <div className='p-3 max-w-lg mx-auto'>
    //       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    //       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    //         <input
    //           type='email'
    //           placeholder='Email'
    //           id='email'
    //           className='bg-slate-100 p-3 rounded-lg'
    //           onChange={handleChange}
    //         />
    //         <input
    //           type='password'
    //           placeholder='Password'
    //           id='password'
    //           className='bg-slate-100 p-3 rounded-lg'
    //           onChange={handleChange}
    //         />
    //         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
    //         {loading ? 'Loading...' : 'Sign In'}
    //         </button>
    //         <OAuth/>
    //       </form>
    //       <div className='flex gap-2 mt-5'>
    //         <p>Have not an account?</p>
    //         <Link to='/sign-up'>
    //           <span className='text-blue-500'>Sign Up</span>
    //         </Link>
    //       </div>
    //       <p className='text-red-700 mt-5'>
    //         {error ? error.message || 'Something went wrong!' : ''}
    //         </p>

    //     </div>

    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl rounded-lg p-6 md:p-12 max-w-lg mx-auto my-10 transform transition duration-500 hover:scale-105">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white animate-bounce">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
          onChange={handleChange}
        />
        <button className="bg-purple-800 text-white p-4 rounded-lg uppercase hover:bg-purple-900 disabled:opacity-80 transition duration-200 ease-in-out">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p className="text-white">Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-yellow-300 hover:text-yellow-400 transition duration-200 ease-in-out">
            Sign Up
          </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
