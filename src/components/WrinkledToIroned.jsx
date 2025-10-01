import React from "react";
import ImageUploader from "./ImageUploader";

export const WrinkledToIroned = () => {
  return (
    <div className="service-page container text-center" style={{ marginTop: "100px" }}>
      <div className="card shadow-lg p-5 border-0">
        <div className="card-body">
          <div className="mb-4">
            <i className="fa fa-tshirt fa-3x text-info"></i>
          </div>
          <h2 className="mb-3">Wrinkled to Ironed</h2>
          <p className="text-muted">
            Make clothes in your images look neat and wrinkle-free with just one click.
          </p>
          <ImageUploader buttonText="Upload Image" buttonColor="info" />
        </div>
      </div>
    </div>
  );
};
