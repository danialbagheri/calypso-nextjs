import React from "react";
import CustomCss from "../Review.module.css";

export default function ImagePreview(props) {
  const { files, removeAllImage } = props;
  const filesRendered = files.map((file, index) => {
    return <img src={file} key={index} alt="user-post" />;
  });
  return (
    <div className={CustomCss.NewPostPreviewImages}>
      {filesRendered}
      <span onClick={() => removeAllImage()}>X</span>
    </div>
  );
}
