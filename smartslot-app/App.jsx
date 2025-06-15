import './App.css';
import { motion } from 'framer-motion';

// Стилі для кнопок
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
  transition: 'all 0.3s ease',
};

const secondaryButton = {
  ...primaryButton,
  backgroundColor: '#333',
  color: '#eee',
  boxShadow: '0 4px 12px rgba(255,255,255,0.1)',
};

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
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Зірки */}
      <div className="sky-layer">
        <div className="stars">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.5}px`,
                height: `${Math.random() * 1.5 + 0.5}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Контент */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.img
          src="/logo.png"
          alt="SmartSlot Logo"
          className="logo-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: '200px',
            marginBottom: '30px',
            borderRadius: '20px',
            position: 'relative',
            zIndex: 2,
          }}
        />

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: '2rem',
            marginBottom: '10px',
            textShadow: '0 0 8px #60a5fa, 0 0 16px #60a5fa',
          }}
        >
          Welcome to <span style={{ color: '#60a5fa' }}>SmartSlot</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ fontSize: '1rem', marginBottom: '30px' }}
        >
          <span className="blink">Initializing system...</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}
        >
          <button style={primaryButton}>Login</button>
          <button style={secondaryButton}>Register</button>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
