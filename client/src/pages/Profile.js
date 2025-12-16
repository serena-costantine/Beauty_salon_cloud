import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setMessage('');
      } catch (err) {
        setMessage('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Your Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          placeholder="Your Name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          required
          placeholder="Your Email"
        />

        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
