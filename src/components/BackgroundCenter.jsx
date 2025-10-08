import React from "react";
import ImageProcessor from "./ImageProcessor";

export const BackgroundCenter = () => {
  return (
    <ImageProcessor
      title="Background Remover & Centered Image"
      description="Remove backgrounds and center your subject automatically. Upload a single image or a folder to process multiple images."
      iconClass="fa-bullseye"
      themeColor="#ffc107"
    />
  );
};
