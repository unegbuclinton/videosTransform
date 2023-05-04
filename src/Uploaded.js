import React, { useContext } from "react";
import MyVideoContext from "./contextApi/CloudinaryContext";
import { PulseLoader } from "react-spinners";
import VideoCropTool from "./VideoCrop";

const Uploaded = () => {
  const { getVideoUrl, videoUrl, getLocalUrl, localUrl } =
    useContext(MyVideoContext);
  //   const [videoUrl, setVideoUrl] = useState(null);

  const handleUploadClick = async () => {
    const cloudName = "dxvfvbwow";
    const unsignedUploadPreset = "bearbear";

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      getVideoUrl(data.public_id);
      getLocalUrl(data.secure_url);
    } else {
      console.error("Upload failed.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
      <input type="file" />
      <button
        style={{
          cursor: "pointer",
          marginTop: "20px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={handleUploadClick}
      >
        {videoUrl ? <PulseLoader size={5} /> : "Upload Video"}
      </button>
      <div>
        <h1>Actual Video</h1>
        {videoUrl && (
          // <video src={localUrl} alt="Uploaded" controls width={350} autoPlay />
          <VideoCropTool src={localUrl} />
        )}
      </div>
    </div>
  );
};

export default Uploaded;
