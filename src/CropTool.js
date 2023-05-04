import { useState, useRef } from "react";
import image from "../src/assets/img-1.png";
import { useContext } from "react";
import MyVideoContext from "./contextApi/CloudinaryContext";

function CropTool() {
  const { getCordinate } = useContext(MyVideoContext);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const cropRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(100);
  const [startY, setStartY] = useState(0);

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
    // console.log(crop);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
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
          border: "2px solid red",
          cursor: "move",
        }}
        onMouseDown={handleMouseDown}
      ></div>
      <img
        src={image}
        alt="Crop "
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* <video style={{ width: "100%", height: "100%" }} src={vid} /> */}
    </div>
  );
}
export default CropTool;
