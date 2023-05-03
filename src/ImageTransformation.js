import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { outline, cartoonify } from "@cloudinary/url-gen/actions/effect";
import { outer } from "@cloudinary/url-gen/qualifiers/outlineMode";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { byRadius, max } from "@cloudinary/url-gen/actions/roundCorners";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";

const ImageTransformation = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxvfvbwow",
    },
  });

  console.log(myVideo.toURL());

  //   image;
  const myImage = cld.image("cld-sample-5");
  myImage
    .effect(cartoonify())
    .roundCorners(max())
    .effect(outline().mode(outer()).width(100).color("lightblue"))
    .backgroundColor("lightblue")
    .resize(scale().height(300));

  // const myVideo = cld.video("sea-turtle");

  const myImage2 = cld.image("iajiwcsp5nndn3p9tbyh");
  myImage2
    .resize(fill(300, 250))
    .roundCorners(byRadius(20))
    .effect(sepia())
    .overlay(
      source(
        text("This is my picture", new TextStyle("arial", 18)).textColor(
          "white"
        )
      ).position(new Position().gravity(compass("north")).offsetY(20))
    )
    .rotate(byAngle(20))
    .format("png");

  console.log(myImage2.toURL());
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
      <AdvancedImage cldImg={myImage2} />
    </div>
  );
};

export default ImageTransformation;
