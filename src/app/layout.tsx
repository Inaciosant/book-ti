import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";

export const metadata: Metadata = {
  title: "Book TI",
  description:
    "Um aplicativo para buscar livros utilizando a API Open Library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="pt-20 flex-grow">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
