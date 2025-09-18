"use client";
import { useEffect, useState } from "react";
import { listCoaches } from "@/lib/firestore";
import type { Coach } from "@/types/index";
import CoachCard from "@/components/CoachCard";

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filtered, setFiltered] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtre state'leri
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("all"); // all | online | offline
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState("reviews"); // reviews | rating | newest | oldest

  useEffect(() => {
    (async () => {
      try {
        const list = await listCoaches({ premiumFirst: true });
        setCoaches(list.filter(Boolean));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let data = [...coaches];

    // Filtreleme
    if (city) {
      data = data.filter((c) =>
        c.city?.toLowerCase().includes(city.toLowerCase())
      );
    }
    if (subject) {
      data = data.filter((c) =>
        c.subjects?.some((s) => s.toLowerCase().includes(subject.toLowerCase()))
      );
    }
    if (mode !== "all") {
      data = data.filter((c) =>
        mode === "online"
          ? c.modes?.includes("online")
          : c.modes?.includes("offline")
      );
    }

    if (onlyVerified) {
      data = data.filter((c) => c.verified);
    }

    // Sıralama
    switch (sortBy) {
      case "reviews":
        data.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case "rating":
        data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        data.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        data.sort((a, b) => a.createdAt - b.createdAt);
        break;
    }

    setFiltered(data);
  }, [coaches, city, subject, mode, onlyVerified, sortBy]);

  return (
    <section className="py-10 container">
      <h1 className="text-3xl font-semibold text-center mb-8">Koçları Ara</h1>

      {/* Filtreler */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        <input
          type="text"
          placeholder="Şehir"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-xl border px-3 py-2"
        />

        <input
          type="text"
          placeholder="Ders"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-xl border px-3 py-2"
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="rounded-xl border px-3 py-2"
        >
          <option value="all">Online & Yüz yüze</option>
          <option value="online">Sadece Online</option>
          <option value="offline">Sadece Yüz yüze</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
          />
          Onaylı Üyeler
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border px-3 py-2"
        >
          <option value="reviews">Yorum Sayısına Göre</option>
          <option value="rating">Puan Ortalamasına Göre</option>
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
        </select>
      </div>

      {/* Liste */}
      {loading ? (
        <p className="text-center text-neutral-500">Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-neutral-500">Koç bulunamadı.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((c) => (
            <CoachCard key={c.uid} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}
