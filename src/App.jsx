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
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

// ✅ Dummy Auth Component
const Auth = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignup ? "Signup with" : "Login with", email, password);
    onLogin();
  };

  return (
    <div className="auth-container text-center mt-5">
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control w-50"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control w-50"
        />
        <button type="submit" className="btn btn-primary w-50">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer", marginTop: "10px" }}>
        {isSignup ? "Already have an account? Sign In" : "New here? Sign Up"}
      </p>
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

    // ✅ Persist login using localStorage
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
      {/* Navigation bar me logout button */}
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
