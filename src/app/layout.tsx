import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vida | Digital Agency",
  description: "High-Performance Web Development for Francophone Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#050505] text-[#fafafa] selection:bg-blue-500/30 flex flex-col min-h-screen">
        <Navbar />
        {/* The main content area grows to push the footer down */}
        <div className="grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}