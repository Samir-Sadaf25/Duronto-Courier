import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'

import { Bounce, ToastContainer } from 'react-toastify'
import AuthProvider from './Contexts & Providers/AuthContext & Provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
   <div className='font-urbanist'>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
   </div>
  </StrictMode>,
)
