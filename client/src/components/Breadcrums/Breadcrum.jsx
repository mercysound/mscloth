import React from 'react'
import './Breadcrum.css'
import arrrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
  const{product} = props
  return (
    <div className='breadcrum'>
      HOME <img src={arrrow_icon} alt="" /> SHOP <img src={arrrow_icon} alt="" /> {product.category} <img src={arrrow_icon} alt="" /> <p>{product.name}</p>
    </div>
  )
}

export default Breadcrum;
