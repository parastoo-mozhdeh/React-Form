import React, { useRef } from "react";
import "./App.css";

const App = () => {
  const fileRef = useRef();

  const handleVideoUpload = (event) => {
    event.preventDefault();

    const file = fileRef.current.files[0];
    if (!file) {
      alert("No video file selected");
      return;
    }

    const humanFileSize = (size) => {
      let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
      return (
        +(size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    };

    localStorage.setItem("fileName", file.name);
    localStorage.setItem("fileSize", file.size);

    console.log("File Name:", file.name);
    console.log("File Size:", file.size);
    console.log("Human File Size:", humanFileSize(file.size));

    const videoUrl = URL.createObjectURL(file);

    const videoElement = document.getElementById("video");
    videoElement.src = videoUrl;
  };

  return (
    <form className="form" onSubmit={handleVideoUpload}>
      <label className="file" htmlFor="input">
        Upload a video file
      </label>

      <input
        className="input-video"
        type="file"
        accept="video/*"
        ref={fileRef}
      />
      <video id="video" width="420" height="220"></video>

      <button className="button-wrapper" type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};

export default App;
