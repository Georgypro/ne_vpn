import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import StartPage from "./StartPage.js";
import Shop from "./Shop.js";
import Background from "./components/Background";
import Content from "./components/Content";
import YAuth from "./registration/YAuth";

function App() {
  return (
      <div className="App">
          <div className="App">

              <div id="Body">
                  <div>
                      <Background/>
                  </div>
                  <Router>
                      <Routes>
                          <Route path="/yauth" element={<YAuth/>}/>
                          <Route path="/shop" element={<Shop/>}/>
                          <Route path="" element={<StartPage/>}/>
                          <Route path="/" element={<StartPage/>}/>
                      </Routes>
                  </Router>
              </div>

          </div>
      </div>
  );
}

export default App;
