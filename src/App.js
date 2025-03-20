import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/home';
import Application from './pages/Application/home';
import Apply from './pages/Application/apply';
import ApplicationView from './pages/Application/view';
import Login from './pages/Login/login'
import { useGetMeQuery } from './generated/graphql.tsx';

function App() {
  const office = sessionStorage.getItem('office_code')

  const { data } = useGetMeQuery({
    skip: !!office
  })

  useEffect(() => {
    if(data) {
      sessionStorage.setItem('office_code', data.getMe.office)
      window.location.reload();
    }
  }, [data, office]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        {
        office &&
        <>
          <Route path="/application" element={<Application />} />
          <Route path="/application/apply" element={<Apply />} />
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
