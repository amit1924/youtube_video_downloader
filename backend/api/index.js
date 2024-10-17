// import express from "express";
// import ytdl from "@distube/ytdl-core";
// import cors from "cors";

// const app = express();
// const PORT = 3000;

// app.use(cors());

// // Endpoint to fetch available video and audio formats
// app.get("/formats", async (req, res) => {
//   const videoUrl = req.query.url;

//   if (!videoUrl) {
//     return res.status(400).send("Video URL is required");
//   }

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log(info.formats);

//     // Separate video and audio formats
//     const videoFormats = info.formats
//       .filter((format) => format.hasVideo && format.hasAudio)
//       .map((format) => ({
//         itag: format.itag,
//         quality: format.qualityLabel,
//         resolution: format.height,
//         type: format.mimeType,
//         isVideo: true,
//       }))
//       .sort((a, b) => b.itag - a.itag);

//     const audioFormats = info.formats
//       .filter((format) => format.hasAudio && !format.hasVideo)
//       .map((format) => ({
//         itag: format.itag,
//         quality: format.audioQuality,
//         type: format.mimeType,
//         isVideo: false,
//       }))
//       .sort((a, b) => b.itag - a.itag);

//     const formats = [...videoFormats, ...audioFormats];

//     console.log(formats);
//     res.json({ formats });
//   } catch (error) {
//     console.error("Error fetching formats:", error);
//     res.status(500).send("Error fetching video formats");
//   }
// });

// // Endpoint to download a YouTube video or audio
// // app.get("/download", async (req, res) => {
// //   const videoUrl = req.query.url;
// //   const resolution = req.query.resolution;

// //   if (!videoUrl || !resolution) {
// //     return res.status(400).send("Video URL and resolution are required");
// //   }

// //   try {
// //     const info = await ytdl.getInfo(videoUrl);
// //     const videoTitle = info.videoDetails.title
// //       .replace(/[^a-z0-9]/gi, "_")
// //       .toLowerCase();

// //     // Filter formats by resolution
// //     const format = info.formats
// //       .filter(
// //         (f) => f.hasVideo && f.hasAudio && f.height === parseInt(resolution)
// //       )
// //       .sort((a, b) => b.itag - a.itag)[0];

// //     if (!format) {
// //       return res
// //         .status(404)
// //         .send(`No format found for resolution ${resolution}`);
// //     }

// //     // Determine file extension based on format type
// //     const fileExtension = format.mimeType.includes("audio") ? "mp3" : "mp4";

// //     // Set the response headers for file download
// //     res.set({
// //       "Content-Disposition": `attachment; filename="${videoTitle}.${fileExtension}"`,
// //       "Content-Type": format.mimeType,
// //     });

// //     ytdl(videoUrl, { filter: (f) => f.itag === format.itag }).pipe(res);
// //   } catch (error) {
// //     console.error("Error downloading video:", error);
// //     res.status(500).send("Error downloading video");
// //   }
// // });

// app.get("/download", async (req, res) => {
//   const videoUrl = req.query.url;

//   if (!videoUrl) {
//     return res.status(400).send("Video URL is required");
//   }

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     const videoTitle = info.videoDetails.title
//       .replace(/[^a-z0-9]/gi, "_")
//       .toLowerCase();

//     // Get the highest quality format
//     const format = info.formats
//       .filter((f) => f.hasVideo && f.hasAudio)
//       .sort((a, b) => b.height - a.height || b.itag - a.itag)[0];

//     // Determine file extension based on format type
//     const fileExtension = format.mimeType.includes("audio") ? "mp3" : "mp4";

//     // Set the response headers for file download
//     res.set({
//       "Content-Disposition": `attachment; filename="${videoTitle}.${fileExtension}"`,
//       "Content-Type": format.mimeType,
//     });

//     ytdl(videoUrl, { filter: (f) => f.itag === format.itag }).pipe(res);
//   } catch (error) {
//     console.error("Error downloading video:", error);
//     res.status(500).send("Error downloading video");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// import express from "express";
// import ytdl from "@distube/ytdl-core";
// import cors from "cors";

// const app = express();
// const PORT = 3000;

// app.use(
//   cors({
//     origin: "https://youtube-video-downloader-frontend-rust.vercel.app",
//     methods: ["GET"],
//     credentials: true,
//   })
// );

// app.get("/", (req, res) => {
//   res.send("Server is working");
// });

// // Endpoint to fetch available video and audio formats
// app.get("/formats", async (req, res) => {
//   const videoUrl = req.query.url;

//   if (!videoUrl) {
//     return res.status(400).send("Video URL is required");
//   }

//   try {
//     const info = await ytdl.getInfo(videoUrl);

//     // Separate video and audio formats
//     const videoFormats = info.formats
//       .filter((format) => format.hasVideo && format.hasAudio)
//       .map((format) => ({
//         itag: format.itag,
//         quality: format.qualityLabel,
//         resolution: format.height,
//         type: format.mimeType,
//         isVideo: true,
//       }))
//       .sort((a, b) => b.itag - a.itag);

//     const audioFormats = info.formats
//       .filter((format) => format.hasAudio && !format.hasVideo)
//       .map((format) => ({
//         itag: format.itag,
//         quality: format.audioQuality,
//         type: format.mimeType,
//         isVideo: false,
//       }))
//       .sort((a, b) => b.itag - a.itag);

//     const formats = [...videoFormats, ...audioFormats];

//     res.json({ formats });
//   } catch (error) {
//     console.error("Error fetching formats:", error);
//     res.status(500).send("Error fetching video formats");
//   }
// });

// // Endpoint to download a YouTube video or audio
// app.get("/download", async (req, res) => {
//   const videoUrl = req.query.url;
//   const itag = req.query.itag;

//   if (!videoUrl || !itag) {
//     return res.status(400).send("Video URL and itag are required");
//   }

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     const videoTitle = info.videoDetails.title
//       .replace(/[^a-z0-9]/gi, "_")
//       .toLowerCase();

//     // Get the requested format based on the itag
//     const format = info.formats.find((f) => f.itag === parseInt(itag));

//     if (!format) {
//       return res.status(404).send("Format not found");
//     }

//     // Determine file extension based on format type
//     const fileExtension = format.mimeType.includes("audio") ? "mp3" : "mp4";

//     // Set the response headers for file download
//     res.set({
//       "Content-Disposition": `attachment; filename="${videoTitle}.${fileExtension}"`,
//       "Content-Type": format.mimeType,
//     });

//     // Download the video/audio
//     ytdl(videoUrl, { filter: (f) => f.itag === format.itag }).pipe(res);
//   } catch (error) {
//     console.error("Error downloading video:", error);
//     res.status(500).send("Error downloading video");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import ytdl from "@distube/ytdl-core";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "https://youtube-video-downloader-frontend-rust.vercel.app",
    methods: ["GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is working");
});

// Endpoint to fetch available video and audio formats
app.get("/formats", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send("Video URL is required");
  }

  // Validate YouTube URL
  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  try {
    const info = await ytdl.getInfo(videoUrl);

    const videoFormats = info.formats
      .filter((format) => format.hasVideo && format.hasAudio)
      .map((format) => ({
        itag: format.itag,
        quality: format.qualityLabel,
        resolution: format.height,
        type: format.mimeType,
        isVideo: true,
      }))
      .sort((a, b) => b.itag - a.itag);

    const audioFormats = info.formats
      .filter((format) => format.hasAudio && !format.hasVideo)
      .map((format) => ({
        itag: format.itag,
        quality: format.audioQuality,
        type: format.mimeType,
        isVideo: false,
      }))
      .sort((a, b) => b.itag - a.itag);

    const formats = [...videoFormats, ...audioFormats];

    res.json({ formats });
  } catch (error) {
    console.error("Error fetching formats:", error.message);
    res.status(500).send("Error fetching video formats");
  }
});

// Endpoint to download a YouTube video or audio
app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;
  const itag = req.query.itag;

  if (!videoUrl || !itag) {
    return res.status(400).send("Video URL and itag are required");
  }

  // Validate YouTube URL
  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const videoTitle = info.videoDetails.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();

    // Get the requested format based on the itag
    const format = info.formats.find((f) => f.itag === parseInt(itag));

    if (!format) {
      return res.status(404).send("Format not found");
    }

    // Determine file extension based on format type
    const fileExtension = format.mimeType.includes("audio") ? "mp3" : "mp4";

    // Set the response headers for file download
    res.set({
      "Content-Disposition": `attachment; filename="${videoTitle}.${fileExtension}"`,
      "Content-Type": format.mimeType,
    });

    // Stream the video/audio to the response
    ytdl(videoUrl, { filter: (f) => f.itag === format.itag }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error.message);
    res.status(500).send("Error downloading video");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
