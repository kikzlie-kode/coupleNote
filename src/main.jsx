import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import liff from '@line/liff'

// Initialize LIFF
liff.init({
  liffId: import.meta.env.VITE_LIFF_ID
}).then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}).catch((err) => {
  console.error('LIFF initialization failed:', err)
})