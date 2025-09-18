"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/profile"); // giriş sonrası profil sayfasına yönlendir
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email) {
      alert("Lütfen e-posta adresinizi yazın.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow dark:bg-neutral-900">
        <h1 className="mb-4 text-2xl font-semibold text-center">
          {isRegister ? "Kayıt Ol" : "Giriş Yap"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border px-3 py-2"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!isRegister} // kayıt değilse zorunlu
            className="w-full rounded-xl border px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-600 px-4 py-2 text-white"
          >
            {loading
              ? "İşlem yapılıyor..."
              : isRegister
              ? "Kayıt Ol"
              : "Giriş Yap"}
          </button>
        </form>

        {/* Şifre sıfırlama linki */}
        {!isRegister && (
          <p className="mt-3 text-center text-sm">
            Şifreni mi unuttun?{" "}
            <button
              onClick={handleResetPassword}
              className="text-brand-600 hover:underline"
            >
              Şifreyi sıfırla
            </button>
          </p>
        )}

        {/* Kayıt / giriş geçişi */}
        <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
          {isRegister ? "Zaten hesabın var mı?" : "Hesabın yok mu?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-brand-600 hover:underline"
          >
            {isRegister ? "Giriş yap" : "Kayıt ol"}
          </button>
        </p>
      </div>
    </div>
  );
}
