import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'; // Added useParams
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';
import News from './components/News';
import Blogs from './components/Blogs'; // This will now handle create and edit
import AboutUs from './components/AboutUs';
// Assuming NewsModel and other components are correctly imported where needed

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="TruthSpear">
          <Routes>
            <Route path="/" element={<NewsWrapper />} />
            {/* Route for creating a new blog */}
            <Route path="/news-blogs" element={<BlogsWrapper isEditMode={false} />} />
            {/* Route for editing an existing blog */}
            <Route path="/edit-blog/:blogId" element={<BlogsWrapper isEditMode={true} />} />
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

// BlogsWrapper now handles passing edit mode and blogId
const BlogsWrapper = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { blogId } = useParams(); // Get blogId from URL if present

  return (
    <Blogs
      onBack={() => navigate('/')}
      isEditMode={isEditMode}
      blogIdToEdit={isEditMode ? blogId : null} // Pass blogId only in edit mode
    />
  );
};

export default App;