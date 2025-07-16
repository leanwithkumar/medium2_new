import React from 'react';

function Contact() {
  return (
    <div className='h-screen mx-4 md:mx-20'>
      <div className='md:mx-60 md:py-20'>
        <div>
          <div className="text-xl md:text-5xl font-mono text-gray-800 py-10">
            Contact
          </div>

          <div className="text-xl md:text-2xl font-mono text-gray-800 space-y-4">
            <div className='flex'>
              <div className="w-32">LinkedIn </div>
              <a
                href='https://www.linkedin.com/in/abhay-kumar-443b981b6/'
                target='_blank'
                rel='noopener noreferrer'
                className="hover:underline"
              >
                Abhay Kumar
              </a>
            </div>

            <div className='flex'>
              <div className="w-32">Twitter </div>
              <a
                href='https://x.com/leanwithkumar'
                target='_blank'
                rel='noopener noreferrer'
                className="hover:underline"
              >
                @leanwithkumar
              </a>
            </div>

            <div className='flex'>
              <div className="w-32">Github </div>
              <a
                href='https://github.com/leanwithkumar'
                target='_blank'
                rel='noopener noreferrer'
                className="hover:underline"
              >
                @leanwithkumar
              </a>
            </div>

            <div className='flex'>
              <div className="w-32">Instagram </div>
              <a
                href='https://www.instagram.com/leanwithkumar/'
                target='_blank'
                rel='noopener noreferrer'
                className="hover:underline"
              >
                @leanwithkumar
              </a>
            </div>

            <div className='flex'>
              <div className="w-32">Email </div>
              <span>mrhustle936@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
