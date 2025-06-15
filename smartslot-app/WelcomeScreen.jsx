import React, { useState, useEffect } from "react";
import ParticlesBackground from "./ParticlesBackground";
import { motion } from "framer-motion";

export default function WelcomeScreen() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Initializing system...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "130vh",
        overflow: "hidden",
        transform: "scale(0.75)", // ✅ Масштаб всього
        transformOrigin: "top center",
      }}
    >
      {/* ✅ Фон через <img> */}
      <img
        src="/bgnynight.png"
        alt="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: 0,
        }}
      />

      {/* Темне затемнення */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      <ParticlesBackground />

      {/* Контент */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        {/* Логотип */}
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="/logo.png"
          alt="SmartSlot Logo"
          className="floating-logo"
          style={{
            width: "96px",
            height: "96px",
            marginBottom: "1.5rem",
            filter: "drop-shadow(0 0 8px #60a5fa)",
          }}
        />

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: "2rem",
            marginBottom: "10px",
            textShadow: "0 0 8px #60a5fa, 0 0 16px #60a5fa, 0 0 24px #3b82f6",
          }}
        >
          Welcome to <span style={{ color: "#60a5fa" }}>SmartSlot</span>
        </motion.h1>

        {/* Ефект набору тексту */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ fontSize: "1.25rem", marginBottom: "2rem" }}
        >
          <span style={{ fontFamily: "Courier New, monospace" }}>
            {typedText}
            <span className="cursor">|</span>
          </span>
        </motion.p>

        {/* Кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: "flex", gap: "1rem" }}
        >
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 0 10px #3b82f6",
            }}
          >
            Login
          </button>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 0 10px #fff",
            }}
          >
            Register
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .floating-logo {
          animation: float 3s ease-in-out infinite;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
