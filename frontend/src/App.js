import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Flights from './components/Flights';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
