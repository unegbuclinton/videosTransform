import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { crop, fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

const VideoTransformation = ({
  xAxis,
  yAxis,
  width,
  height,
  public_id,
  smallOne,
}) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxvfvbwow",
    },
  });

  const myVideo = cld.video(public_id);
  const smallVideo = cld.video(public_id);
  // Apply the transformation.
  //   myVideo.resize(fill().width(375).height(350)).roundCorners(byRadius(30)); // Round the corners.
  smallVideo.resize(fill().width(150).height(150)).roundCorners(byRadius(30));

  myVideo.resize(fill().width(width).height(height).x(xAxis).y(yAxis));
  // myVideo.resize(crop().width(350).height(350).x(302).y(189));

  console.log(myVideo.toURL());
  return (
    <div style={{ position: "relative" }}>
      {smallOne && (
        <div
          style={{
            position: "absolute",
          }}
        >
          <AdvancedVideo cldVid={smallVideo} autoPlay />
        </div>
      )}
      <AdvancedVideo cldVid={myVideo} controls autoPlay />
    </div>
  );
};

export default VideoTransformation;
