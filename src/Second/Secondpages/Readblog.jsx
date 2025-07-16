import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Readblog() {
  const { blogid } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(`https://newmedium2-backend.onrender.com/${blogid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlog(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogid) fetchBlog();
  }, [blogid]);

  if (loading) {
    return <div className="text-center py-10 font-mono">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center py-10 font-mono text-red-500">Blog not found.</div>;
  }

  return (
    <div className="text-gray-700 p-5 font-mono max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold break-words">{blog.title}</h1>

      <div className="px-2 text-xl py-2 text-gray-600">
        — {blog.author?.username || 'Unknown'}
      </div>

      <div className="text-sm text-gray-500">
        Published on: {new Date(blog.createdAt).toLocaleString()}
      </div>

      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xl py-10 whitespace-pre-line break-words leading-relaxed">
        {blog.content}
      </div>
    </div>
  );
}

export default Readblog;
