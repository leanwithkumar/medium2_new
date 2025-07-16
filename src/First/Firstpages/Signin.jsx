// components/Signin.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signinuser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warn('All fields are required', { position: 'bottom-right', autoClose: 3000, transition: Bounce });
    }

    toast.info('Checking details', { position: 'bottom-right', autoClose: 4000, transition: Bounce });

    try {
      const response = await axios.post("https://newmedium2-backend.onrender.com/signin", {
        email,
        password,
      });

      toast.success(response.data.message, { position: 'bottom-right', transition: Bounce });

      const userData = {
        userName: response.data.username,
        userEmail: response.data.email,
        userId: response.data.userId,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);  // ✅ Save token to localStorage

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate('/medium2');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Signin failed';
      toast.error(errorMessage, { position: 'bottom-right', transition: Bounce });
    }
  };

  return (
    <>
      <div className="h-screen md:mx-20 mx-10">
        <div className="md:mx-60 md:py-20">
          <div>
            <div className="text-5xl font-mono text-gray-800 py-10">sign in</div>

            <div>
              <div className="py-5">
                <div className="border border-black rounded-3xl w-full md:w-[400px] h-12 flex items-center">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-2 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="py-5">
                <div className="border border-black rounded-3xl w-full md:w-[400px] h-12 flex items-center">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-5 py-2 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <button
                  className="text-xl md:text-2xl font-mono text-gray-800 hover:underline"
                  onClick={signinuser}>
                  sign in
                </button>
              </div>

              <div>
                <Link to="/signup" className="text-xl md:text-2xl font-mono text-gray-800 hover:underline">
                  Are you new to medium2
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </>
  );
}

export default Signin;
