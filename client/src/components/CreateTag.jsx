import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const CreateTag = ({ onTagCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/tags`, { name });
      setName('');
      onTagCreated();
    } catch (error) {
      alert('Error creating tag: ' + error.message);
    }
  };

  return (
    <div className="card">
      <h3>Create Tag</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Tag Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
};

export default CreateTag;
