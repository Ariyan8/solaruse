import "./globals.css";

// ✅ حتماً این دو خط باشد
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body className="bg-[#FFF8EE] text-gray-800 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-6 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
