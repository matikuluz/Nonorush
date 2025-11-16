import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, pw);
    } catch (e: any) {
      setError(e.message ?? "Login failed");
    }
  }

  async function handleRegister() {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, pw);
    } catch (e: any) {
      setError(e.message ?? "Register failed");
    }
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}
    >
      <h2>Sign in</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={handleLogin}>Log in</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleSignOut}>Sign out</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
