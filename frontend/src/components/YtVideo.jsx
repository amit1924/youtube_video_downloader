import React, { useState } from "react";
import axios from "axios";

const YtVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [loadingFormats, setLoadingFormats] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFormats = async () => {
    if (!videoUrl) {
      setError("Video URL is required");
      return;
    }

    setLoadingFormats(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3000/formats", {
        params: { url: videoUrl },
      });
      setFormats(response.data.formats);
    } catch (err) {
      setError("Error fetching formats. Please try again.");
      console.error(err);
    } finally {
      setLoadingFormats(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedFormat) {
      setError("Please select a format to download.");
      return;
    }

    setDownloading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3000/download", {
        params: { url: videoUrl },
        responseType: "blob",
      });

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${videoUrl.split("v=")[1].substring(0, 10)}.${
        selectedFormat.includes("audio") ? "mp3" : "mp4"
      }`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Error downloading video. Please try again.");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto animate-fadeIn">
      <h1 className="text-2xl font-bold mb-4">YouTube Downloader</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
        className="p-2 border border-gray-300 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <button
        onClick={fetchFormats}
        disabled={loadingFormats}
        className={`bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ${
          loadingFormats ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {loadingFormats ? "Loading formats..." : "Get Formats"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {formats.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Select Format</h2>
          <select
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">Select a format</option>
            {formats.map((format) => (
              <option key={format.itag} value={format.mimeType}>
                {format.isVideo
                  ? `${format.quality} (Video)`
                  : `${format.quality} (Audio)`}
              </option>
            ))}
          </select>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`bg-green-500 text-white py-2 px-4 rounded transition duration-300 ${
              downloading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-600"
            }`}
          >
            {downloading ? "Downloading..." : "Download"}
          </button>
        </div>
      )}
    </div>
  );
};

export default YtVideo;
