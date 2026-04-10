import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import './index.css'

import Editor from './pages/Editor' // <--- ይህንን ጨምር

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/editor/:id",
    element: <Editor />, // <--- እዚህ ጋር ቀይረው
  },
])

// 2. አፑን ማስነሳት
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)