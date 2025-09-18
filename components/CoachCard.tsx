"use client";
import Image from "next/image";
import type { Coach } from "@/types/index";
import { motion } from "framer-motion";
import Link from "next/link";

function maskPhone(phone?: string) {
  if (!phone) return null;
  // sadece ilk 2 haneyi ve formatı koru, geri kalanı gizle
  return phone.replace(
    /^(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/,
    "05xx xxx xx xx"
  );
}

export default function CoachCard({ c }: { c?: Coach }) {
  if (!c) return null;

  return (
    <Link href={`/coach/${c.uid}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto rounded-2xl border bg-white shadow-sm dark:bg-neutral-900 hover:shadow-xl transition-all duration-300 p-4 cursor-pointer"
      >
        {/* Sol: Profil Fotoğrafı */}
        <div className="relative w-full aspect-[9/16] max-h-[450px] overflow-hidden rounded-xl shadow-md">
          {c.photoURL ? (
            <Image
              src={c.photoURL}
              alt={c.name || "Koç"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-xs text-neutral-500">
              9:16 Fotoğraf
            </div>
          )}
        </div>

        {/* Sağ: Bilgiler */}
        <div className="flex flex-col text-sm space-y-1">
          <h3 className="font-semibold text-lg">{c.name || "İsimsiz"}</h3>
          <p className="text-neutral-500">
            📍 {c.city} {c.district && `, ${c.district}`}
          </p>
          {c.school && <p>🎓 {c.school}</p>}
          {c.certificateUni && <p>📜 {c.certificateUni}</p>}
          {c.subjects && c.subjects.length > 0 && (
            <p>📘 Dersler: {c.subjects.join(", ")}</p>
          )}
          {c.services && c.services.length > 0 && (
            <p>💼 Hizmetler: {c.services.join(", ")}</p>
          )}
          {c.serviceLocations && c.serviceLocations.length > 0 && (
            <p>🌍 Konumlar: {c.serviceLocations.join(", ")}</p>
          )}
          {c.price && (
            <p className="mt-2 font-medium text-brand-600">
              💰 {c.price} TL / ders
            </p>
          )}

          {/* Kartta maskeli telefon */}
          {c.phone && (
            <p className="text-neutral-600">📞 {maskPhone(c.phone)}</p>
          )}

          {c.verified && (
            <span className="inline-block mt-2 rounded-full bg-green-400/70 px-3 py-1 text-xs">
              ✔ Onaylı Üye
            </span>
          )}
          <p>📅 Üye Yılı: {new Date(c.createdAt).getFullYear()}</p>
          <p>💬 Yorum Sayısı: {c.reviewsCount || 0}</p>
          <p>⭐ {c.rating ? c.rating.toFixed(1) : "0.0"} / 5</p>
        </div>
      </motion.div>
    </Link>
  );
}
