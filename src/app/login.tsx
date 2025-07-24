import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      // Set cookie for authentication
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.id }),
      });
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.error || 'Login failed');
      if (data.error === 'User not found') setShowRegister(true);
    }
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(isSignup ? 'Account created (demo only)' : 'Logged in (demo only)');
    setTimeout(() => {
      window.location.href = '/main';
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form className="bg-gray-100 p-8 rounded shadow-md w-full max-w-sm" onSubmit={isSignup ? handleSubmit : handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input className="w-full mb-2 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-2" type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
        <div className="flex justify-between text-sm">
          <button type="button" className="text-blue-600 underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account?' : 'Create an account'}
          </button>
          <Link href="#" className="text-blue-600 underline">Forgot Password?</Link>
        </div>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      </form>
    </div>
  );
}
