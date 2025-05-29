import React, { useState, useEffect } from 'react';
import userImg from '../assets/images/user.jpg';
import './Blogs.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Blogs = ({ onBack, isEditMode, blogIdToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [originalBlogData, setOriginalBlogData] = useState(null); // To store original data for comparison or reset

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && blogIdToEdit) {
      const storedBlogs = JSON.parse(localStorage.getItem('myLocalBlogs')) || [];
      const blogToEdit = storedBlogs.find(blog => blog.id === blogIdToEdit);
      if (blogToEdit) {
        setTitle(blogToEdit.title);
        setContent(blogToEdit.content);
        setImagePreviewUrl(blogToEdit.image || ''); // Ensure there's a fallback
        setOriginalBlogData(blogToEdit);
      } else {
        alert("Blog post not found for editing.");
        navigate('/'); // Or to a 404 page
      }
    } else {
      // Reset form for create mode (or if navigating from edit to create)
      setTitle('');
      setContent('');
      setImagePreviewUrl('');
      setImageFile(null);
      setOriginalBlogData(null);
    }
  }, [isEditMode, blogIdToEdit, navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If file selection is cancelled, revert to original image if editing
      if (isEditMode && originalBlogData) {
        setImagePreviewUrl(originalBlogData.image || '');
      } else {
        setImagePreviewUrl('');
      }
      setImageFile(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && content.trim()) {
      let successMessage = '';
      let storedBlogs = JSON.parse(localStorage.getItem('myLocalBlogs')) || [];

      if (isEditMode && blogIdToEdit) {
        // --- EDIT MODE ---
        const blogIndex = storedBlogs.findIndex(blog => blog.id === blogIdToEdit);
        if (blogIndex > -1) {
          const updatedBlog = {
            ...storedBlogs[blogIndex], // Keep original ID, publishedAt, source, url etc.
            title: title.trim(),
            content: content.trim(),
            image: imagePreviewUrl,
            updatedAt: new Date().toISOString(), // Add an updated date
          };
          storedBlogs[blogIndex] = updatedBlog;
          successMessage = 'Blog post updated successfully!';
        } else {
          alert("Error: Blog post not found for update.");
          return;
        }
      } else {
        // --- CREATE MODE ---
        const newBlogPost = {
          id: uuidv4(),
          title: title.trim(),
          content: content.trim(),
          image: imagePreviewUrl,
          source: { name: "My Blog" },
          url: `local://blog/${uuidv4()}`, // Unique local URL
          publishedAt: new Date().toISOString(),
          isLocalBlog: true,
        };
        storedBlogs.push(newBlogPost);
        successMessage = 'Blog post created successfully!';
      }

      try {
        localStorage.setItem('myLocalBlogs', JSON.stringify(storedBlogs));
        alert(successMessage);
        if (onBack) {
          onBack(); // Navigate back to the News page
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error saving to local storage:", error);
        alert("Could not save changes.");
      }

    } else {
      alert('Please add a title and content.');
    }
  };

  return (
    <div className='blogs'>
      <div className="blogs-left">
        <img src={userImg} alt="User" />
      </div>
      <div className="blogs-right">
        <div className="blogs-right-form">
          <h1>{isEditMode ? 'Edit Post' : 'New Post'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>
                {imageFile ? imageFile.name : (imagePreviewUrl ? 'Change Image' : 'Upload Image')}
              </label>
              <input
                type="file"
                id='file-upload'
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            {imagePreviewUrl && (
              <div className="image-preview-container" style={{maxWidth: '100%', marginBottom: '1rem'}}>
                <img src={imagePreviewUrl} alt="Preview" style={{maxWidth: '100%', maxHeight: '200px', display: 'block', margin: '0 auto', borderRadius: '4px'}}/>
              </div>
            )}
            <input
              type="text"
              placeholder={isEditMode ? 'Edit Title' : 'Add Title (Max 60 Characters)'}
              className='title-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              required
            />
            <textarea
              className="text-input"
              placeholder={isEditMode ? 'Edit Text' : 'Add Text (Your blog content here...)'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <button type='submit' className='submit-btn'>
              {isEditMode ? 'Update Post' : 'Create Post'}
            </button>
          </form>
        </div>
        <button className="blogs-close-btn" onClick={onBack || (() => navigate('/'))}>
          Cancel <i className="bx bx-x"></i> {/* Changed icon to 'x' for cancel */}
        </button>
      </div>
    </div>
  );
};

export default Blogs;