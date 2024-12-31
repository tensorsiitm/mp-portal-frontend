import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/home';
import Cmnrf from './pages/CMNRF/home';
import Pmnrf from './pages/PMNRF/home';
import CMNRFApply from './pages/CMNRF/apply'
import PMNRFApply from './pages/PMNRF/apply'
import Add from "./pages/add_form/add_form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cmnrf" element={<Cmnrf />} />
        <Route path="/cmnrfapply" element={<CMNRFApply />} />
        <Route path="/pmnrfapply" element={<PMNRFApply />} />
        <Route path="/pmnrf" element={<Pmnrf />} />
        <Route path="/new-form" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
