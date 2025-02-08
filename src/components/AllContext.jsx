import React, { createContext, useState, useEffect } from 'react';
import { handleSuccess } from '../utils';

export const AllContext = createContext();

const AllProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [menu, setMenu] = useState(false);
    const [loggedout,setLoggedOut] =useState(false);
    
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedIn(true); 
            setLoggedInUser(user);
        }
    }, []);
    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setLoggedIn(false);
        setLoggedInUser(null);
        setMenu(false);
        setLoggedOut(true);
        handleSuccess("Logged Out");
        window.location.href = "/";
    };

    return (
        <AllContext.Provider value={{ loggedIn, loggedInUser, setLoggedIn, setLoggedInUser, logout,menu,setMenu}}>
            {children}
        </AllContext.Provider>
    );
};

export default AllProvider;
