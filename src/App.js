import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from "./StartPage.js";
import Shop from "./Shop.js";
import Background from "./components/Background";
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
                          {/*TODO: add profile*/}
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
