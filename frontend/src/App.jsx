import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import AddPodcast from "./pages/AddPodcast";
import AllPodcast from "./pages/AllPodcast";
import CategoriesPage from "./pages/CategoriesPage";
import DescriptionPage from "./pages/DescriptionPage";



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/user/check-cookie", {
          withCredentials: true,
        });
        console.log(res.data.msg);
        if (res.data.msg === true) {
          dispatch(authActions.login());
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }
    };
    
    checkUserSession();
  }, [dispatch]);

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/all-podcasts" element={<AllPodcast />} />
            <Route path="/categories/:cat" element={<CategoriesPage />} />
            <Route path="/description/:id" element={<DescriptionPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
