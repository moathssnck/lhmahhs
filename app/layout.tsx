import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "سمارت فود - توصيل اللحوم الطازجة",
  description: "توصيل اللحوم والدواجن الطازجة إلى باب منزلك",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
