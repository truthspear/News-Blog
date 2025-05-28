import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';
<<<<<<< Updated upstream
=======
import News from './components/News';
>>>>>>> Stashed changes
import Blogs from './components/Blogs';
import AboutUs from './components/AboutUs';

const App = () => {
  const [view, setView] = useState('news'); // 'news' | 'blogs'

  return (
    <Router>
      <div className="container">
        <div className="TruthSpear">
<<<<<<< Updated upstream
            <Routes>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/" element={<News />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<ContactUs />} /> 
              <Route path="/news-blogs" element={<Blogs />} />
            </Routes>
=======
          {view === 'news' && <News onShowBlogs={() => setView('blogs')} />}
          {view === 'blogs' && <Blogs onBack={() => setView('news')} />}
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
>>>>>>> Stashed changes
        </div>
      </div>
    </Router>
  );
};

export default App;
