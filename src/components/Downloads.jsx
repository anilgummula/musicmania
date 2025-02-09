import React, { useState, useEffect } from "react";
import { FaDownload, FaPlayCircle } from "react-icons/fa";

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/songs/downloads`)
      .then((res) => res.json())
      .then((data) => setDownloads(data));
  }, []);

  return (
    <div className="min-h-screen px-6 mt-16">
      <h1 className="text-blue-600 text-4xl font-bold text-center pt-10">Your Downloads</h1>
      <p className="text-center text-gray-800 mb-8 font-semibold">Listen to your downloaded songs anytime.</p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {downloads.length > 0 ? (
          downloads.map((song) => (
            <div
              key={song._id}
              className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform"
            >
              <div className="bg-gray-700 w-28 h-28 flex items-center justify-center rounded-full mb-4">
                <FaPlayCircle size={36} className="text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-gray-400 text-sm">{song.artist}</p>
              <a
                href={`${import.meta.env.VITE_APP_API_BASE_URL}/${song.fileUrl}`}
                download
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm flex items-center"
              >
                <FaDownload className="mr-2" /> Download Again
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-800 col-span-3 text-xl font-semibold">No downloads found</p>
        )}
      </div>
    </div>
  );
}
