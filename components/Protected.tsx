"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Protected({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, loading } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    async function run() {
      if (loading) return;
      if (!user) {
        window.location.href = "/";
        return;
      }
      if (!requireAdmin) {
        setOk(true);
        return;
      }
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      setOk(!!snap.exists() && snap.data().role === "admin");
      if (!ok) window.location.href = "/";
    }
    run();
  }, [user, loading]);

  if (loading || !ok) return <div className="container py-16">Yükleniyor…</div>;
  return <>{children}</>;
}
