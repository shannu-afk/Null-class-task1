import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getUserData } from "../services/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const validate = () => {
    if (!email || !pass) {
      setError("Please enter both email and password.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const login = async () => {
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      await getUserData(res.user.uid);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setError("");
    if (!validate()) return;
    if (pass.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await getUserData(res.user.uid);
      alert("Signup Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <style>{`
        :root {
          --bg: #0f172a;
          --card: #111827;
          --text: #e5e7eb;
          --muted: #9ca3af;
          --primary: #6366f1;
          --primary-hover: #5458e6;
          --danger: #ef4444;
          --ring: rgba(99, 102, 241, 0.5);
        }
        body { margin: 0; }
        .auth-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: radial-gradient(60% 120% at 80% 0%, #1f2937 0%, var(--bg) 60%);
          padding: 24px;
          color: var(--text);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
        }
        .card {
          width: 100%;
          max-width: 420px;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          border-radius: 16px;
          padding: 28px;
          backdrop-filter: blur(6px);
        }
        .title {
          margin: 0 0 4px;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        .subtitle {
          margin: 0 0 20px;
          color: var(--muted);
          font-size: 14px;
        }
        .field { margin-bottom: 14px; }
        label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
        .input {
          width: 100%;
          background: #0b1220;
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--text);
          border-radius: 10px;
          padding: 12px 12px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px var(--ring);
        }
        .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
        .btn {
          appearance: none;
          border: none;
          background: var(--primary);
          color: white;
          padding: 12px 14px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, transform 0.02s;
        }
        .btn.secondary { background: #1f2937; }
        .btn:hover { background: var(--primary-hover); }
        .btn:active { transform: translateY(1px); }
        .btn[disabled] { opacity: 0.6; cursor: not-allowed; }
        .error { margin-top: 10px; color: #fecaca; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); padding: 10px 12px; border-radius: 10px; font-size: 13px; }
      `}</style>
      <div className="card">
        <h1 className="title">Welcome</h1>
        <p className="subtitle">Login or create your account</p>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
            minLength={6}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button className="btn" onClick={login} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <button className="btn secondary" onClick={signup} disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
