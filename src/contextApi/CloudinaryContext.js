import { createContext, useState } from "react";

const MyVideoContext = createContext();

export function CloudinaryContext({ children }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [cropValue, setCropValue] = useState({});

  const getVideoUrl = (url) => {
    setVideoUrl(url);
  };

  const getLocalUrl = (local) => {
    setLocalUrl(local);
  };
  const getCordinate = (value) => {
    setCropValue(value);
  };
  // console.log(cropValue);
  return (
    <MyVideoContext.Provider
      value={{
        getVideoUrl,
        videoUrl,
        getLocalUrl,
        localUrl,
        cropValue,
        getCordinate,
      }}
    >
      {children}
    </MyVideoContext.Provider>
  );
}

export default MyVideoContext;
