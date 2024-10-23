import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [MobileNav, setMobileNav] = useState(false);

  const navLinks = [
    { name: "home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "All podcasts", path: "/all-podcasts" },
  ];

  return (
    <nav className="px-4 py-2 bg-[#EEEEEE] md:px-8 lg:px-12 relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center w-2/6">
          <img
            className="h-12"
            src="https://cdn-icons-png.flaticon.com/512/2368/2368447.png"
            alt="podcastShow"
          />
          <Link to="/" className="ms-4 text-2xl font-bold">
            PodcastShow
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="w-2/6 hidden lg:flex items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              className="ms-4 hover:font-semibold transition-all duration-300"
              key={i}
              to={items.path}
            >
              {items.name}
            </Link>
          ))}
        </div>

        <div className="w-2/6 hidden lg:flex items-center justify-end">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="ms-4 px-6 py-3 text-white bg-black rounded-full"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3 border border-black rounded-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ms-4 px-6 py-3 text-white bg-black rounded-full"
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="w-4/6 flex justify-end lg:hidden">
          <button
            className="text-4xl"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileNav(!MobileNav)}
          >
            <IoReorderThree />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed w-full top-0 left-0 h-screen bg-blue-100 transition-transform duration-500 ease-in-out ${
          MobileNav ? "translate-y-0" : "translate-y-full"
        } z-50`}
      >
        <div className="p-8 flex items-center justify-end text-3xl">
          <button
            aria-label="Close mobile menu"
            onClick={() => setMobileNav(!MobileNav)}
          >
            <ImCross />
          </button>
        </div>

        <div className="h-full flex flex-col items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              key={i}
              to={items.path}
              onClick={() => setMobileNav(false)}
            >
              {items.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <Link
              to="/profile"
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              onClick={() => setMobileNav(false)}
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
                onClick={() => setMobileNav(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
                onClick={() => setMobileNav(false)}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
