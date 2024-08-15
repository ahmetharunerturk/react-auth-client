import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = location.state || {};

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
    
      axios
        .get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error('Profile error', error);
          navigate('/login');
        });
    }
  }, [token, navigate]);

  const handleLogout = () => {
    
    navigate('/login');
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome, {profile.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MyProfile;
