import React, { useState, useEffect } from "react";

export const WrinkledToIroned = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // ✅ Handle single image upload
  const handleSingleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFiles([file]);
  };

  // ✅ Handle folder upload
  const handleFolderUpload = (e) => {
    const folderFiles = Array.from(e.target.files);
    if (folderFiles.length > 0) setFiles(folderFiles);
  };

  // ✅ Generate image previews
  useEffect(() => {
    if (files.length === 0) {
      setPreviews([]);
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return (
    <div
      className="service-page container text-center"
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      <div
        className="card shadow-lg p-5 border-0 mx-auto"
        style={{
          maxWidth: "700px",
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <div className="card-body">
          <div className="mb-4">
            <i className="fa fa-tshirt fa-3x text-info"></i>
          </div>
          <h2 className="mb-3" style={{ fontWeight: "600" }}>
            Wrinkled to Ironed
          </h2>
          <p className="text-muted">
            Make clothes in your images look neat and wrinkle-free with just one click.
          </p>

          {/* ✅ Upload Buttons */}
          <div
            className="d-flex justify-content-center gap-3 mt-4"
            style={{ flexWrap: "wrap" }}
          >
            {/* Upload Single Image */}
            <label
              style={{
                background: "#17a2b8",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              <i className="fa fa-upload me-2"></i> Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleSingleUpload}
                style={{ display: "none" }}
              />
            </label>

            {/* Upload Folder */}
            <label
              style={{
                background: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              <i className="fa fa-folder-open me-2"></i> Upload Folder
              <input
                type="file"
                accept="image/*"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFolderUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {/* ✅ Preview Section */}
          {previews.length > 0 && (
            <div className="mt-4">
              <h5>Preview:</h5>
              <div
                className="d-flex flex-wrap justify-content-center gap-3"
                style={{ marginTop: "15px" }}
              >
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    style={{
                      maxWidth: "200px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
