import React, { useContext } from "react";
import "./App.css";
import VideoTransformation from "./VideoTransformation";
import Uploaded from "./Uploaded";
import MyVideoContext from "./contextApi/CloudinaryContext";

function App() {
  const { videoUrl } = useContext(MyVideoContext);

  return (
    <div className="App">
      <Uploaded />
      <div style={{ display: "block" }}>
        <h1> Cropped Videos</h1>
        <div style={{ width: "fit-content", border: "1px solid red" }}>
          <VideoTransformation
            xAxis={0}
            yAxis={-50}
            public_id={videoUrl}
            smallOne
          />
          <VideoTransformation xAxis={0} yAxis={100} public_id={videoUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;
