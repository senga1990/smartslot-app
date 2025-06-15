import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: { value: "transparent" },
        },
        particles: {
          number: { value: 60 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1 },
          },
          size: {
            value: 2,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 100 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
