import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header, Footer } from "@/components/layout";
import { BookingModal } from "@/components/reservation/BookingModal";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Maison & Co. | All-Day Brasserie & Bakery",
  description:
    "An Apple-grade modern all-day brasserie, wild-yeast artisan bakery, and natural cellar. Serving fresh viennoiserie, seasonal brunch, wood-fired hearth classics, and natural wines in Saint-Germain.",
  keywords: [
    "Maison & Co",
    "All-Day Brasserie",
    "Artisan Bakery",
    "Sourdough Bakery",
    "Wood-Fired Restaurant",
    "Specialty Coffee",
    "Natural Wine",
    "Brunch",
    "Saint-Germain",
  ],
  authors: [{ name: "Maison & Co. Culinary Group" }],
  openGraph: {
    title: "Maison & Co. | All-Day Brasserie & Bakery",
    description:
      "Wild-yeast viennoiserie, single-origin roastery, and wood-fired hearth dining. Open daily from 7:00 AM.",
    type: "website",
    locale: "en_US",
    siteName: "Maison & Co.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-full flex-col bg-[#FAFAF8] text-[#121316] font-sans antialiased selection:bg-[#F7EAE3] selection:text-[#B4461B]">
        <StoreProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BookingModal />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
