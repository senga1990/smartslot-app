import './App.css'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        color: '#fff',
        textAlign: 'center',
        backgroundImage: "url('/bgnynight.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="logo-glow" />
        <img
          src="/logo.png"
          alt="SmartSlot Logo"
          className="logo-spin"
          style={{
            width: '200px',
            marginBottom: '30px',
            borderRadius: '20px',
            position: 'relative',
            zIndex: 2
          }}
        />

        <h1 className="glow-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>
          Welcome to SmartSlot
        </h1>

        <p style={{ fontSize: '1rem', marginBottom: '30px' }}>
          <span className="blink">Initializing system...</span>
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button style={primaryButton}>Login</button>
          <button style={secondaryButton}>Register</button>
        </div>
      </div>
    </div>
  )
}

const primaryButton = {
  padding: '10px 24px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
  transition: 'all 0.3s ease'
}

const secondaryButton = {
  ...primaryButton,
  backgroundColor: '#333',
  color: '#eee',
  boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
}

export default App
