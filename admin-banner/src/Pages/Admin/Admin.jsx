import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';

const  Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/admin' element={<h1>Welcome to admin page</h1>}/>
        <Route path='/admin/includeproduct' element={<AddProduct/>}/>
        <Route path='/admin/listproduct' element={<ListProduct/>}/>
      </Routes>

    </div>
  )
}

export default Admin;