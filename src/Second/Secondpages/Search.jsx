import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true); // Always reset loading state on new query
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token missing.");
          return;
        }

        const res = await axios.get(`https://newmedium2-backend.onrender.com/search?query=${encodeURIComponent(query)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResults(res.data || []);
      } catch (err) {
        console.error("❌ Search failed:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) {
    return <div className="text-center py-10 font-mono">Loading search results...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono text-gray-700">
      <h2 className="text-4xl mb-4">
        Showing results for <span className="text-red-500">{query}</span>:
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-500">No matching blogs found.</p>
      ) : (
        results.map((blog) => (
          <Link to={`/medium2/readblog/${blog._id}`} key={blog._id}>
            <div className="mb-6 py-4 border-b hover:bg-gray-50 transition">
              <h3 className="text-3xl py-2">{blog.title}</h3>
              <p className="text-sm text-gray-600">
                by {blog.author?.username || "Unknown"} on{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {blog.tags?.map((tag, i) => (
                  <span key={i} className="bg-gray-200 text-sm px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Search;
