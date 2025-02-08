import React from "react";
import { FaPlay, FaSearch, FaUpload, FaDownload } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 mt-20">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-white shadow-md">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Welcome to <span className="font-bold text-5xl">
          Music<span className="text-blue-400">Mania</span></span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover, Play, Upload, and Download your favorite music effortlessly.
        </p>
        <NavLink to="/Signup" >
            <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold">
            <FaPlay className="inline-block mr-2" /> Start Listening
            </button>
        </NavLink>
      </section>
      
      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 text-center px-10 py-16">
        <FeatureCard icon={<FaSearch size={30} />} title="Search Songs" description="Find your favorite music instantly." />
        <FeatureCard icon={<FaUpload size={30} />} title="Upload Music" description="Share your own music with the world." />
        <FeatureCard icon={<FaDownload size={30} />} title="Download Songs" description="Save songs for offline listening." />
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);
