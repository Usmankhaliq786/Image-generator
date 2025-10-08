import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const ImageProcessor = ({ title, description, iconClass, themeColor }) => {
  const [imageFile, setImageFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImages, setProcessedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Preview single uploaded image
  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  // Handle folder selection
  const handleFolderUpload = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFolderFiles(files);
  };

  // Process single image
  const handleProcessSingle = () => {
    if (!imageFile) return alert("Please upload an image first!");
    setLoading(true);
    setTimeout(() => {
      // Simulation: processed image is same as original
      setProcessedImages([URL.createObjectURL(imageFile)]);
      setLoading(false);
    }, 1500);
  };

  // Process folder images
  const handleProcessFolder = () => {
    if (folderFiles.length === 0) return alert("Please select a folder!");
    setLoading(true);
    setTimeout(() => {
      const processed = folderFiles.map((f) => URL.createObjectURL(f));
      setProcessedImages(processed);
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        background: "#fff",
        maxWidth: "700px",
        margin: "80px auto",
      }}
    >
      <i
        className={`fa ${iconClass}`}
        style={{ fontSize: "3rem", color: themeColor, marginBottom: "10px" }}
      ></i>
      <h2 style={{ marginBottom: "10px", fontWeight: "700", color: "#333" }}>
        {title}
      </h2>
      <p style={{ color: "#777", marginBottom: "25px" }}>{description}</p>

      {/* Single Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{
          maxWidth: "400px",
          margin: "10px auto",
          border: `2px solid ${themeColor}`,
          borderRadius: "8px",
        }}
      />

      {/* Folder Upload */}
      <input
        type="file"
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleFolderUpload}
        style={{
          maxWidth: "400px",
          margin: "10px auto",
          border: `2px solid ${themeColor}`,
          borderRadius: "8px",
        }}
      />

      {/* Uploaded previews */}
      {imagePreview && (
        <div style={{ marginTop: "30px" }}>
          <h5 style={{ color: "#333" }}>Uploaded Image:</h5>
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              marginTop: "10px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}

      {folderFiles.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h5 style={{ color: "#333" }}>Folder Images:</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {folderFiles.map((f, i) => (
              <li key={i} style={{ marginBottom: "5px", color: "#555" }}>
                {f.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Processed images */}
      {processedImages.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h5 style={{ color: "#333" }}>Processed Output:</h5>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {processedImages.map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  alt={`Processed ${i}`}
                  style={{
                    maxWidth: "150px",
                    borderRadius: "8px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                  }}
                />
                <br />
                <button
                  onClick={() => saveAs(img, `${title}-${i + 1}.png`)}
                  style={{
                    marginTop: "5px",
                    background: themeColor,
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: "25px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={handleProcessSingle}
          disabled={loading || !imageFile}
          style={{
            background: themeColor,
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : "Process Single Image"}
        </button>

        <button
          onClick={handleProcessFolder}
          disabled={loading || folderFiles.length === 0}
          style={{
            background: themeColor,
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : "Process Folder"}
        </button>
      </div>
    </div>
  );
};

export default ImageProcessor;
