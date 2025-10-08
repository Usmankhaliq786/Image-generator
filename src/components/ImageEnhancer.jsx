import React from "react";
import ImageProcessor from "./ImageProcessor";

export const ImageEnhancer = () => {
  return (
    <ImageProcessor
      title="Image Enhancer"
      description="Automatically improve colors, sharpness, and clarity. Upload a single image or a folder of images to enhance them all."
      iconClass="fa-magic"
      themeColor="#28a745"
    />
  );
};
