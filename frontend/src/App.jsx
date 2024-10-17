import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleFetchFormats = async () => {
    if (!videoUrl) {
      alert("Please enter a video URL");
      return;
    }

    try {
      const response = await axios.get(
        `https://youtube-video-downloader-backend-steel.vercel.app/formats`,
        {
          params: { url: videoUrl },
        }
      );
      setFormats(response.data.formats); // Set available formats
    } catch (error) {
      console.error("Error fetching formats:", error);
      alert("Error fetching formats");
    }
  };

  const handleDownload = async () => {
    if (!videoUrl || !selectedFormat) {
      alert("Please select a video format and enter a video URL");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://youtube-video-downloader-backend-steel.vercel.app/download`,
        {
          params: { url: videoUrl, itag: selectedFormat }, // Pass itag here
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "video.mp4"); // You can customize this based on format
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Error downloading video");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-6 transition-all duration-300">
      <h1 className="text-3xl font-bold mb-6 text-white animate-bounce text-center">
        YouTube Video Downloader
      </h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
        className="border border-gray-300 rounded-lg p-3 mb-4 w-full max-w-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        onClick={handleFetchFormats}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Fetch Formats
      </button>

      {formats.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="font-semibold text-white">Select Video Format:</h3>
          <select
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 mt-2 w-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Format</option>
            {formats.map((format) => (
              <option key={format.itag} value={format.itag}>
                {format.quality} - {format.type}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={isLoading}
        className={`mt-4 bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Downloading..." : "Download Video"}
      </button>

      {isLoading && (
        <div className="mt-2 text-yellow-200 animate-pulse">
          Please wait while downloading...
        </div>
      )}
    </div>
  );
};

export default App;
