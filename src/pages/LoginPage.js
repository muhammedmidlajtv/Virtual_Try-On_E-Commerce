import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get current user from context

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
      // Navigate to home page after successful login
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
    },
    formWrapper: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '1.8rem',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#6a11cb',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    bottomText: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.95rem',
      color: '#555',
    },
    link: {
      color: '#6a11cb',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.formWrapper}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>

        <div style={styles.bottomText}>
          <span>Forgot your password?</span>
          <Link to="/forgot-password" style={styles.link}>Reset</Link>
        </div>

        <div style={styles.bottomText}>
          <span>New here?</span>
          <Link to="/create-account" style={styles.link}>Create Account</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;