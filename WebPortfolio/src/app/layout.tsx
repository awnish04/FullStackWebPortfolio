import Header from "@/components/Header";
import "./globals.css";
import { Playfair_Display, Mulish } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const mulish = Mulish({ subsets: ["latin"], weight: ["400", "700"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-secondary" suppressHydrationWarning>
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
