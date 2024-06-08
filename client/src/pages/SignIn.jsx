import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {signInFailure, signInSuccess, signInStart} from "../redux/user/user.slice.js"
import OAuth from '../components/OAuth.jsx'

export default function SignIn() {

    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(false);
    const {loading, error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await axios.post("/api/v1/auth/sign-in", formData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = res.data;
            console.log(data);

            if (data.success === false) {
              dispatch(signInFailure(data));
              return;
              }
              dispatch(signInSuccess(data));
              navigate('/', {replace: true});
            
        } catch (error) {
          dispatch(signInFailure(error))
        }
    }

  return (


<div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have not an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
        </p>

    </div>
  );
}
