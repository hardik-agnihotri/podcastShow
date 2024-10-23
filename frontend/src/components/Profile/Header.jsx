import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [UserData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/user/user-details",
          { withCredentials: true }
        );
        setUserData(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, [setUserData]);

  const Logouthandler = async () => {
    try {
        const res = await axios.post(
            "http://localhost:1000/api/v1/user/logout",
            {},
            { withCredentials: true }
        );
        console.log("Logout response:", res);
        
        // Remove the token from local storage
        localStorage.removeItem("authToken");
        
        // Dispatch the logout action
        dispatch(authActions.logout());
        
        // Navigate to home page
        navigate("/");
        
        // Optionally provide user feedback
        toast.success("Logged out successfully!");
    } catch (error) {
        console.error("Failed to log out:", error);
        
        // Provide feedback for the error
        toast.error("Logout failed. Please try again.");
    }
};


  return (
    <>
      {UserData && (
        <div className="bg-[#00ADB5] rounded py-8 flex flex-col md:flex-row items-center justify-center gap-8 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-start md:items-start">
            <p className="text-zinc-300 ">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {UserData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{UserData.email}</p>
          </div>
          <div>
            <button
              onClick={Logouthandler}
              className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
