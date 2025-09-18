"use client";
import Protected from "@/components/Protected";
import { useAuth } from "@/components/AuthProvider";
import { getCoach, upsertCoach } from "@/lib/firestore";
import UploadAvatar from "@/components/UploadAvatar";
import CoachCard from "@/components/CoachCard";
import ChipInput from "@/components/ChipInput";
import { useEffect, useState } from "react";
import type { Coach } from "@/types";

export default function ProfilePage() {
  return (
    <Protected>
      <Content />
    </Protected>
  );
}

function Content() {
  const { user } = useAuth();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [busy, setBusy] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const c = await getCoach(user.uid);
      setCoach(
        c || {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "", // varsayılan olarak auth maili
          phone: "",
          city: "",
          district: "",
          createdAt: Date.now(),
          subjects: [],
          services: [],
          serviceLocations: [],
          modes: [],
        }
      );
    })();
  }, [user]);

  async function save() {
    if (!user || !coach) return;
    setBusy(true);
    await upsertCoach(user.uid, coach);
    setBusy(false);
    alert("Kaydedildi ✅");
    setEditMode(false);
  }

  if (!coach) return <div>Yükleniyor…</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Profilim</h1>

      {/* Koç Kartı */}
      <CoachCard c={coach} />

      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="rounded-2xl bg-brand-600 text-white px-4 py-2"
        >
          Düzenle
        </button>
      ) : (
        <div className="space-y-4">
          <UploadAvatar
            uid={coach.uid}
            onDone={(url) => setCoach({ ...coach, photoURL: url })}
          />

          {/* İsim */}
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Ad Soyad"
            value={coach.name}
            onChange={(e) => setCoach({ ...coach, name: e.target.value })}
          />

          {/* Telefon */}
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Telefon (örn: 05xx xxx xx xx)"
            value={coach.phone || ""}
            onChange={(e) => setCoach({ ...coach, phone: e.target.value })}
          />

          {/* Email */}
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="E-posta"
            value={coach.email || ""}
            onChange={(e) => setCoach({ ...coach, email: e.target.value })}
          />

          {/* İl ve İlçe */}
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="İl"
            value={coach.city}
            onChange={(e) => setCoach({ ...coach, city: e.target.value })}
          />
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="İlçe"
            value={coach.district || ""}
            onChange={(e) => setCoach({ ...coach, district: e.target.value })}
          />

          {/* Okul / Sertifika */}
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Mezun Olduğu Okul"
            value={coach.school || ""}
            onChange={(e) => setCoach({ ...coach, school: e.target.value })}
          />
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Koçluk Sertifikası (Üniversite)"
            value={coach.certificateUni || ""}
            onChange={(e) =>
              setCoach({ ...coach, certificateUni: e.target.value })
            }
          />

          {/* Dersler */}
          <ChipInput
            values={coach.subjects || []}
            onChange={(v) => setCoach({ ...coach, subjects: v })}
            placeholder="Ders ekle (örn: Fen Bilimleri)"
          />

          {/* Hizmetler */}
          <ChipInput
            values={coach.services || []}
            onChange={(v) => setCoach({ ...coach, services: v })}
            placeholder="Hizmet ekle (örn: Eğitim Koçluğu)"
          />

          {/* Konumlar */}
          <ChipInput
            values={coach.serviceLocations || []}
            onChange={(v) => setCoach({ ...coach, serviceLocations: v })}
            placeholder="Konum ekle (örn: İstanbul Avrupa)"
          />

          {/* Eğitim Tipi */}
          <div className="space-y-2">
            <label className="font-medium">Eğitim Şekli</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={coach.modes?.includes("online")}
                  onChange={(e) => {
                    const modes = new Set(coach.modes || []);
                    e.target.checked
                      ? modes.add("online")
                      : modes.delete("online");
                    setCoach({ ...coach, modes: Array.from(modes) });
                  }}
                />
                Online
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={coach.modes?.includes("offline")}
                  onChange={(e) => {
                    const modes = new Set(coach.modes || []);
                    e.target.checked
                      ? modes.add("offline")
                      : modes.delete("offline");
                    setCoach({ ...coach, modes: Array.from(modes) });
                  }}
                />
                Yüz yüze
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={coach.modes?.includes("both")}
                  onChange={(e) => {
                    const modes = new Set(coach.modes || []);
                    e.target.checked ? modes.add("both") : modes.delete("both");
                    setCoach({ ...coach, modes: Array.from(modes) });
                  }}
                />
                Her ikisi
              </label>
            </div>
          </div>

          {/* Ücret */}
          <input
            type="number"
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Ücret (TL)"
            value={coach.price || ""}
            onChange={(e) =>
              setCoach({ ...coach, price: Number(e.target.value) })
            }
          />

          {/* Butonlar */}
          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={busy}
              className="rounded-2xl bg-brand-600 text-white px-4 py-2"
            >
              {busy ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="rounded-2xl border px-4 py-2"
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
