import React from "react";
import ImageProcessor from "./ImageProcessor";

export const BackgroundRemover = () => {
  return (
    <ImageProcessor
      title="Background Remover"
      description="Instantly remove backgrounds from your images. Upload a single image or a folder of images to process them all."
      iconClass="fa-scissors"
      themeColor="#007bff"
    />
  );
};
