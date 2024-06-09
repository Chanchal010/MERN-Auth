import React from 'react'
import { app } from '../firebase.js'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/user.slice.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = signInWithPopup(auth, provider);
            // console.log(result);

            const res = await axios.post("/api/v1/auth/google-signin",  {
                name: (await result).user.displayName,
                email: (await result).user.email,
                photo: (await result).user.photoURL
              },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = res.data;
            // console.log("google data", data);
            dispatch(signInSuccess(data));
            
            navigate('/')
            // const response = await fetch('/api/v1/auth/google-signin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: (await result).user.displayName,
            //         email: (await result).user.email,
            //         photo: (await result).user.photoURL
            //     }),
            // });
            // const data = await response.json();
            // console.log("google data", data);
            // dispatch(signInSuccess(data))
            // navigate('/')
        } catch (error) {
            console.log("could not sign in with google", error);
        }
    }

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  )
}
