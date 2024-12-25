import React from 'react';
import './App.css';
import Home from './pages/Home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cmnrf from './pages/CMNRF/home';
import Pmnrf from './pages/PMNRF/home';
import CMNRFApply from './pages/CMNRF/apply'
import PMNRFApply from './pages/PMNRF/apply'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cmnrf" element={<Cmnrf />} />
        <Route path="/cmnrfapply" element={<CMNRFApply />} />
        <Route path="/pmnrfapply" element={<PMNRFApply />} />
        <Route path="/pmnrf" element={<Pmnrf />} />
      </Routes>
    </Router>
  );
}

export default App;
