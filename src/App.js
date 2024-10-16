import './css/App.css';
import './css/Main.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from "./js/StartPage.js";
import Shop from "./js/Shop.js";
import Background from "./background/Background";
import YAuth from "./registration/YAuth";
import ShopVMobile from "./js/ShopVMobile";
import Profile from "./js/Profile";
import Promo from "./js/Promo";
import YAuthMobile from "./registration/YAuthMobile";
import Signature from "./js/Signature";

function App() {
  return (
      <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{width: '100%'}}>
              <div>
                  <Background/>
              </div>
              <Router>
                  <Routes>
                      {/*TODO no chakra test*/}
                      <Route path="/promo" element={<Promo/>}/>
                      <Route path="/profile" element={<Profile/>}/>
                      <Route path="/mobileShop" element={<ShopVMobile/>}/>
                      <Route path="/yauth" element={<YAuth/>}/>
                      <Route path="/yauth-mobile" element={<YAuthMobile/>}/>
                      <Route path="/shop" element={<Shop/>}/>
                      <Route path="" element={<StartPage/>}/>
                      <Route path="/" element={<StartPage/>}/>
                  </Routes>
              </Router>
          </div>
          <Signature/>
      </div>
  );
}

export default App;
