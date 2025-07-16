import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userAtom from '../../Store/userAtom';

function Profile() {
  const user = useRecoilValue(userAtom);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!user?.userId || !token) {
          toast.error("User not logged in or token missing");
          return;
        }

        const result = await axios.get(
          `https://newmedium2-backend.onrender.com/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBlogs(result.data.blogs || []);
      } catch (err) {
        console.error('❌ Failed to fetch blogs', err);
        toast.error('Could not fetch blogs. Try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [user.userId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.info('URL copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy URL.');
      console.error(err);
    }
  };

  const confirmAndDelete = (blogId) => {
    toast(
      ({ closeToast }) => (
        <div className="text-m font-mono">
          <p className="mb-2">Confirm deletion?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                deleteBlog(blogId);
                closeToast();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 border border-gray-400 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  const deleteBlog = async (blogId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://newmedium2-backend.onrender.com/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success('Blog deleted successfully');
    } catch (err) {
      console.error('❌ Failed to delete blog', err);
      toast.error('Error deleting blog');
    }
  };

  return (
    <>
      <div className="py-5 text-gray-600 font-mono">
        <div className="text-5xl flex justify-between items-center">
          <div>{user.userName || "Profile"}</div>
          <button
            onClick={handleCopy}
            className="text-2xl px-3 text-gray-700"
            title="Copy URL"
          >
            &#8942;
          </button>
        </div>
      </div>

      <div className="py-10">
        {loading ? (
          <div className="text-center py-10">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10 text-gray-600 font-mono">
            <p className="mb-4 text-xl">You haven't written any blogs yet.</p>
            <Link to="/publish" className="hover:underline text-green-600">
              Write a blog
            </Link>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border-b text-gray-700 font-mono py-5 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start gap-4">
                <Link
                  to={`/medium2/readblog/${blog._id}`}
                  className="w-full hover:underline"
                >
                  <div className="text-2xl font-semibold break-words">
                    {blog.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </Link>
                <div className="flex flex-col items-end gap-2">
                  <Link
                    to={`/medium2/editblog/${blog._id}`}
                    className="text-green-500 text-sm hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => confirmAndDelete(blog._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Profile;
