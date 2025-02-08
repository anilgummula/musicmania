import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Uploads from './components/Uploads';
import Downloads from './components/Downloads';
import Signup from './components/Signup';
import Login from './components/Login';

const router = createBrowserRouter([
    {
        path:"/",
        element:(
            <div>
                <NavBar/>
                <Home/>
                <Footer/>
            </div>
        )
    },
    {
        path:"/Uploads",
        element:(
            <div>
                <NavBar/>
                <Uploads/>
                <Footer/>
            </div>
        )
    },
    {
        path:"/Downloads",
        element:(
            <div>
                <NavBar/>
                <Downloads/>
                <Footer/>
            </div>
        )
    },
    {
        path:"/Login",
        element:(
            <div>
                <NavBar/>
                <Login/>
                <Footer/>
            </div>
        )
    },
    {
        path:"/Signup",
        element:(
            <div>
                <NavBar/>
                <Signup/>
                <Footer/>
            </div>
        )
    },
    {
        path:"*",
        element:<NotFound/>
    }
])
function App() {

  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App
