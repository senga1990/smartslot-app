import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeScreen.css';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      return setError('Please fill out all fields');
    }

    if (password !== repeatPassword) {
      return setError('Passwords do not match');
    }

    setError('');
    console.log('Registering:', email, password);
    // TODO: Firebase registration logic here
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

        {error && (
          <p style={{ color: '#ff8080', fontSize: '14px', margin: 0 }}>{error}</p>
        )}

        <button type="submit">Register</button>

        <div className="login-options">
          <a href="#" onClick={() => navigate('/login')}>
            🔑 Already have an account?
          </a>

          <a href="#" className="google-button">
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
  />
  Continue with Google
</a>

        </div>
      </form>
    </div>
  );
}
