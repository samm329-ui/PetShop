import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { BookingProvider } from "@/context/BookingContext";

export const metadata: Metadata = {
  title: "Happy Pets | Premium Pet Marketplace",
  description: "Find your perfect furry, feathered, or scaly companion at Happy Pets. Browse dogs, cats, birds, and exotic pets with home delivery and visit booking.",
  keywords: "pets, dogs, cats, birds, exotic pets, pet shop, buy pets online, pet marketplace",
  openGraph: {
    title: "Happy Pets | Premium Pet Marketplace",
    description: "Your trusted destination for healthy, happy pets. Dogs, Cats, Birds & more with doorstep delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </CartProvider>
      </body>
    </html>
  );
}
