import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from './api';
import './App.css';
import CreateAuthor from './components/CreateAuthor';
import CreateTag from './components/CreateTag';
import CreatePost from './components/CreatePost';
import DisplayData from './components/DisplayData';

function App() {
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchData = async () => {
    try {
      const [authorsRes, postsRes, tagsRes] = await Promise.all([
        axios.get(`${API_URL}/authors`),
        axios.get(`${API_URL}/posts`),
        axios.get(`${API_URL}/tags`)
      ]);
      setAuthors(authorsRes.data);
      setPosts(postsRes.data);
      setTags(tagsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Blog Relationship Demo (MERN)</h1>
      
      <div className="creation-section">
        <CreateAuthor onAuthorCreated={fetchData} />
        <CreateTag onTagCreated={fetchData} />
        <CreatePost authors={authors} tags={tags} onPostCreated={fetchData} />
      </div>

      <DisplayData authors={authors} posts={posts} tags={tags} />
    </div>
  );
}

export default App;
