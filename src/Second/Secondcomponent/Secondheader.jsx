import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../Store/userAtom';

function Secondheader() {
  const [isOpen, setIsOpen] = useState(false);         
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [searchitem, setSearchitem] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);
     const setUser = useSetRecoilState(userAtom);

  const logoutuser = async () => {
    try {
      await axios.get('http://localhost:5000/logout', {
        withCredentials: true
      });
      localStorage.removeItem("medium2token");
   
setUser({
  userName: "",
  userEmail: "",
  userId: ""
});
localStorage.removeItem("user"); 
setUser({ userName: "", userEmail: "", userId: "" });
      navigate('/signin');
    } catch (err) {
      console.log("unable to logout", err.message);
    }
  };


  const handleSearch = (e) => {
  if (e.key === 'Enter' && searchitem.trim()) {
    navigate(`search?query=${encodeURIComponent(searchitem.trim())}`);
    setSearchitem('');
  }
};

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full border-b border-gray-300">
      <div className="flex justify-between items-center md:px-25 px-5">
        <div className='flex justify-between'>
          <Link to='/medium2'>
            <div>
              <img
                src="/Medium2.png"
                width="170"
                height="40"
                className="max-w-full h-auto py-5"
                alt="Logo"
              />
            </div>
          </Link>

          <div>
            <div className="pt-4 px-10  pb-5">
              <div className="border border-black rounded-3xl w-full md:w-[250px] h-10 flex items-center">
                <input
  type="text"
  value={searchitem}
  onChange={(e) => setSearchitem(e.target.value)}
  onKeyDown={handleSearch}
  placeholder="Search"
  className="w-full px-5 py-2 bg-transparent focus:outline-none"
/>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-4 p-2 text-base sm:text-lg md:text-xl">
          <Link to='/publish'>
            <div className="flex px-2 cursor-pointer">
              <div className="px-10 py-2 rounded-full border border-black hover:bg-black hover:text-white">Publish</div>
            </div>
          </Link>

          
          <div className="relative px-2 cursor-pointer" ref={profileRef}>
            <div
              className="px-10 py-2 rounded-full border border-black hover:bg-black hover:text-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Profile
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
                <ul className="flex flex-col text-left text-sm">
                  <Link to="profile" onClick={() => setDropdownOpen(false)}>
                    <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">Profile</li>
                  </Link>
                  <Link to="/publish" onClick={() => setDropdownOpen(false)}>
                    <li className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">Puslish</li>
                  </Link>
                  <li
                    className="px-4 py-2 border-b hover:bg-red-100 text-red-600 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      logoutuser();
                    }}
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden pb-2 pr-10">
          <button
            className="text-3xl font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776;
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 px-10 pb-4 text-base sm:text-lg">
          <Link to='profile' onClick={() => setIsOpen(false)}>
            <div className="px-2 hover:underline cursor-pointer">Profile</div>
          </Link>
          <Link to='/publish' onClick={() => setIsOpen(false)}>
            <div className="px-2 hover:underline cursor-pointer">Publish</div>
          </Link>
          
          <div onClick={() => {
                      setDropdownOpen(false);
                      logoutuser();
          }} className="px-2 hover:bg-red-100 text-red-600 cursor-pointer">Log Out</div>
          

          
        </div>
      )}
    </div>








  );
}

export default Secondheader;
