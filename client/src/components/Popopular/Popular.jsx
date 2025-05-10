// import React from 'react'
import React, { useEffect, useState } from 'react'
import "./Popular.css"
// import data_product from "../Assets/data" // fetching from fe 
import Item from '../Item/Item'
const  Popular = () => {
   // for sake of fetching from api
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('/popularinwoman')
    .then((resp)=>resp.json())
    .then((data)=>setPopularProducts(data.data))
  },[])
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i)=>{
          return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular;