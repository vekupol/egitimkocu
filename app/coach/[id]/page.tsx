"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCoach } from "@/lib/firestore";
import type { Coach } from "@/types";
import Image from "next/image";

export default function CoachDetailPage() {
  const params = useParams();
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    (async () => {
      const data = await getCoach(params.id as string);
      setCoach(data);
    })();
  }, [params?.id]);

  if (!coach) return <div className="p-6 text-center">Yükleniyor…</div>;

  return (
    <div className="container py-10 max-w-3xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Fotoğraf */}
        <div className="relative w-48 aspect-[9/16] rounded-xl overflow-hidden shadow-lg">
          {coach.photoURL ? (
            <Image
              src={coach.photoURL}
              alt={coach.name || "Koç"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
              Fotoğraf Yok
            </div>
          )}
        </div>

        {/* Bilgiler */}
        <div className="flex-1 space-y-2 text-sm">
          <h1 className="text-2xl font-bold">{coach.name}</h1>
          <p>
            📍 {coach.city} {coach.district}
          </p>
          {coach.school && <p>🎓 {coach.school}</p>}
          {coach.certificateUni && <p>📜 {coach.certificateUni}</p>}
          {coach.subjects && coach.subjects.length > 0 && (
            <p>📘 Dersler: {coach.subjects.join(", ")}</p>
          )}
          {coach.services && coach.services.length > 0 && (
            <p>💼 Hizmetler: {coach.services.join(", ")}</p>
          )}
          {coach.serviceLocations && coach.serviceLocations.length > 0 && (
            <p>🌍 Konumlar: {coach.serviceLocations.join(", ")}</p>
          )}
          {coach.price && (
            <p className="font-medium text-brand-600">
              💰 {coach.price} TL / ders
            </p>
          )}

          {/* Telefon ve Mail sadece burada */}
          {coach.phone && (
            <p>
              📞{" "}
              <a href={`tel:${coach.phone}`} className="hover:underline">
                {coach.phone}
              </a>
            </p>
          )}
          {coach.email && (
            <p>
              ✉️{" "}
              <a href={`mailto:${coach.email}`} className="hover:underline">
                {coach.email}
              </a>
            </p>
          )}

          {/* Meta Bilgiler */}
          {coach.verified && (
            <span className="inline-block mt-2 rounded-full bg-green-400/70 px-3 py-1 text-xs">
              ✔ Onaylı Üye
            </span>
          )}
          <p>📅 Üye Yılı: {new Date(coach.createdAt).getFullYear()}</p>
          <p>💬 Yorum Sayısı: {coach.reviewsCount || 0}</p>
          <p>⭐ {coach.rating ? coach.rating.toFixed(1) : "0.0"} / 5</p>
        </div>
      </div>
    </div>
  );
}
