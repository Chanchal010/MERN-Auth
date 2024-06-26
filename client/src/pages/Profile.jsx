import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { 
  updateStart, 
  updateSuccess, 
  updateFailure, 
  deleteStart, 
  deleteSuccess, 
  deleteFailure ,
  signOut
} from "../redux/user/user.slice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    ...currentUser,
  });
  // console.log(formData);
  const [image, setImage] = useState(undefined);
  const [uploading, setUploading] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      // console.log(image);
      handleUpload(image);
    }
  }, [image]);

  const handleUpload = async (image) => {
    // console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    // console.log(fileName);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // console.log(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading(Math.round(progress));
        // console.log(progress);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePic: downloadURL })
        );
      }
    );
  };

  // console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await axios.post(`/api/v1/user/update-user/${currentUser._id}`, formData, {
        Headers: {
          "Content-Type": "application/json",
        }
      })

      const data = res.data;
      // console.log(data);
      if(data.success === false) {
        dispatch(updateFailure(data));
        return;
      }

      dispatch(updateSuccess(data));
      setSuccess(true);
    } catch (error) {
      dispatch(updateFailure(error));
    }
  }


  const handleDeleteClick = async () => {
    try {
      dispatch(deleteStart());

      const res = await axios.delete(`/api/v1/user/delete-user/${currentUser._id}`);

      const data = res.data;
      if (data.success === false) {
        dispatch(deleteFailure(data));
        return
        }
      dispatch(deleteSuccess());

      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteFailure(error));
    }
  }

   const handleSignOut = async () => {
    try {
      await axios.get("/api/v1/auth/sign-out");
      dispatch(signOut());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }


  return (

    // <div className="p-3 max-w-lg mx-auto">
    //   <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
    //   <form onSubmit={handleSubmit}
    //   className="flex flex-col gap-4">
    //     <input
    //       type="file"
    //       ref={fileRef}
    //       hidden
    //       accept="image/*"
    //       onChange={(e) => setImage(e.target.files[0])}
    //     />
    //     <img
    //       src={formData.profilePic || currentUser.profilePic}
    //       alt="profile"
    //       className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
    //       onClick={() => fileRef.current.click()}
    //     />
    //     <p className="text-sm self-center">
    //       {imageError ? (
    //         <span className="text-red-700">
    //           Error uploading image (file size not supported(2mb))
    //         </span>
    //       ) : uploading > 0 && uploading < 100 ? (
    //         <span>{`Uploading:  ${uploading}%`}</span>
    //       ) : uploading === 100 ? (
    //         <span className="text-green-700">Image uploaded</span>
    //       ) : (
    //         ""
    //       )}
    //     </p>
    //     <input
    //       defaultValue={currentUser.username}
    //       type="text"
    //       id="username"
    //       placeholder="Username"
    //       className="bg-slate-100 rounded-lg p-3"
    //       onChange={handleChange}
    //     />
    //     <input
    //       defaultValue={currentUser.email}
    //       type="email"
    //       id="email"
    //       placeholder="Email"
    //       className="bg-slate-100 rounded-lg p-3"
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="password"
    //       id="password"
    //       placeholder="Password"
    //       className="bg-slate-100 rounded-lg p-3"
    //       onChange={handleChange}
    //     />
    //     <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
    //       {loading ? "Updating..." : "Update"}
    //     </button>
    //   </form>
    //   <div className="flex justify-between mt-5">
    //     <span onClick={handleDeleteClick} className="text-red-700 cursor-pointer">Delete Account</span>
    //     <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
    //   </div>
    //   <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    //   <p className='text-green-700 mt-5'>
    //     {success && 'User is updated successfully!'}
    //   </p>
    // </div>

    <div className="bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="relative self-center">
          <img
            src={formData.profilePic || currentUser.profilePic}
            alt="profile"
            className="h-24 w-24 cursor-pointer rounded-full object-cover border-4 border-indigo-500 hover:border-indigo-700 transition duration-300"
            onClick={() => fileRef.current.click()}
          />
          <div className="absolute bottom-0 right-0 bg-indigo-500 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8l-4-4H4zm0 2h8v4h4v6H4V5z"/>
            </svg>
          </div>
        </div>
        <p className="text-sm text-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image (file size not supported(2mb))</span>
          ) : uploading > 0 && uploading < 100 ? (
            <span>{`Uploading: ${uploading}%`}</span>
          ) : uploading === 100 ? (
            <span className="text-green-700">Image uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-white rounded-lg p-3 shadow-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-300"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-white rounded-lg p-3 shadow-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-300"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-white rounded-lg p-3 shadow-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-300"
          onChange={handleChange}
        />
        <button className="bg-indigo-600 text-white p-3 rounded-lg uppercase hover:bg-indigo-700 transition duration-300 disabled:opacity-80">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteClick} className="text-red-700 cursor-pointer hover:underline">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer hover:underline">Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>{success && 'User is updated successfully!'}</p>
    </div>
  );
}
