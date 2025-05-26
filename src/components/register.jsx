import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with displayName (combine first & last name)
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      setSuccess("User registered successfully!");
      console.log("Registered user:", userCredential.user);

      // Optionally reset form or redirect here
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
    </div>
  );
};

export default Register;
