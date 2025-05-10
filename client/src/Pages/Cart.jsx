import React from 'react'
import CartItems from '../components/CartItem/CartItems';
// import { useDispatch, useSelector } from 'react-redux'
// import {increament, incrementByUser} from '../Redux/CounterRedux'
const Cart = () => {
  // let myGlobalState =  useSelector(state=>state.counter.myName);
  // console.log(myGlobalState); Is for redux display useSelector
  // let dispatch = useDispatch()
  return (
    <div className='cart'>
      {/* {myGlobalState} */}
      {/* <button onClick={()=>dispatch(increament())}>Increament</button>
      <button onClick={()=>dispatch(incrementByUser(5))}>increase by user</button> */}
      <CartItems/>
    </div>
  )
}

export default Cart;