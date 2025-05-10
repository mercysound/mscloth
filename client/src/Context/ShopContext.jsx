import React, { createContext, useRef, useState,  useEffect} from "react";
// import all_product from '../components/Assets/all_product' //for sake of fetching from fe

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
  let cart = {}
  for (let index = 0; index < 300+1; index++) { // for sake of fetching from api
  // for (let index = 0; index < all_product.length; index++) { // for sake of fetching from fe
    cart[index] = 0;
  }
  return cart
}
const ShopContextProvider = (props)=>{

  const [all_product, setAll_product] = useState([]) // for sake of fetching from api
  const [cartItem, setcartItem] = useState(getDefaultCart()); // for sake of fetching from api
  

  useEffect(() => {
    fetch('/allproducts')
    .then((resp)=>resp.json())
    .then((data)=>setAll_product(data.data)
    )
    // .catch((error) => {
    //   console.error('Error:', error);
    // })
    if(localStorage.getItem('auth-token')){
      fetch('/getcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
          },
          body:""
      })
      .then((resp)=>resp.json())
      .then((data)=>setcartItem(data.data))
    }
  },[]);
  
  
  const addToCart = (itemId)=>{
    setcartItem((prev)=>{
      return {...prev, [itemId]:prev[itemId]+1}})
    
    if(localStorage.getItem('auth-token')){  //for sake of fetching from api
      fetch('/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId})
      })
      .then((resp)=>resp.json())
      .then(
        (data)=>console.log(data.message)
      )
    }
  }
  const removeFromCart = (itemId)=>{
    setcartItem((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){ //for sake of fetching from api
      fetch('/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId})
      })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.json(); // ✅ backend sends res.json({ message: "Removed" })
      })
      .then((data) => {
        console.log(data.message); // ✅ Safely access message
      })
      .catch((error) => {
        console.error('Failed to remove item from cart:', error);
      });
    }
  }

  const getTotalCartAmount= () =>{
    let totalCart = 0
    for(const item in cartItem){
      if(cartItem[item]>0){
        let itemInfo = all_product.find((product)=>product.id === Number(item))
        console.log(item);
        
        totalCart += itemInfo.new_price * cartItem[item]
      }
    }
    return totalCart
  }
  const getTotalCartItems = () =>{
    let totalItem = 0
    for(const item in cartItem){
      if(cartItem[item]>0){
        totalItem += cartItem[item]
      }
    }
    return totalItem
  }

  //method for latest collection btn in hero section jump scroll
    const targetRef = useRef(null)
    const scrollToTarget = ()=>{
        targetRef.current.scrollIntoView({behaviour:"smooth"})
    }

  const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItem, addToCart, removeFromCart, scrollToTarget, targetRef}

  return(
    <ShopContext.Provider value={contextValue}>  
      {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;