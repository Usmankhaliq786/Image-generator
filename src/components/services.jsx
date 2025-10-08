import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageProcessor from "./ImageProcessor";

export const Services = ({ data }) => {
  const navigate = useNavigate();

  const defaultServices = [
    {
      name: "Background Remover",
      text: "Remove the background from your images instantly with AI.",
      icon: "fa fa-scissors",
      path: "/background-remover",
      themeColor: "#007bff",
    },
    {
      name: "Image Enhancer",
      text: "Enhance image quality, colors, and sharpness automatically.",
      icon: "fa fa-magic",
      path: "/image-enhancer",
      themeColor: "#28a745",
    },
    {
      name: "Wrinkled to Ironed",
      text: "Make clothes in photos look neat and ironed in seconds.",
      icon: "fa fa-image",
      path: "/wrinkled-to-ironed",
      themeColor: "#ffc107",
    },
    {
      name: "Background Remover & Centralized Image",
      text: "Remove background and automatically center the subject using AI.",
      icon: "fa fa-adjust",
      path: "/background-center",
      themeColor: "#17a2b8",
    },
  ];

  const servicesData =
    Array.isArray(data) && data.length > 0
      ? data.map((item, index) => ({
          ...item,
          path: defaultServices[index]?.path || `/service-${index}`,
          themeColor: defaultServices[index]?.themeColor || "#007bff",
        }))
      : defaultServices;

  const [selectedService, setSelectedService] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const styles = {
    section: {
      padding: "80px 20px",
      background: "linear-gradient(135deg, #f8f9fc 0%, #eef1f8 100%)",
      textAlign: "center",
      fontFamily: "Inter, sans-serif",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e1e2f",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#6c757d",
      marginBottom: "50px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "30px",
      justifyItems: "center",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: (isHovered) => ({
      background: "#fff",
      borderRadius: "20px",
      padding: "35px 25px",
      width: "100%",
      boxShadow: isHovered
        ? "0 10px 30px rgba(0, 0, 0, 0.15)"
        : "0 5px 15px rgba(0, 0, 0, 0.08)",
      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      transition: "all 0.3s ease",
      textAlign: "center",
    }),
    iconWrapper: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "35px",
      color: "white",
      margin: "0 auto 20px",
    },
    cardTitle: {
      fontWeight: "600",
      fontSize: "1.2rem",
      marginBottom: "10px",
      color: "#212529",
    },
    cardText: {
      color: "#6c757d",
      fontSize: "0.95rem",
      marginBottom: "25px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
    btnPrimary: (color) => ({
      background: color,
      border: "none",
      color: "white",
      padding: "10px 20px",
      borderRadius: "10px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
    btnOutline: (color) => ({
      background: "transparent",
      border: `2px solid ${color}`,
      color: color,
      padding: "10px 20px",
      borderRadius: "10px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(30,30,30,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    },
    modalBox: {
      background: "#fff",
      borderRadius: "15px",
      padding: "30px",
      width: "90%",
      maxWidth: "800px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
      textAlign: "center",
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>✨ Our AI Services</h2>
      <p style={styles.subtitle}>
        Transform your photos instantly using smart AI tools.
      </p>

      <div style={styles.grid}>
        {servicesData.map((s, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={i}
              style={{
                ...styles.card(isHovered),
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                style={{
                  ...styles.iconWrapper,
                  background: `linear-gradient(135deg, ${s.themeColor}, #fff)`,
                }}
              >
                <i className={s.icon} aria-hidden="true"></i>
              </div>
              <h3 style={styles.cardTitle}>{s.name}</h3>
              <p style={styles.cardText}>{s.text}</p>
              <div style={styles.buttonGroup}>
                <button
                  style={styles.btnPrimary(s.themeColor)}
                  onClick={() => navigate(s.path)}
                >
                  Try Now
                </button>
                <button
                  style={styles.btnOutline(s.themeColor)}
                  onClick={() => setSelectedService(s)}
                >
                  Quick Demo
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedService && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <button
              onClick={() => setSelectedService(null)}
              style={{
                float: "right",
                background: "transparent",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <ImageProcessor
              title={selectedService.name}
              description={selectedService.text}
              iconClass={selectedService.icon.replace("fa ", "")}
              themeColor={selectedService.themeColor}
            />
          </div>
        </div>
      )}
    </section>
  );
};
