import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata = { title: "Venüs Koç | Eğitim Koçları Vitrini" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
