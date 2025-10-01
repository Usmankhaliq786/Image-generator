import React, { useState } from "react";

const ImageUploader = ({ buttonText, buttonColor }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="upload-input"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button
        className={`btn btn-lg btn-${buttonColor}`}
        onClick={() => document.getElementById("upload-input").click()}
      >
        {buttonText}
      </button>

      {image && (
        <div className="mt-4">
          <h5>Preview:</h5>
          <img
            src={image}
            alt="Uploaded Preview"
            className="img-fluid rounded shadow"
            style={{ maxWidth: "400px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
