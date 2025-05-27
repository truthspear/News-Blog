import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from './components/News';
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';  // <-- Import ContactUs component

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />   {/* <-- Add ContactUs route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
