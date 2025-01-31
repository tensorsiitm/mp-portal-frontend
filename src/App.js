import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/home';
import Cmnrf from './pages/CMNRF/home';
import Pmnrf from './pages/PMNRF/home';
import CMNRFApply from './pages/CMNRF/apply'
import PMNRFApply from './pages/PMNRF/apply'
// import Add from "./pages/add_form/add_form";
import View from './pages/View/view'
import ViewP from './pages/View/viewpmnrf'
import ViewC from './pages/View/viewcmnrf'
import Login from './pages/Login/login'
import { useGetMeQuery } from './generated/graphql.tsx';

function App() {
  const office = sessionStorage.getItem('office_code')

  const { data } = useGetMeQuery({
    skip: !!office
  })

  useEffect(() => {
    console.log('here', data, office)
    if(data) {
      sessionStorage.setItem('office_code', data.getMe.office)
      window.location.reload();
    }
  }, [data]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        {office &&
        <>
          <Route path="/cmnrf" element={<Cmnrf />} />
          <Route path="/cmnrfapply" element={<CMNRFApply />} />
          <Route path="/pmnrfapply" element={<PMNRFApply />} />
          <Route path="/view" element={<View/>} />
          <Route path="/pmnrf" element={<Pmnrf />} />
          {/* <Route path="/new-form" element={<Add />} /> */}
          <Route path="/viewcmnrf" element={<ViewC />} />
          <Route path="/viewpmnrf" element={<ViewP />} />
        </>
        }
      </Routes>
    </Router>
  );
}

export default App;
