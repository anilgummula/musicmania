import {React,useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';
import { handleError, handleSuccess } from '../utils';


const Signup = () => {
    // const API_BASE_URL = "https://farmer-market-backend-xpxy.onrender.com";
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    // const [mobile,setMobile] = useState("");
    // const [type,setType] = useState("");
    const [password,setPassword] = useState("");
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
      if(!username || !email || !password){
        return handleError('fields are required');
      }

      setLoading(true);
      try {
          // const url ="http://localhost:3000/auth/register";
        const url = `${API_BASE_URL}/auth/signup`;
        const response = await fetch(url,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,email,password})
        });
        const result = await response.json();
        const {success ,message ,error,jwtToken } = result;
        if(success){
            handleSuccess(message);
            
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("loggedInUser", username);
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        }
        else if(error){
            const details = error?.details[0].message;
            handleError(details);
            setLoading(false);
        }
        else if(!success){
            handleError(message);
            setLoading(false);
        }
        console.log(result);
    } catch (err) {
        handleError(err);
        setLoading(false);
            
      }
    }


  return (
    
  // -------------------------------------------------------------------
  <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 mt-10">
      <div className="flex m-auto w-120 bg-white rounded-lg shadow-lg overflow-hidden  p-5 justify-between">
         

        <div className="w-full p-8 ">
          <p className="text-xl text-gray-600 text-center">Register here!</p>
          {/* <div className="mt-4"> */}
          {/* </div> */}

        <form onSubmit={(e)=> handleSubmit(e)}>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
              Username
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 mb-4"
              type="text"
              name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              required
            />
            
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
              Email
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 "
              type="email"
              name="email"
              value={email}
                onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type={showpass? "text" : "password"}
              value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <p className='mt-5 flex'>show password
                <input type="checkbox" className='flex mx-5' onClick={showpassClicked} />
            </p>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            {/* <Link to="/"
                onClick={(e)=>{
                    // e.preventDefalut();
                    console.log("credentials: ",username,email,password);
                    console.log("logged In...")
                }} 
            > */}
                <button type='submit'  className={`bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''} `} disabled={loading} >
                {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            {/* </Link> */}
          </div>
        </form>

          
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              to="/Login"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Already have any account?
              <span className="text-green-700">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;