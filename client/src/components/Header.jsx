import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
  //   <div className='bg-slate-200'>
  //   <div className='flex justify-between items-center max-w-6xl mx-auto p-1'>
  //     <Link to='/'>
  //       <h1 className='font-bold'>Auth App</h1>
  //     </Link>
  //     <ul className='flex gap-4'>
  //       <Link to='/'>
  //         <li>Home</li>
  //       </Link>
  //       <Link to='/about'>
  //         <li>About</li>
  //       </Link>

  //       <Link to='/profile'>
  //       {currentUser ? (
  //         <img src={currentUser.profilePic} alt="profile" className='h-7 w-7 rounded-full object-cover'/>
  //       ) : (

  //           <li>Sign In</li>
  //       )}
  //       </Link>
  //     </ul>
  //   </div>
  // </div>


  <div className="bg-gradient-to-r from-gray-200 to-slate-300 shadow-md">
  <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
    <Link to="/">
      <h1 className="font-bold text-xl text-blue-600 hover:text-blue-800 transition duration-200">
        Auth App
      </h1>
    </Link>
    <ul className="flex gap-6 bg-white shadow-lg rounded-lg py-1 px-3">
      <Link to="/">
        <li className="text-gray-700 hover:text-blue-600 transition duration-200 px-3 py-2 rounded-md hover:bg-blue-100 border-b-2 border-transparent hover:border-blue-600">Home</li>
      </Link>
      <Link to="/about">
        <li className="text-gray-700 hover:text-blue-600 transition duration-200 px-3 py-2 rounded-md hover:bg-blue-100 border-b-2 border-transparent hover:border-blue-600">About</li>
      </Link>
      <Link to="/profile">
        {currentUser ? (
          <img
            src={currentUser.profilePic}
            alt="profile"
            className="h-10 w-10 rounded-full object-cover border-2 border-blue-600 transition duration-200 hover:scale-110"
          />
        ) : (
          <li className="text-gray-700 hover:text-blue-600 transition duration-200 px-3 py-2 rounded-md hover:bg-blue-100 border-b-2 border-transparent hover:border-blue-600">Sign In</li>
        )}
      </Link>
    </ul>
  </div>
</div>
  )
}
