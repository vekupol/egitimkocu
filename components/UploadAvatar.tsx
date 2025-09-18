"use client";
import { ChangeEvent, useState } from "react";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function UploadAvatar({
  uid,
  onDone,
}: {
  uid: string;
  onDone: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const r = ref(storage, `avatars/${uid}`);
    await uploadBytes(r, file);
    const url = await getDownloadURL(r);
    onDone(url);
    setBusy(false);
  }
  return (
    <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
      <span className="rounded-xl border px-3 py-1.5 hover:bg-neutral-50">
        {busy ? "Yükleniyor…" : "Profil Fotoğrafı Yükle"}
      </span>
    </label>
  );
}
