import React, { useContext, useRef, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown_icon from '../Assets/nav_dropdown_icon.png'
// import dropdown_icon from '../components/Assets/dropdown_icon.png'
const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const {getTotalCartItems} = useContext(ShopContext);
  let menuRef = useRef()
  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  
  return (
    <>
    <div className='nav'>
    <Link className='link-underline' to="/">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p >SHOPPER</p>
      </div>
    </Link>  
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown_icon} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <Link className='link-underline' to="/"><li onClick={()=>{setMenu("shop")}}>Shops {menu==="shop"?<hr/>:<></>}</li></Link>
        <Link className='link-underline' to="/mens"><li onClick={()=>{setMenu("mens")}}>Mens {menu==="mens"?<hr/>:<></>}</li></Link>
        <Link className='link-underline' to="/womens "><li onClick={()=>{setMenu("womans")}}>Womans {menu==="womans"?<hr/>:<></>}</li></Link>
        <Link className='link-underline' to="/kids"><li onClick={()=>{setMenu("kids")}}>Kids {menu==="kids"?<hr/>:<></>}</li></Link>
        {/* <Link className='link-underline' to="/product"><li>Product</li><hr/></Link> */}
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Log Out</button>:<Link to='/login'><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
    </>
  )
}

export default Navbar