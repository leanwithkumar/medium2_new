import React from 'react'

function Help() {
  return (
    <div className='md:h-screen mx-4 md:mx-20'>
      <div className='md:mx-60 md:py-20'>
        <div>
          <div className="text-xl md:text-5xl font-mono text-gray-800 break-words text-left py-10">
            Help & Support
          </div>

          <div className="text-lg md:text-2xl font-mono text-gray-800 break-words text-left space-y-4">
            
            welcome to medium2 &#8211; a simple blog platform made to help you share your thoughts, code, ideas, or just stories.
            <br/><br/>

            
            whether you're here to write, read, or just explore — this guide is here to help you understand how everything works.
            <br/><br/>

            how to get started?
           
            create an account or sign in
            go to the write section and start your blog
            you can edit or delete your blog anytime from your profile
            explore trending blogs from other users too
            <br/><br/>
            

            
            <p className="pt-4">
              this is a college project built with passion, inspired by medium itself. big shoutout to my friend apurb mishra for helping me with direction and support throughout.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
