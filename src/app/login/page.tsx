
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        localStorage.setItem("userId", data.id);
        // Optionally set cookie for SSR if needed
        await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: data.id }),
        });
        router.push("/");
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #2c3e50, #1a1a2e)" }}>
      <div className="background-container" style={{
        flex: 1,
        background:
          "url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80') no-repeat center center",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2rem"
      }}>
        <div className="logo" style={{
          position: "absolute", top: "2rem", left: "2rem", zIndex: 2, fontSize: "2rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center"
        }}>
          <i className="fas fa-utensils" style={{ marginRight: 10, color: "#FF6B6B" }}></i>
          Chef AI
        </div>
        <div className="welcome-text" style={{ position: "relative", zIndex: 2, color: "white", maxWidth: 600 }}>
          <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem", fontWeight: 700, lineHeight: 1.2 }}>Welcome Back</h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, lineHeight: 1.6, marginBottom: "2rem" }}>
            Sign in to continue your culinary journey with Chef AI. Access personalized recipes, cooking tutorials, and smart kitchen management tools to elevate your cooking experience.
          </p>
        </div>
      </div>
      <div className="form-container" style={{
        width: "100%", maxWidth: 480, background: "white", padding: "3rem", display: "flex", flexDirection: "column", boxShadow: "0 15px 30px rgba(0,0,0,0.2)", overflowY: "auto"
      }}>
        <div className="form-header" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#2c3e50", marginBottom: "0.5rem", fontWeight: 700 }}>Sign In</h2>
          <p style={{ color: "#7f8c8d", fontSize: "1rem" }}>Access your Chef AI account to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#2c3e50", fontSize: "0.9rem" }}>Email Address*</label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <i className="fas fa-envelope" style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: "#95a5a6" }}></i>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", padding: "15px 15px 15px 45px", border: "2px solid #ecf0f1", borderRadius: 8, fontSize: "1rem", transition: "all 0.3s" }}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#2c3e50", fontSize: "0.9rem" }}>Password*</label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <i className="fas fa-lock" style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: "#95a5a6" }}></i>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: "100%", padding: "15px 15px 15px 45px", border: "2px solid #ecf0f1", borderRadius: 8, fontSize: "1rem", transition: "all 0.3s" }}
              />
            </div>
          </div>
          <div className="options" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div className="remember-me" style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" id="remember" style={{ marginRight: 8 }} />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password" style={{ color: "#FF6B6B", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary" style={{
            padding: 15, border: "none", borderRadius: 8, fontSize: "1rem", fontWeight: 600, cursor: "pointer", background: "#FF6B6B", color: "white", marginBottom: "1.5rem", boxShadow: "0 4px 6px rgba(255,107,107,0.3)"
          }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <div style={{ color: "#FF6B6B", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
          <div className="demo-credentials" style={{
            background: "#f8f9fa", borderLeft: "4px solid #FF6B6B", padding: 15, margin: "1.5rem 0", borderRadius: "0 8px 8px 0", fontSize: "0.9rem"
          }}>
            <strong style={{ display: "block", marginBottom: 5, color: "#2c3e50" }}>Demo credentials:</strong>
            chef@example.com / password123
          </div>
          <div className="divider" style={{
            display: "flex", alignItems: "center", textAlign: "center", margin: "1.5rem 0", color: "#95a5a6"
          }}>
            <span style={{ flex: 1, borderBottom: "1px solid #ecf0f1", marginRight: ".75em" }}></span>
            Or continue with
            <span style={{ flex: 1, borderBottom: "1px solid #ecf0f1", marginLeft: ".75em" }}></span>
          </div>
          <div className="social-login" style={{ display: "flex", gap: 15, marginBottom: "1.5rem" }}>
            <button type="button" className="social-btn google" style={{
              flex: 1, padding: 12, border: "1px solid #ecf0f1", borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#2c3e50", cursor: "pointer"
            }}>
              <i className="fab fa-google" style={{ marginRight: 8, fontSize: "1.2rem" }}></i> Google
            </button>
            <button type="button" className="social-btn facebook" style={{
              flex: 1, padding: 12, border: "1px solid #ecf0f1", borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#1877F2", cursor: "pointer"
            }}>
              <i className="fab fa-facebook-f" style={{ marginRight: 8, fontSize: "1.2rem" }}></i> Facebook
            </button>
          </div>
          <div className="security-badges" style={{ display: "flex", justifyContent: "space-between", margin: "2rem 0 1.5rem", gap: 10 }}>
            <div className="badge" style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "0.8rem", color: "#7f8c8d" }}>
              <i className="fas fa-lock" style={{ fontSize: "1.5rem", marginBottom: 8, color: "#27ae60" }}></i>
              <span>SSL Encrypted</span>
            </div>
            <div className="badge" style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "0.8rem", color: "#7f8c8d" }}>
              <i className="fas fa-shield-alt" style={{ fontSize: "1.5rem", marginBottom: 8, color: "#27ae60" }}></i>
              <span>Secure Authentication</span>
            </div>
            <div className="badge" style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "0.8rem", color: "#7f8c8d" }}>
              <i className="fas fa-user-shield" style={{ fontSize: "1.5rem", marginBottom: 8, color: "#27ae60" }}></i>
              <span>Privacy Protected</span>
            </div>
          </div>
          <div className="signup-link" style={{ textAlign: "center", marginTop: "1rem", color: "#7f8c8d" }}>
            Don't have an account? <a href="#" style={{ color: "#FF6B6B", textDecoration: "none", fontWeight: 600 }}>Sign up</a>
          </div>
        </form>
      </div>
      {/* FontAwesome CDN for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
