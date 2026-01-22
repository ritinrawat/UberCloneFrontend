import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketContext from './context/SocketContext.jsx'
import { HashRouter } from "react-router-dom";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <CaptainContext>
    <UserContext>
   <SocketContext>
   
<App />

   </SocketContext>

    </UserContext>
    </CaptainContext>
    </HashRouter>
    </StrictMode>,
)
