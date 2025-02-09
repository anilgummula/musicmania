import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { AllContext } from "./AllContext";

const Login = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const { setLoggedIn, setLoggedInUser } = useContext(AllContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [showpass,setShowpass] = useState(false);
        
    const showpassClicked = (e)=>{
        if(showpass){
            setShowpass(false);
        }
        else{
            setShowpass(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return handleError("Email and password are required");
        }

        setLoading(true);
        try {
            // const url = `http:localhost:3000/auth/login`;
            const url = `${API_BASE_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            const { success, message, jwtToken, username, error } = result;

            setLoading(false);
            if (success) {
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", username);
                setLoggedIn(true);
                setLoggedInUser(username);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || "An error occurred";
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (error) {
            setLoading(false);
            handleError("An unexpected error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-transparent ">
            <div className="w-full max-w-md p-8 rounded-2xl border border-white bg-white shadow-xl">
                <h2 className="text-xl font-bold text-gray-900 text-center">Welcome Back!</h2>
                <p className="text-sm text-gray-700 text-center mb-6">Login to access your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold text-sm">Email</label>
                        <input
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold text-sm">Password</label>
                        <input
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                            type={showpass? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className='mt-5 flex'>show password
                            <input type="checkbox" className='flex mx-5' onClick={showpassClicked} />
                        </p>
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-900 mt-2 block text-end">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 mt-4 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-all ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/Signup" className="text-sm text-gray-700">
                        Don't have an account? <span className="text-green-700 font-semibold">Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
