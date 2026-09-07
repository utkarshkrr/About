import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log(
  '%c> looking under the hood?',
  'font-family: monospace; font-size: 14px; font-weight: bold;'
)

console.log(
  '%cnice.',
  'font-family: monospace; font-size: 12px;'
)

console.log(
  '%c→ github.com/utkarshkrr',
  'font-family: monospace; font-size: 12px;'
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)