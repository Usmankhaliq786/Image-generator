import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const ImageProcessor = ({ title, description, iconClass, themeColor }) => {
  const [imageFile, setImageFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleProcessSingle = () => {
    if (!imageFile) return alert("Please upload an image first!");
    setLoading(true);
    setTimeout(() => {
      alert("Image processed (simulation)!");
      setLoading(false);
    }, 1500);
  };

  const handleProcessFolder = () => {
    if (folderFiles.length === 0) return alert("Please select a folder!");
    setLoading(true);
    setTimeout(() => {
      alert(`${folderFiles.length} images processed (simulation)!`);
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
        className="form-control"
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
        className="form-control"
        style={{
          maxWidth: "400px",
          margin: "10px auto",
          border: `2px solid ${themeColor}`,
          borderRadius: "8px",
        }}
      />

      {/* Single Image Preview */}
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
          <button
            onClick={() => saveAs(imagePreview, `${title}.png`)}
            style={{
              marginTop: "15px",
              background: themeColor,
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Download Image
          </button>
        </div>
      )}

      {/* Folder Preview */}
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
          <button
            onClick={handleProcessFolder}
            disabled={loading}
            style={{
              marginTop: "10px",
              background: themeColor,
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "Processing..." : "Process Folder"}
          </button>
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: "25px" }}>
        <button
          onClick={handleProcessSingle}
          disabled={loading}
          style={{
            background: themeColor,
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : "Process Single Image"}
        </button>
      </div>
    </div>
  );
};

export default ImageProcessor;
