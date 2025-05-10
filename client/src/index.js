import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter} from 'react-router-dom';
import ShopContextProvider from './Context/ShopContext';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import allReducer from './Redux/CounterRedux'
// let myStore = configureStore({
//   reducer:allReducer
// })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>  */}
    {/* here is meant for redux provider */}
    {/* <Provider store={myStore}> */}
    <ShopContextProvider>
      <App/>
    </ShopContextProvider>
    {/* </Provider> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
