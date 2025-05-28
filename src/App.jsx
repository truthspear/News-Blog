import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from './components/News';
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';  // <-- Import ContactUs component
import Blogs from './components/Blogs';

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="TruthSpear">
            <Routes>
              <Route path="/" element={<News />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<ContactUs />} /> 
              <Route path="/news-blogs" element={<Blogs />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
