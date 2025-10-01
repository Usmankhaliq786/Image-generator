import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Services = ({ data }) => {
  const navigate = useNavigate();

  // Default services (fallback)
  const defaultServices = [
    {
      name: "Background Remover",
      text: "Remove the background from your images instantly with AI.",
      icon: "fa fa-scissors",
      path: "/background-remover",
    },
    {
      name: "Image Enhancer",
      text: "Enhance image quality, colors, and sharpness automatically.",
      icon: "fa fa-magic",
      path: "/image-enhancer",
    },
    {
      name: "Wrinkled to Ironed",
      text: "Make clothes in photos look neat and ironed in seconds.",
      icon: "fa fa-tshirt",
      path: "/wrinkled-to-ironed",
    },
  ];

  // build servicesData: prefer incoming data, but ensure path is present
  const servicesData =
    Array.isArray(data) && data.length > 0
      ? data.map((d, i) => ({
          ...d,
          path: d.path || defaultServices[i]?.path || `/service-${i}`,
        }))
      : defaultServices;

  // Modal / upload state
  const [selectedService, setSelectedService] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // create/revoke preview URL
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const openModal = (service) => {
    setSelectedService(service);
    setFile(null);
  };

  const closeModal = () => {
    setSelectedService(null);
    setFile(null);
    setPreviewUrl(null);
    setIsSubmitting(false);
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setFile(f);
  };

  // Placeholder submit — replace with real API call later
  const handleUploadAndSubmit = async () => {
    if (!file || !selectedService) return alert("Select an image first.");
    setIsSubmitting(true);

    try {
      // Example: send to your backend
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("service", selectedService.name);
      // await fetch("/api/upload", { method: "POST", body: formData });

      // For now just simulate and then navigate to tool page:
      setTimeout(() => {
        setIsSubmitting(false);
        closeModal();
        navigate(selectedService.path);
      }, 900);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Choose from our smart AI-powered image editing services.</p>
        </div>

        <div className="row">
          {servicesData.map((s, i) => (
            <div key={`${s.name}-${i}`} className="col-md-4 mb-4">
              <div className="card h-100 p-3">
                <div className="card-body text-center">
                  <i className={s.icon} style={{ fontSize: "30px" }}></i>
                  <h3 className="mt-2">{s.name}</h3>
                  <p>{s.text}</p>

                  <div className="d-flex justify-content-center gap-2">
                    {/* Primary: go to tool page */}
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(s.path)}
                    >
                      Try Now
                    </button>

                    {/* Secondary: quick demo modal (upload & preview) */}
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => openModal(s)}
                    >
                      Quick Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal (Quick Demo) */}
      {selectedService && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedService.name} — Quick Demo</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <p>{selectedService.text}</p>

                <div className="mb-3">
                  <label className="form-label">Upload an image (preview)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                {previewUrl && (
                  <div className="text-center">
                    <h6>Preview</h6>
                    <img
                      src={previewUrl}
                      alt="preview"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>

                <button
                  className="btn btn-success"
                  disabled={!file || isSubmitting}
                  onClick={handleUploadAndSubmit}
                >
                  {isSubmitting ? "Submitting..." : "Upload & Go to Tool"}
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    // direct go to tool without upload
                    closeModal();
                    navigate(selectedService.path);
                  }}
                >
                  Go to Tool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
