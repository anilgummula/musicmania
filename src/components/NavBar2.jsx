import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AllContext } from "./AllContext";

function NavBar() {
  const { loggedIn, logout, menu, setMenu } = useContext(AllContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const allNavItems = [
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Downloads", url: "/Downloads", protected: true },
    { id: 3, text: "Upload", url: "/Upload", protected: true },
    // { id: 4, text: "Playlists", url: "/Playlists" }
  ];

  const handleProtectedClick = (event, isProtected) => {
    if (isProtected && !loggedIn) {
      event.preventDefault();
      setShowSignupPrompt(true);
    }
  };

  return (
    <div className="max-w-screen-2xl h-16 container md:px-auto shadow-md fixed left-0 top-0 right-0 z-50 bg-white">
      <div className="flex justify-between items-center mx-10 h-16">
        <h1 className="font-bold text-xl">
          Music<span className="text-blue-400 text-xl">Mania</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-gray-700 space-x-10 text-xl gap-6">
          {allNavItems.map(({ id, text, url, protected: isProtected }) => (
            <li key={id} className="font-bold hover:text-black duration-150 cursor-pointer list-none">
              <NavLink 
                to={url} 
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={(event) => handleProtectedClick(event, isProtected)}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4 font-bold">
          {loggedIn ? (
            <>
              <Link to="/Profile" className="p-2 px-4 border text-orange-500 border-orange-500 rounded-md">
                View Profile
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 px-4 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/Signup" className="p-2 px-4 border text-black border-black rounded-md">
                Join
              </Link>
              <span>|</span>
              <Link to="/Login" className="p-2 px-4 bg-blue-400 text-white rounded-md">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="fixed top-4 right-4 border-2 p-2 z-50 bg-white rounded-md shadow-md md:hidden"
        >
          {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Signup Prompt */}
      {showSignupPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
          <div className="bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center border border-white/40 w-80">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Sign Up Required</h2>
            <p className="text-gray-800 mb-4">You need to sign up to access this feature.</p>
            <div className="flex justify-center space-x-4">
              <Link 
              onClick={()=>setShowSignupPrompt(false)}
                to="/Signup" 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
              <button
                onClick={() => setShowSignupPrompt(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
