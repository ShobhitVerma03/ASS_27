import React from 'react';

const DisplayData = ({ authors, posts, tags }) => {
  return (
    <div className="display-section">
      <h2>Database State (Populated)</h2>
      
      <div className="section">
        <h3>Authors & their Posts (One-to-Many)</h3>
        {authors.map(author => (
          <div key={author._id} className="item-card">
            <strong>{author.name}</strong> ({author.email})
            <ul>
              {author.posts && author.posts.length > 0 ? (
                author.posts.map(p => <li key={p._id}>{p.title}</li>)
              ) : <li>No posts yet</li>}
            </ul>
          </div>
        ))}
      </div>

      <hr />

      <div className="section">
        <h3>Posts & their Relationships (Author + Tags)</h3>
        {posts.map(post => (
          <div key={post._id} className="item-card">
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <p><em>Author:</em> {post.author?.name || 'Unknown'}</p>
            <p><em>Tags:</em> {post.tags?.map(t => t.name).join(', ') || 'None'}</p>
          </div>
        ))}
      </div>

      <hr />

      <div className="section">
        <h3>Tags & their Posts (Many-to-Many)</h3>
        {tags.map(tag => (
          <div key={tag._id} className="item-card">
            <strong>{tag.name}</strong>
            <ul>
              {tag.posts && tag.posts.length > 0 ? (
                tag.posts.map(p => <li key={p._id}>{p.title}</li>)
              ) : <li>No posts yet</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayData;
