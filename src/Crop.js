import React, { useState } from "react";
import "./App.css";
import Cropper from "react-easy-crop";
import { useCallback } from "react";

const Crop = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  return (
    <div className="crop">
      <div className="crop-container">
        <Cropper
          video="https://vid.ly/5u4h3e?content=video"
          crop={crop}
          zoom={zoom}
          aspect={8 / 5}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          // cropSize={{ width: "424px", height: "570px" }}
          onWheelRequest={(e) => true}
          onImageLoaded={(res) => {
            console.log(res);
          }}
          style={{ border: "1px solid red" }}
        />
      </div>
      <div className="controls" />
    </div>
  );
};
export default Crop;
