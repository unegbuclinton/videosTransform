import React, { useContext } from "react";
import "./App.css";
import VideoTransformation from "./VideoTransformation";
import Uploaded from "./Uploaded";
import MyVideoContext from "./contextApi/CloudinaryContext";
import Crop from "./Crop";
import CropTool from "./CropTool";
import VideoCropTool from "./VideoCrop";

function App() {
  const { videoUrl, cropValue } = useContext(MyVideoContext);
  const { x, y, height, width } = cropValue;
  console.log(cropValue);
  return (
    <div className="App">
      <Uploaded />
      <div style={{ display: "block" }}>
        <h1> Cropped Videos</h1>
        <div
          style={{
            width: "fit-content",
            border: "1px solid red",
            display: "flex",
          }}
        >
          {cropValue && (
            <VideoTransformation
              xAxis={x}
              yAxis={y}
              width={150}
              height={350}
              public_id={videoUrl}
              // smallOne
            />
          )}
          {/* <VideoTransformation
            xAxis={1200}
            yAxis={0}
            height={350}
            width={350}
            public_id={videoUrl}
          /> */}
        </div>
      </div>
      {/* <CropTool /> */}
      {/* <VideoCropTool /> */}
    </div>
  );
}

export default App;
