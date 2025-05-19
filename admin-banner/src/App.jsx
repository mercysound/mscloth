import React from 'react'
import Admin from './Pages/Admin/Admin'
import Navbar from './Components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      {/* <ToastContainer> */}
      <ToastContainer/>
        <Navbar/>
        <Admin/>
    </div>
  )
}

export default App