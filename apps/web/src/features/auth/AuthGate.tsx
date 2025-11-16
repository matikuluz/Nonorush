import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../lib/firebase";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function AuthGate({ children, fallback }: Props) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (user === undefined) return <div>Loading…</div>;
  if (!user) return <>{fallback}</>;

  return <>{children}</>;
}
