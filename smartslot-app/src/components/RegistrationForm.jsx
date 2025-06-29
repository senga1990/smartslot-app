import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      return setError('❗ Заповніть всі поля');
    }
    if (password !== repeatPassword) {
      return setError('❗ Паролі не співпадають');
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created:', result.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Email registration error:', err);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('✅ Google user:', user);
      alert(`Welcome, ${user.displayName || 'User'}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      setError('❌ Google login failed');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: '#ff4d4f', fontSize: '14px' }}>{error}</p>}

        <button type="submit" className="auth-button">
          Register with Email
        </button>

        <div className="login-options" style={{ marginTop: '12px' }}>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-button"
          >
            🔑 Already have an account?
          </button>

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            📱 Prefer phone? <Link to="/phone">Register by phone</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
