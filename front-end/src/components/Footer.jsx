import React from 'react'

const Footer = () => {
  return (
    <div className="text-white w-full mt-40 p-10 bg-gradient-to-b from-slate-400 to-transparent">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-full md:w-1/3 text-center mb-8 md:mb-0">
          <h2 className="text-lg font-bold mb-4">Questions?</h2>
          <p>FAQ</p>
          <p>Investor Relations</p>
          <p>Speed Test</p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-8 md:mb-0">
          <h2 className="text-lg font-bold mb-4">Privacy</h2>
          <p>Media Center</p>
          <p>Terms of Use</p>
          <p>Legal Notices</p>
        </div>
        <div className="w-full md:w-1/3 text-center">
          <h2 className="text-lg font-bold mb-4">Help Center</h2>
          <p>Account</p>
          <p>Ways to Watch</p>
          <p>Corporate Information</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
}

export default Footer
