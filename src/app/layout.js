import "./globals.css";
import "../styles/global.css";
import ScrollToHash from "@/components/ScrollToHash";
import WhatsAppButton from "@/components/WhatsApp/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

export const metadata = {
  title: "Noorrix Motors | Quality Used Cars UK",
  description:
    "Noorrix Motors — quality used cars, vans, servicing, warranty and vehicle sourcing across the UK.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google Fonts — React 19 hoists these <link> tags into <head> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Great+Vibes&family=Lato:wght@300;400&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <ScrollToHash />
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
