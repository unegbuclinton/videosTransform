import { createContext, useState } from "react";

const MyVideoContext = createContext();

export function CloudinaryContext({ children }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);

  const getVideoUrl = (url) => {
    setVideoUrl(url);
  };

  const getLocalUrl = (local) => {
    setLocalUrl(local);
  };

  return (
    <MyVideoContext.Provider
      value={{
        getVideoUrl,
        videoUrl,
        getLocalUrl,
        localUrl,
      }}
    >
      {children}
    </MyVideoContext.Provider>
  );
}

export default MyVideoContext;
