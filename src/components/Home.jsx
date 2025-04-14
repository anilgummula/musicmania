import React, { useContext } from 'react'
import { AllContext } from './AllContext'
import Landingpage from './LandingPage'
import HomePage from './HomePage';

const Home = () => {
    const {loggedIn} = useContext(AllContext);
  return (
    <div className='mt-16 min-h-screen'>
        {/* {!loggedIn?(
            <Landingpage/>
        )
        :(
            <HomePage/>
        ) } */}
        <HomePage/>
    </div>
  )
}

export default Home