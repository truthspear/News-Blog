import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Import Link
import './login.css'; // Your existing CSS file

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('User logged in:', userCredential.user);
      navigate('/'); // Navigate to home or dashboard after login
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>

        {error && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* You can use a class for error styling too */}

        {/* ✅ Added Register Link here */}
        <div className="register-prompt" style={{ textAlign: 'center', marginTop: '20px' }}> {/* Added a class for easier styling */}
          <p>
            New user?{' '}
            <Link to="/register" className="register-link"> {/* Added a class for the link */}
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;