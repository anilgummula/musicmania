import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaDownload, FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/songs`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setFilteredSongs(data);
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        setCurrentTime(formatTime(audioRef.current.currentTime));
      });

      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(formatTime(audioRef.current.duration));
      });
    }
  }, [playingIndex]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlay = (index) => {
    if (playingIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setPlayingIndex(index);
      setIsPlaying(true);
      audioRef.current.src = filteredSongs[index].fileUrl;
      audioRef.current.play();
    }
  };

  const handleNext = () => {
    const nextIndex = (playingIndex + 1) % filteredSongs.length;
    handlePlay(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = playingIndex - 1 < 0 ? filteredSongs.length - 1 : playingIndex - 1;
    handlePlay(prevIndex);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="text-center py-10 px-4 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-gray-800">
          Music<span className="text-purple-500">Mania</span>
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 mb-6">
          Discover, Play, Upload, and Download your favorite music effortlessly.
        </p>
        <div className="flex w-full max-w-lg bg-gray-100 rounded-full p-2 shadow-md">
          <input
            type="text"
            placeholder="Search for songs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-700 px-4 outline-none"
          />
          <button className="bg-purple-500 hover:bg-purple-600 p-3 rounded-full text-white">
            <FaSearch size={20} />
          </button>
        </div>
      </section>

      <section className="px-6 py-6 max-w-6xl mx-auto">
        <h2 className="flex text-2xl sm:text-3xl font-bold mb-4 text-gray-500 p-5">Trending Songs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div
                key={song._id}
                className="bg-gradient-to-br from-blue-400 to-purple-400 text-white p-5 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handlePlay(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full">
                    {playingIndex === index && isPlaying ? (
                      <FaPause size={28} />
                    ) : (
                      <FaPlay size={28} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{song.title}</h3>
                    <p className="text-gray-800 text-sm font-semibold">{song.artist}</p>
                    <p className="text-gray-600 text-sm font-semibold">{duration}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={song.fileUrl}
                    download
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
                  >
                    <FaDownload className="mr-2" /> Download
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No songs found</p>
          )}
        </div>
      </section>

      {playingIndex !== null && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-5 flex flex-col items-center shadow-2xl">
          <h3 className="text-lg font-semibold">
            {filteredSongs[playingIndex]?.title} - {filteredSongs[playingIndex]?.artist}
          </h3>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full my-2 accent-purple-500"
          />
          <div className="flex justify-between items-center w-full px-4">
            <span className="text-gray-300 text-sm">{currentTime}</span>
            <div className="flex gap-5">
              <button onClick={handlePrev} className="bg-gray-700 p-3 rounded-full">
                <FaBackward size={20} />
              </button>
              <button onClick={() => handlePlay(playingIndex)} className="bg-purple-500 hover:bg-purple-600 p-3 rounded-full">
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
              <button onClick={handleNext} className="bg-gray-700 p-3 rounded-full">
                <FaForward size={20} />
              </button>
            </div>
            <span className="text-gray-300 text-sm">{duration}</span>
          </div>
        </div>
      )}

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
