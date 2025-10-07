import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Contact } from "./components/contact";
import { BackgroundRemover } from "./components/BackgroundRemover";
import { ImageEnhancer } from "./components/ImageEnhancer";
import { WrinkledToIroned } from "./components/WrinkledToIroned";
import { BackgroundCenter } from "./components/BackgroundCenter";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

// ✅ Allowed Emails
const allowedEmails = [
  "mohammad@bettaline.com",
  "ugolebanonugo@gmail.com",
  "Ramzannoman4141@gmail.com",
  "Salmansaluu661@gmail.com",
  "uusmanawan334@gmail.com",
];

// ✅ Auth Component
const Auth = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allowedEmails.includes(email.trim())) {
      setError("❌ Access denied. This email is not authorized to use Numan Edit’s.");
      return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    onLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "40px 50px",
          width: "380px",
          boxShadow: "0 0 25px rgba(0,0,0,0.3)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            marginBottom: "15px",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Numan <span style={{ color: "#00c6ff" }}>Edit’s</span>
        </h1>
        <h3 style={{ marginBottom: "25px" }}>
          {isSignup ? "Create your account" : "Welcome back!"}
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ color: "#ff5555", fontSize: "14px", marginTop: "5px" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(45deg, #00c6ff, #0072ff)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 0 10px rgba(0,114,255,0.4)",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1.0)")}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
          style={{
            marginTop: "15px",
            cursor: "pointer",
            textDecoration: "underline",
            color: "#aee1ff",
          }}
        >
          {isSignup ? "Already have an account? Sign In" : "New here? Create an account"}
        </p>
      </div>
    </div>
  );
};

// ✅ Smooth scroll
export const scroll = new SmoothScroll('a[href*="#"]', { speed: 1000, speedAsDuration: true });

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setLandingPageData(JsonData);

    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  // ✅ Show Auth page if not logged in
  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Navigation onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery data={landingPageData.Gallery} />
              <Contact data={landingPageData.Contact} />
            </>
          }
        />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/image-enhancer" element={<ImageEnhancer />} />
        <Route path="/wrinkled-to-ironed" element={<WrinkledToIroned />} />
        <Route path="/background-center" element={<BackgroundCenter />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
