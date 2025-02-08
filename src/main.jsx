import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AllProvider from './components/AllContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AllProvider>
        <App />
    </AllProvider>
  </StrictMode>,
)
