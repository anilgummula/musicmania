import React, { useContext } from 'react'
import { AllContext } from './AllContext'
import Landingpage from './LandingPage'

const Home = () => {
    const {loggedIn} = useContext(AllContext);
  return (
    <div className='mt-20'>
        {!loggedIn?(
            <Landingpage/>
        )
        :(
            Home
        ) }
    </div>
  )
}

export default Home