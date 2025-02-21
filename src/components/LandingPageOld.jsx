import React from "react";

const LandingPageOld = () => (
    <div className="bg-gradient-to-b from-purple-600 to-indigo-900 min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to MusicMaina</h1>
      <p className="text-lg md:text-2xl mb-8">
        Your personalized music experience. Play, download, and curate playlists.
      </p>
      <button
        className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-200 transition-all"
        onClick={() => (window.location.href = '/home')}
      >
        Explore Now
      </button>
    </div>
  );

export default LandingPage;
  