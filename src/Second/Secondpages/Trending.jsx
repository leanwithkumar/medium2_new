import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Trending() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchBlogs = async (pageNumber) => {
    try {
      const res = await axios.get(`https://newmedium2-backend.onrender.com/trending?page=${pageNumber}`, {
      withCredentials: true
      });
      const newBlogs = res.data;

      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }
    } catch (err) {
      console.error("Failed to fetch trending blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [handleObserver]);

  return (
    <div className="p-10 text-gray-700">
      <div className="text-5xl font-mono mb-8">Trending Blogs</div>

      {blogs.map((blog) => (
        <Link to={`/medium2/readblog/${blog._id}`} key={blog._id}>
          <div className="border-b py-6 hover:bg-gray-50 cursor-pointer">
            <h2 className="text-3xl text-black break-words font-mono">{blog.title}</h2>
            <p className="text-sm text-gray-500 py-2 font-mono">
              by {blog.author?.username || 'Unknown'} — {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}

      {hasMore ? (
        <div ref={loaderRef} className="text-center py-5 text-gray-400">
          Loading more blogs...
        </div>
      ) : (
        <div className="text-center py-5 text-gray-400">
          You've reached the end!
        </div>
      )}
    </div>
  );
}

export default Trending;
