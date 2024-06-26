// import React from 'react'

// export default function About() {
//   return (
//     <div className='px-4 py-12 max-w-2xl mx-auto'>
//     <h1 className='text-3xl font-bold  mb-4 text-slate-800'>About</h1>
//     <p className='mb-4 text-slate-700'>
//       This is a MERN (MongoDB, Express, React, Node.js) stack application with
//       authentication. It allows users to sign up, log in, and log out, and
//       provides access to protected routes only for authenticated users.
//     </p>
//     <p className='mb-4 text-slate-700'>
//       The front-end of the application is built with React and uses React
//       Router for client-side routing. The back-end is built with Node.js and
//       Express, and uses MongoDB as the database. Authentication is implemented
//       using JSON Web Tokens (JWT).
//     </p>
//     <p className='mb-4 text-slate-700'>
//       This application is intended as a starting point for building full-stack
//       web applications with authentication using the MERN stack. Feel free to
//       use it as a template for your own projects!
//     </p>
//   </div>
//   )
// }


import React from 'react';

export default function About() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 shadow-2xl rounded-lg p-6 md:p-12 max-w-4xl mx-auto my-10 transform transition duration-500 hover:scale-105">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-white animate-bounce">
        About
      </h1>
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-white animate-slide-in">
          This is a MERN (MongoDB, Express, React, Node.js) stack application with
          authentication. It allows users to sign up, log in, and log out, and
          provides access to protected routes only for authenticated users.
        </p>
        <p className="text-lg leading-relaxed text-white animate-slide-in">
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is implemented
          using JSON Web Tokens (JWT).
        </p>
        <p className="text-lg leading-relaxed text-white animate-slide-in">
          This application is intended as a starting point for building full-stack
          web applications with authentication using the MERN stack. Feel free to
          use it as a template for your own projects!
        </p>
      </div>
    </div>
  );
}
