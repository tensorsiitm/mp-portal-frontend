import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/home';
import Application from './pages/Application/home';
import ApplicationApply from './pages/Application/apply';
import ApplicationView from './pages/Application/view';
// import CMNRF from './pages/CMNRF/home';
// import PMNRF from './pages/PMNRF/home';
// import CMNRFApply from './pages/CMNRF/apply'
// import PMNRFApply from './pages/PMNRF/apply'
// import View from './pages/View/view'
// import ViewP from './pages/View/viewpmnrf'
// import ViewC from './pages/View/viewcmnrf'
// import Add from "./pages/add_form/add_form";
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
          <Route path="/application" element={<Application />} />
          <Route path="/application/apply" element={<ApplicationApply />} />
          <Route path="/application/view" element={<ApplicationView />} />
          {/* <Route path="/cmnrf" element={<CMNRF />} />
          <Route path="/pmnrf" element={<PMNRF />} />
          <Route path="/cmnrf/apply" element={<CMNRFApply />} />
          <Route path="/pmnrf/apply" element={<PMNRFApply />} />
          <Route path="/view" element={<View/>} />
          <Route path="/view/cmnrf" element={<ViewC />} />
          <Route path="/view/pmnrf" element={<ViewP />} /> */}
          {/* <Route path="/new-form" element={<Add />} /> */}
        </>
        }
      </Routes>
    </Router>
  );
}

export default App;
