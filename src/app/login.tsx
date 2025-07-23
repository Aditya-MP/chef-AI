import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(isSignup ? 'Account created (demo only)' : 'Logged in (demo only)');
    setTimeout(() => {
      window.location.href = '/main';
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form className="bg-gray-100 p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input className="w-full mb-2 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-2" type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <div className="flex justify-between text-sm">
          <button type="button" className="text-blue-600 underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account?' : 'Create an account'}
          </button>
          <Link href="#" className="text-blue-600 underline">Forgot Password?</Link>
        </div>
        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      </form>
    </div>
  );
}
