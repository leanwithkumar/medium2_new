import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { toast, ToastContainer, Bounce } from 'react-toastify';

function EditBlog() {
  const { blogid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://newmedium2-backend.onrender.com/${blogid}`);
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setTags(blog.tags || []);
      } catch (err) {
        console.error("Failed to load blog", err);
        toast.error("Failed to load blog");
      }
    };
    fetchBlog();
  }, [blogid]);

  const editThis = async () => {
    try {
      if (!title || !content) {
        return toast.warn('All fields are required', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'light',
          transition: Bounce,
        });
      }

      toast.info("Updating your Blog", {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'light',
        transition: Bounce,
      });

      const token = JSON.parse(localStorage.getItem("token"));

      await axios.put(
        `https://newmedium2-backend.onrender.com/${blogid}`,
        { title, content, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Blog updated successfully', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'light',
        transition: Bounce,
      });

      toast.success('Redirecting to Profile', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'light',
        transition: Bounce,
      });

      setTimeout(() => {
        navigate('/medium2/profile');
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.errors?.[0] || err.message);
    }
  };

  return (
    <>
      <div className="mx-5 my-20 font-mono">
        <div className="pb-10">
          <TextareaAutosize
            minRows={1}
            className="text-5xl font-san text-gray-600 border-l-2 pl-5 focus:outline-none w-full placeholder:text-5xl placeholder:font-serif resize-none overflow-hidden"
            placeholder="Share your thought"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="pb-10">
          <TextareaAutosize
            minRows={5}
            className="text-2xl text-gray-600 border-l-2 pl-5 focus:outline-none w-full placeholder:text-3xl placeholder:font-serif resize-none overflow-hidden"
            placeholder="Make us understand"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center"
            >
              # {tag}
              <button
                className="ml-2 text-black"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && tagInput.trim()) {
                e.preventDefault();
                if (tags.length >= 5) {
                  alert('Maximum 5 tags allowed');
                  return;
                }
                setTags([...tags, tagInput.trim()]);
                setTagInput('');
              }
            }}
            placeholder="tags"
            className="text-2xl text-gray-600 border-l-2 pl-5 focus:outline-none w-full placeholder:text-3xl placeholder:font-serif resize-none overflow-hidden"
          />
        </div>

        <div className="md:flex gap-4 p-2 text-base sm:text-lg md:text-xl">
          <button
            onClick={editThis}
            className="text-white px-8 py-2 rounded-full bg-green-400 font-medium shadow-sm"
          >
            Edit
          </button>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default EditBlog;
