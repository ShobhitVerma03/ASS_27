import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const CreatePost = ({ authors, tags, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorId) return alert('Please select an author');
    
    try {
      await axios.post(`${API_URL}/posts`, {
        title,
        content,
        authorId,
        tagIds: selectedTagIds
      });
      setTitle('');
      setContent('');
      setAuthorId('');
      setSelectedTagIds([]);
      onPostCreated();
    } catch (error) {
      alert('Error creating post: ' + error.message);
    }
  };

  const handleTagToggle = (tagId) => {
    setSelectedTagIds(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="card">
      <h3>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        
        <label>Select Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
          <option value="">-- Choose Author --</option>
          {authors.map(author => (
            <option key={author._id} value={author._id}>{author.name}</option>
          ))}
        </select>

        <label>Select Tags:</label>
        <div className="tag-options">
          {tags.map(tag => (
            <label key={tag._id}>
              <input 
                type="checkbox" 
                checked={selectedTagIds.includes(tag._id)} 
                onChange={() => handleTagToggle(tag._id)} 
              />
              {tag.name}
            </label>
          ))}
        </div>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
