"use client";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ikonlar için

export default function Navbar() {
  const { user, loginGoogle, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50 dark:bg-neutral-900/70">
      <div className="container h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display lowercase text-3xl sm:text-4xl ">
          venüs eğitim
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/coaches" className="hover:text-brand-600">
            Eğitim Koçu Bul
          </Link>
          <Link href="/blog" className="hover:text-brand-600">
            Blog
          </Link>

          {/* Sağ taraf */}
          {!user ? (
            <div className="relative">
              <button
                onClick={() => setAuthOpen(!authOpen)}
                className="rounded-xl bg-brand-600 text-white px-3 py-1.5"
              >
                Giriş Yap
              </button>
              {authOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border bg-white shadow-md dark:bg-neutral-800">
                  <button
                    onClick={loginGoogle}
                    className="block w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    Google ile Giriş
                  </button>
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    Email ile Giriş
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="rounded-xl border px-3 py-1.5 hover:bg-neutral-50"
              >
                Profilim
              </Link>
              <button
                onClick={logout}
                className="rounded-xl border px-3 py-1.5 hover:bg-neutral-50"
              >
                Çıkış
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden border-t bg-white dark:bg-neutral-900">
          <div className="flex flex-col items-start p-4 space-y-3 text-sm">
            <Link
              href="/coaches"
              className="hover:text-brand-600"
              onClick={() => setOpen(false)}
            >
              eğitim koçu ara
            </Link>
            <Link
              href="/blog"
              className="hover:text-brand-600"
              onClick={() => setOpen(false)}
            >
              blog
            </Link>

            {!user ? (
              <>
                <button
                  onClick={() => {
                    loginGoogle();
                    setOpen(false);
                  }}
                  className="w-full rounded-xl bg-brand-600 text-white px-3 py-1.5"
                >
                  Google ile giriş
                </button>
                <Link
                  href="/login"
                  className="w-full rounded-xl border px-3 py-1.5 hover:bg-neutral-50"
                  onClick={() => setOpen(false)}
                >
                  Email ile giriş
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="w-full rounded-xl border px-3 py-1.5 hover:bg-neutral-50"
                  onClick={() => setOpen(false)}
                >
                  profilim
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full rounded-xl border px-3 py-1.5 hover:bg-neutral-50"
                >
                  çıkış
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
