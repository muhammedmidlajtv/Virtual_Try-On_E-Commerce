import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      alert('Account created successfully');
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  // Same styles as before
  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #43cea2, #185a9d)',
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
      backgroundColor: '#185a9d',
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
      color: '#185a9d',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.formWrapper}>
        <h2 style={styles.heading}>Create Account</h2>
        <input 
          type="text"
          placeholder='Enter your name'
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>Register</button>

        <div style={styles.bottomText}>
          <span>Already have an account?</span>
          <Link to="/" style={styles.link}>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
