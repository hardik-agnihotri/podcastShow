import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer"

const mainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className=" w-full">

      <AudioPlayer/>
      </div>
    </div>
  );
};

export default mainLayout;
