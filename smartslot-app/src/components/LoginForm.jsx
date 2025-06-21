import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Logged in:', userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>

        <div className="login-options">
          <a href="/phone">📱 Use phone number</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
