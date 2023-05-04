import React, { useRef, useState } from "react";
import vid from "../src/assets/videos/video1.mp4";
import { useContext } from "react";
import MyVideoContext from "./contextApi/CloudinaryContext";

function VideoCropTool({ src }) {
  const { getCordinate } = useContext(MyVideoContext);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 350,
    height: 350,
  });
  const cropRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(100);
  const [startY, setStartY] = useState(0);
  const videoRef = useRef(null);

  function handleMouseDown(e) {
    setDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  }

  function handleMouseMove(e) {
    if (!dragging) {
      return;
    }

    const cropRect = cropRef.current.getBoundingClientRect();
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Calculate the new position of the crop area
    const newCropX = crop.x + deltaX;
    const newCropY = crop.y + deltaY;

    // Calculate the boundaries of the parent element
    const parentRect = cropRef.current.parentElement.getBoundingClientRect();
    const parentWidth = parentRect.width;
    const parentHeight = parentRect.height;

    // Restrict the movement of the crop area within the boundaries of the parent element
    const maxCropX = parentWidth - crop.width;
    const maxCropY = parentHeight - crop.height;
    const clampedCropX = Math.max(0, Math.min(newCropX, maxCropX));
    const clampedCropY = Math.max(0, Math.min(newCropY, maxCropY));

    setCrop((prevCrop) => ({
      ...prevCrop,
      x: clampedCropX,
      y: clampedCropY,
    }));

    setStartX(e.clientX);
    setStartY(e.clientY);
  }

  function handleMouseUp() {
    setDragging(false);
    getCordinate({ ...crop });
    console.log(crop);
  }

  function handleTimeUpdate() {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const cropAreaWidthInPercent =
      (crop.width / cropRef.current.parentElement.offsetWidth) * 100;
    const cropAreaHeightInPercent =
      (crop.height / cropRef.current.parentElement.offsetHeight) * 100;
    const cropAreaXInPercent =
      (crop.x / cropRef.current.parentElement.offsetWidth) * 100;
    const cropAreaYInPercent =
      (crop.y / cropRef.current.parentElement.offsetHeight) * 100;

    videoRef.current.style.objectPosition = `${cropAreaXInPercent}% ${cropAreaYInPercent}%`;
    videoRef.current.style.objectFit = "none";
    videoRef.current.style.width = `${cropAreaWidthInPercent}%`;
    videoRef.current.style.height = `${cropAreaHeightInPercent}%`;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "900px",
        height: "600px",
        border: "1px solid black",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={cropRef}
        style={{
          position: "absolute",
          left: crop.x + "px",
          top: crop.y + "px",
          width: crop.width + "px",
          height: crop.height + "px",
          border: "1px solid red",
          cursor: "move",
          zIndex: "10",
        }}
        onMouseDown={handleMouseDown}
      />
      <video
        ref={videoRef}
        src={src}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
        }}
        // onTimeUpdate={handleTimeUpdate}
        controls
      />
    </div>
  );
}

export default VideoCropTool;
