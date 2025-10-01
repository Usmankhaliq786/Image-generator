import React from "react";
import ImageUploader from "./ImageUploader";

export const BackgroundRemover = () => {
  return (
    <div className="service-page container text-center" style={{ marginTop: "100px" }}>
      <div className="card shadow-lg p-5 border-0">
        <div className="card-body">
          <div className="mb-4">
            <i className="fa fa-scissors fa-3x text-primary"></i>
          </div>
          <h2 className="mb-3">Background Remover</h2>
          <p className="text-muted">
            Instantly remove backgrounds from your images with AI-powered precision.
          </p>
          <ImageUploader buttonText="Upload Image" buttonColor="primary" />
        </div>
      </div>
    </div>
  );
};
