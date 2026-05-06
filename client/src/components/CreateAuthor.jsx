import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const CreateAuthor = ({ onAuthorCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/authors`, { name, email });
      setName('');
      setEmail('');
      onAuthorCreated();
    } catch (error) {
      alert('Error creating author: ' + error.message);
    }
  };

  return (
    <div className="card">
      <h3>Create Author</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Create Author</button>
      </form>
    </div>
  );
};

export default CreateAuthor;
