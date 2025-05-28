import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';
import News from './components/News';
import Blogs from './components/Blogs';
import AboutUs from './components/AboutUs';

const App = () => {
  const [view, setView] = useState('news'); // 'news' | 'blogs'

  return (
    <Router>
      <div className="container">
        <div className="TruthSpear">
          {/* Render News or Blogs based on state */}
          {view === 'news' && <News onShowBlogs={() => setView('blogs')} />}
          {view === 'blogs' && <Blogs onBack={() => setView('news')} />}

          {/* Routes for other components */}
          <Routes>
            <Route path="/" element={<News onShowBlogs={() => setView('blogs')} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/news-blogs" element={<Blogs onBack={() => setView('news')} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
