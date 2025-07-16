 import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const signupthis = async () => {
    if (!email || !password || !username) {
      return toast.warn('All fields are required', {
      position: 'bottom-right',
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    }

    toast.info('Checking details', {
      position: 'bottom-right',
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

    try {
    const response = await axios.post('https://newmedium2-backend.onrender.com/signup', {
  email,
  username,
  password,
}, {
  withCredentials: true   
});

      toast.success(response.data.message, {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      setEmail("")
      setPassword("")
      setUsername("")
      
        toast.success("Navigating to Signin page", {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
     
      
      setTimeout(()=>{
        navigate('/signin')
      }, 3000)

    } catch (err) {
      console.log(err.response?.data);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        'Signup failed';

      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      });
      toast.error("Use Chrome Browser");
      
    }
  };

  return (
    <>
      <div className="h-screen md:mx-20 mx-10">
        <div className="md:mx-60 md:py-20">
          <div>
            <div className="text-5xl font-mono text-gray-800 break-words text-left py-10">
              create new account
            </div>

            <div className="py-5">
              <div className="border border-black rounded-3xl w-full md:w-[400px] h-12 flex items-center">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-5 py-2 bg-transparent focus:outline-none"
                />
              </div>
            </div>

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
                className="text-xl md:text-2xl font-mono text-gray-800 break-words text-left hover:underline"
                onClick={signupthis}
              >
                sign up
              </button>
            </div>

            <div>
              <div className="text-xl md:text-2xl font-mono text-gray-800 break-words text-left hover:underline">
                <Link to="/signin">Already have an account</Link>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose="3000"
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition= {Bounce}
        />
      </div>
    </>
  );
}

export default Signup;
