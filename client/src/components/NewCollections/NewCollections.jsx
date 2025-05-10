import { useContext } from 'react'
import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collection from '../Assets/new_collections' // fetching from fe
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext';

const NewCollections = () => {
  const {targetRef} = useContext(ShopContext);
  // for the sake of fetching from api
  const [new_collection, setNew_collection] = useState([])
  useEffect(()=>{
    fetch("/newcollections")
    .then((resp)=>resp.json())
    .then((data)=>setNew_collection(data.data))
    .catch((err)=>console.log(err))
  },
  [])
  return (
    <div className='new-collections' ref={targetRef}>
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections;
