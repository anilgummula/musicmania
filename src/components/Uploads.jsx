import React, { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Uploads() {
    const [songTitle, setSongTitle] = useState("");
    const [artist, setArtist] = useState("Unknown");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef(null); // Reference for file input
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();
    
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setPreview(URL.createObjectURL(uploadedFile));
        }
    };
    
    
    useEffect(()=>{
      const username = localStorage.getItem("loggedInUser");
    setArtist(username);
    console.log(username);
    
  },[])
  

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file){
        setLoading(false);
        return handleError("Please select a file");
    } 

    const formData = new FormData();
    formData.append("title", songTitle);
    formData.append("artist", artist);
    formData.append("file", file);

    const token =  localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/songs/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      handleSuccess("Song uploaded successfully!");
      setSongTitle("");
    //   setArtist("");
      setFile(null);
      setPreview("");
      setLoading(false);
      setTimeout(() => {
        navigate("/");
    }, 1000);

    } else {
      handleError("Upload failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 px-6 mt-10">
      <h1 className="text-4xl font-bold mb-6">Upload Your Song</h1>
      <form onSubmit={handleUpload} className=" p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <label className="block text-left text-gray-800 mb-2 font-semibold">Song Title:</label>
        <input
          type="text"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-300 text-gray-600 outline-none mb-4"
          placeholder="Enter song title"
          required
        />

        <label className="block text-left text-gray-800 mb-2 font-semibold">Artist Name:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-300 text-gray-600 outline-none mb-4"
          placeholder="Enter artist name"
          required
        />

        <label className="block text-left text-gray-800 mb-2 font-semibold">Upload File:</label>
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 p-6 rounded-md cursor-pointer hover:border-gray-400 transition"
          onClick={() => fileInputRef.current.click()} // Open file input when div is clicked
        >
          <input
             name="file"
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {preview ? (
            <audio controls src={preview} className="w-full mt-2"></audio>
          ) : (
            <>
              <FaCloudUploadAlt size={40} className="text-blue-300" />
              <p className="mt-2 text-sm text-gray-400">Click here to select a file</p>
            </>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-teal-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md w-full transition-transform hover:scale-105 "
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
