"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listCoaches } from "@/lib/firestore";
import type { Coach } from "@/types";
import CoachCard from "@/components/CoachCard";

export default function HomePage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await listCoaches({ premiumFirst: true });
        console.log("Coaches data:", list);
        setCoaches(list.filter(Boolean));
      } catch (err) {
        console.error("Coach list error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl">
          Türkiye'de Eğitim Koçlarının Buluştuğu İlk ve Tek Platform
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-300">
          Ücretsiz profil aç, onaylı/premium olarak öne çık. Öğrenciler seni
          kolayca bulsun.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/coaches"
            className="rounded-2xl bg-brand-600 text-white px-5 py-3"
          >
            Koçları Gör
          </Link>
          <Link href="/profile" className="rounded-2xl border px-5 py-3">
            Profil Oluştur
          </Link>
        </div>
      </div>

      {/* Koç Listesi Grid */}
      <div className="mt-12 container">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Öne Çıkan Koçlar
        </h2>
        {loading ? (
          <p className="text-center text-neutral-500">Yükleniyor...</p>
        ) : coaches.length === 0 ? (
          <p className="text-center text-neutral-500">Henüz kayıtlı koç yok.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {coaches.slice(0, 8).map((c) => (
              <CoachCard key={c.uid} c={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
