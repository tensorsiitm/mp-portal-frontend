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

  console.log(process.env.REACT_APP_AWS_ACCESS)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        {office &&
        <>
          <Route path="/application" element={<Application />} />
          <Route path="/application/apply" element={<Apply />} />
          <Route path="/application/view" element={<ApplicationView />} />
        </>
        }
      </Routes>
    </Router>
  );
}

export default App;
