import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {  useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.min.css";
import ErrorPage from './ErrorPage';

const SignUp = () => {
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/user/sign-up",
        Values
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
    {isLoggedIn ? <ErrorPage/> : <div className="h-screen flex items-center justify-center bg-[#00ADB5]">
      <ToastContainer position="top-center" draggable />
      <div className="w-4/6 md:w-3/6 lg:w-2/6 text-center justify-center flex flex-col ">
        <Link to="/" className="text-2xl font-bold bg-[#EEEEEE] rounded py-3 ">
          PodcastShow
        </Link>
        <div className="mt-6 w-full">
          <div className="w-full flex flex-col text-start">
            <label htmlFor="">Username</label>
            <input
              type="text"
              required
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              placeholder="Username"
              name="username"
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="flex flex-col mt-2 text-start w-full">
            <label htmlFor="">Email</label>
            <input
              type="Email"
              required
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              placeholder="Email"
              name="email"
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className="flex flex-col mt-2 text-start w-full">
            <label htmlFor="">Password</label>
            <input
              type="password"
              required
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              placeholder="Password"
              name="password"
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col mt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white text-xl rounded py-2 font-semibold "
            >
              SignUp
            </button>
          </div>
          <div className="w-full flex flex-col mt-4">
            <p className="text-xl">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white hover:bg-green-500 duration-200 bg-green-700 rounded p-2 font-semibold ms-2"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default SignUp;
