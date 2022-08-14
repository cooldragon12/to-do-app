import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ListTaskProvider } from "./store/context/ListTask";
// Pages Component
import Dashboard from './pages/Dashboard';
import {Navigation} from './components/@nav';
import Listings from './pages/Listings'
function App() {
  return (
  <ListTaskProvider>
    <div className="main">

      <Router>
        {/* <Navigation/> */}
        <Routes>
          {/* Dashboard */}
          {/* <Route index element={<Dashboard/>}/> */}
          <Route index element={<Listings/>}/>

        </Routes>
      </Router>
    </div>
  </ListTaskProvider>
  );
}

export default App;
