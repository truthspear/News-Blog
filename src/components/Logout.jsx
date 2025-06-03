import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Clear local storage or session (if any)
        localStorage.removeItem('userToken'); // or whatever you store
        localStorage.removeItem('bookmarks'); // optional

        // ✅ Optional: add logout confirmation delay
        const timer = setTimeout(() => {
            navigate('/login'); // Redirect to login page
        }, 1000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>You have been logged out successfully.</h2>
            <p>Redirecting to login page...</p>
        </div>
    );
};

export default Logout;
