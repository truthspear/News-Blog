import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';
import News from './components/News';
import Blogs from './components/Blogs';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="TruthSpear">
          <Routes>
            <Route path="/" element={<NewsWrapper />} />
            <Route path="/news-blogs" element={<BlogsWrapper />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const NewsWrapper = () => {
  const navigate = useNavigate();
  return <News onShowBlogs={() => navigate('/news-blogs')} />;
};

const BlogsWrapper = () => {
  const navigate = useNavigate();
  return <Blogs onBack={() => navigate('/')} />;
};

export default App;
