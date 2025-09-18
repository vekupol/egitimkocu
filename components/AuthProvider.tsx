"use client";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { ensureUser } from "@/lib/firestore";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  loginGoogle: async () => {},
  logout: async () => {},
});
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await ensureUser(u.uid, u.email || undefined);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }
  async function logout() {
    await signOut(auth);
  }

  return (
    <Ctx.Provider value={{ user, loading, loginGoogle, logout }}>
      {children}
    </Ctx.Provider>
  );
}
