import React, { useState, useRef, useEffect } from "react";
import Hls from "hls.js";
import axios from "axios";

function App() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideoUrl(res.data.videoUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current.play();
        });
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
      }
    }
  }, [videoUrl]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📤 Upload Video & Play HLS</h2>

      <input type="file" accept="video/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading... Please wait</p>}

      {videoUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>🎬 Video Preview</h4>
          <video ref={videoRef} controls width="640" height="360" />
        </div>
      )}
    </div>
  );
}

export default App;
