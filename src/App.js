import React from 'react';
import './App.css';
import Home from './pages/Home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cmnrf from './pages/CMNRF/home';
import Pmnrf from './pages/PMNRF/home';
import CMNRFApply from './pages/CMNRF/apply'
import PMNRFApply from './pages/PMNRF/apply'
import View from './pages/View/view'
import ViewP from './pages/View/viewpmnrf'
import ViewC from './pages/View/viewcmnrf'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cmnrf" element={<Cmnrf />} />
        <Route path="/cmnrfapply" element={<CMNRFApply />} />
        <Route path="/pmnrfapply" element={<PMNRFApply />} />
        <Route path="/view" element={<View/>} />
        <Route path="/pmnrf" element={<Pmnrf />} />
        <Route path="/viewcmnrf" element={<ViewC />} />
        <Route path="/viewpmnrf" element={<ViewP />} />

      </Routes>
    </Router>
  );
}

export default App;
