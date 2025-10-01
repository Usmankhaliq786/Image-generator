import React from "react";
import ImageUploader from "./ImageUploader";

export const ImageEnhancer = () => {
  return (
    <div className="service-page container text-center" style={{ marginTop: "100px" }}>
      <div className="card shadow-lg p-5 border-0">
        <div className="card-body">
          <div className="mb-4">
            <i className="fa fa-magic fa-3x text-success"></i>
          </div>
          <h2 className="mb-3">Image Enhancer</h2>
          <p className="text-muted">
            Automatically improve colors, sharpness, and details in your photos.
          </p>
          <ImageUploader buttonText="Upload Image" buttonColor="success" />
        </div>
      </div>
    </div>
  );
};
