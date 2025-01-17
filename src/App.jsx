import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import IDCard from './components/IDCard ';
import IDCardFront from './components/IDCardFront';
import ChooseTemplate from './components/ChooseTemplate';
import LandScape from './components/LandScape';
import PackagesPage from './components/PackagesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/idcard" element={<IDCard/>}/>
        <Route path="/idcardfront" element={<IDCardFront/>}/>
        <Route path='/chooseTemplate' element={<ChooseTemplate/>}/>
        <Route path='/landscapeId' element={<LandScape/>}/>
        <Route path="/subscription" element={<PackagesPage />} />
      </Routes>
    </Router>
  );
};

export default App
