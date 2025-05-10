import React from 'react'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kid_banner from './components/Assets/banner_kids.png'

const App = () => {
  return (
    <div>
      <BrowserRouter>
    <Navbar/>
      <Routes>
        
        {/* <Route path='/home' element={<Navigate to="/"/>}/> ["/home" Navigate to use "/" to route to homepage Component]
        <Route path='/women' element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path="/about/:username" element={<RoutWithParamSinglePage/>}/> //":" this means we don't know user that is going to come. this "username" rep the user detail coming next */}
        {/* <Route path="/product/*" element={<ProductAvailable/>}/> */}
        {/* <Route path="/product/more-detail" element={<MoreDetailsProduct/>}/> */}
        {/* <Route path='*' element={<Notfoundpage/>}/> here is wildcard checking anylink not match available route */}
        <Route path='/' element={<Shop/>} />
        <Route path='/carts' element={<Cart/>} />
        <Route path='/login' element={<LoginSignup/>} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="woman"/>} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App;
