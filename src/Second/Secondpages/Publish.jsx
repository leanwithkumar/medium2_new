import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import userAtom from '../../Store/userAtom';

function Publish() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const userID = user.userId;

  const publishthis = async () => {
    try {
      if (!title || !content) {
        return toast.warn('All fields are required');
      }

      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        return toast.error("You are not logged in. Please sign in.");
      }

      toast.info("Publishing your blog...");

      const posted = await axios.post(
        'https://newmedium2-backend.onrender.com/publish',
        { title, content, tags, userID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog added successfully");
      toast.success("Redirecting to home page");
      console.log(posted);

      setTimeout(() => {
        navigate('/medium2');
      }, 3000);

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.errors?.[0] || err.message);
    }
  };

  return (
    <>
      <div className="w-full border-b border-gray-300">
        <div className="flex justify-evenly items-center md:px-25 px-5">
          <div className="flex justify-between">
            <Link to="/medium2">
              <img
                src="/Medium2.png"
                width="170"
                height="40"
                className="max-w-full h-auto py-5"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="md:flex flex-wrap justify-center gap-4 p-2 text-base sm:text-lg md:text-xl">
            <button
              onClick={publishthis}
              className="text-white px-8 py-2 rounded-full bg-green-400 font-medium shadow-sm"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="mx-5 md:ml-30 md:mr-80 my-20">
        <div className="pb-10">
          <TextareaAutosize
            minRows={1}
            className="text-5xl text-gray-600 border-l-2 pl-5 focus:outline-none w-full placeholder:text-5xl placeholder:font-serif resize-none overflow-hidden font-mono"
            placeholder="Share your thought"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="pb-10 font-mono">
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
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center font-mono"
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

        <div className="mb-6 font-mono">
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
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
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

export default Publish;
