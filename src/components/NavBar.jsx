import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AllContext } from "./AllContext";

function NavBar() {
  const { loggedIn, logout, menu, setMenu } = useContext(AllContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showSignupPrompt, setShowSignupPrompt] = useState(false);


  const navItems = [
    { id: 1, text: "Home", url:"/" },
    { id: 2, text: "Uploads", url:"/Uploads",Protected: true },
    { id: 3, text: "Downloads", url:"/Downloads", Protected:true},
  ];


  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };
  const cancelLogout = () => setShowLogoutConfirm(false);

  const handleProtectedClick = (e,p)=>{
    if(!loggedIn && p){
        e.preventDefault();
        setShowSignupPrompt(true);
    }
  }

  return (
    <div className="max-w-screen-2xl h-16 fixed left-0 top-0 right-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 h-16">
        {/* Logo */}
        <h1 className="font-bold text-xl">
          Music<span className="text-blue-400">Mania</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-gray-700 text-lg">
          {navItems.map(({ id, text, url,Protected : p }) => (
            <NavLink
              key={id}
              to={url}
              className="text-xl font-bold hover:text-blue-500 transition duration-200 mx-10"
              onClick={(e) => handleProtectedClick(e, p)}
            >
              {text}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {loggedIn ? (
            <>
              <Link
                to="/Profile"
                className="p-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-100 transition"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogoutClick}
                className="p-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/Signup"
                className="p-2 px-4 border text-black border-black rounded-md hover:bg-gray-100 transition"
              >
                Join
              </Link>
              <span>|</span>
              <Link
                to="/Login"
                className="p-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden p-2 rounded-md bg-white shadow-md"
          aria-expanded={menu}
          aria-controls="mobile-menu"
        >
          {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-screen bg-white z-40 transform ${
          menu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-semibold text-gray-800"><span className="font-bold">So</span><span className="text-blue-500 font-bold" >up</span></h2>
          <button
            onClick={() => setMenu(false)}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            <IoCloseSharp size={28} />
          </button>
        </div>

        <ul className="flex flex-col space-y-6 text-lg items-center pt-8">
          {!loggedIn && (
            <div className="flex flex-col items-center gap-4 mb-4">
              <Link
                to="/Signup"
                className="p-3 w-48 text-center font-semibold border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-100 transition"
                onClick={() => setMenu(false)}
              >
                Join
              </Link>
              <Link
                to="/Login"
                className="p-3 w-48 text-center font-semibold bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
                onClick={() => setMenu(false)}
              >
                Login
              </Link>
            </div>
          )}
          {navItems.map(({ id, text, url, Protected : p }) => (
            <li key={id} className="w-full" onClick={() => setMenu(false)}>
              <NavLink
                to={url}
                className="block py-3 text-center font-semibold text-gray-800 hover:bg-blue-100 rounded-md transition border-b border-blue-100"
                onClick={(e)=>{handleProtectedClick(e,p)}}
              >
                {text}
              </NavLink>
              
            </li>
          ))}
          {loggedIn && (
            <Link
              to="/Profile"
              className="p-3 w-48 text-center border border-orange-500 text-orange-500 rounded-md hover:bg-orange-100 transition"
              onClick={() => setMenu(false)}
            >
              View Profile
            </Link>
          )}
          {loggedIn && (
            <button
              onClick={handleLogoutClick}
              className="p-3 w-48 text-center bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-between gap-4">
              <button
                onClick={confirmLogout}
                className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Yes, Log Out
              </button>
              <button
                onClick={cancelLogout}
                className="w-full p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


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
