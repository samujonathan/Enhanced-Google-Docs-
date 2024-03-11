// SignupPage.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

  

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(JSON.stringify({email, password}));
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const { token } = await response.json();
      // Save token to localStorage or global state for future authenticated requests
      localStorage.setItem('token', token);
      history.push("/dashboard");

      // Redirect to dashboard or any other authenticated route
      // Example: history.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
