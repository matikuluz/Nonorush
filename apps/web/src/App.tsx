import { useState } from "react";
import { signOut } from "firebase/auth";
import AuthGate from "./features/auth/AuthGate";
import Login from "./features/auth/Login";
import { auth } from "./lib/firebase";
import "./App.css";

export default function App() {
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to sign out";
      setError(message);
      console.error("Sign out failed", e);
    }
  };

  return (
    <AuthGate fallback={<Login />}>
      <h1>Nonogram Racer</h1>
      <p>You are logged in.</p>
      <button onClick={handleLogout}>Log out</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </AuthGate>
  );
}
