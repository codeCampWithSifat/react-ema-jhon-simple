import React, { createContext, useState } from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NoMatch from './Components/NoMatch/NoMatch';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';



export const UserContext = createContext()

function App() {
  const [loggedInUser , setLoggedInUser] = useState({})
  return (
    <UserContext.Provider  value= {[loggedInUser , setLoggedInUser]} >
        <Header/>
      <BrowserRouter>
      <Routes>
        <Route path ="" element ={<Shop/>}/>
        <Route path ="/shop" element ={<Shop/>}/>
        <Route path ="/review" element ={<Review/>} />
        <Route path ="/inventory" element={<Inventory/>}/>
        <Route path="/product/:productKey" element={<ProductDetail/>} />
        <Route path ="/login" element = {<Login/>}/>
        <Route path ="/shipment" element = {<Shipment/>}/>
        <Route path ="*" element={<NoMatch/>}/>
      </Routes>
      </BrowserRouter>
    
    </UserContext.Provider>
  );
}

export default App;
