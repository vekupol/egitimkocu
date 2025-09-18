"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import type { Coach } from "@/types/index";

export default function AdminPage() {
  return (
    <Protected requireAdmin>
      <Content />
    </Protected>
  );
}

function Content() {
  const [items, setItems] = useState<Coach[]>([]);
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "coaches"));
      setItems(snap.docs.map((d) => d.data() as Coach));
    })();
  }, []);

  async function setFlag(
    uid: string,
    key: "verified" | "premium",
    val: boolean
  ) {
    await updateDoc(doc(db, "coaches", uid), { [key]: val });
    setItems((prev) =>
      prev.map((i) => (i.uid === uid ? { ...i, [key]: val } : i))
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="grid gap-3">
        {items.map((c) => (
          <div
            key={c.uid}
            className="rounded-xl border p-3 flex items-center justify-between"
          >
            <div>
              <b>{c.name}</b> — {c.branch} • {c.city}
              {c.premium && <span className="ml-2 text-xs">⭐</span>}{" "}
              {c.verified && <span className="text-xs">✔</span>}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border px-3 py-1"
                onClick={() => setFlag(c.uid, "verified", !c.verified)}
              >
                Onay: {c.verified ? "Açık" : "Kapalı"}
              </button>
              <button
                className="rounded-lg border px-3 py-1"
                onClick={() => setFlag(c.uid, "premium", !c.premium)}
              >
                Premium: {c.premium ? "Açık" : "Kapalı"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
