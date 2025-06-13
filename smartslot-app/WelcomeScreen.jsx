export default function WelcomeScreen() {
  return (
    <div
      style={{
        backgroundImage: "url('/bgnynight.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Темний шар */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      ></div>

      {/* Контент */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <img
          src="/logo.png"
          alt="SmartSlot Logo"
          style={{ width: "96px", height: "96px", marginBottom: "1.5rem" }}
        />

        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Welcome to <span style={{ color: "#60a5fa" }}>SmartSlot</span>
        </h1>

        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Your AI appointment assistant
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
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
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
