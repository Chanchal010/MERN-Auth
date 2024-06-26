import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OAuth from '../components/OAuth';

export default function SignUp() {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);

            const res = await axios.post("/api/v1/auth/sign-up", formData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = res.data;
            // console.log(data);

            setLoading(false);

            if (data.success === true) {
                setError(false);
                navigate('/sign-in', {replace: true});
                return;
            }
            
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

  return (

    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 shadow-xl rounded-lg p-6 md:p-12 max-w-lg mx-auto my-10 transform transition duration-500 hover:scale-105">
    <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-800 animate-fade-in">
      Sign Up
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        id="username"
        className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        id="email"
        className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        className="bg-slate-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        onChange={handleChange}
      />
      <button className="bg-blue-600 text-white p-4 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80 transition duration-200 ease-in-out">
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
      <OAuth />
    </form>
    <div className="flex gap-2 mt-5 justify-center items-center">
      <p>Have an account?</p>
      <Link to="/sign-in">
        <span className="text-purple-950 font-bold hover:text-blue-800 transition duration-200 ease-in-out">Sign in</span>
      </Link>
    </div>
    <p className="text-red-700 mt-5 text-center">{error && 'Something went wrong!'}</p>
  </div>
  );
}
