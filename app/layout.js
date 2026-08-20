import { Archivo, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "RedHiveLabs — Reddit Marketing Intel",
  description:
    "Scan Reddit for the subreddits where your customers are already talking. Free scan, full Reddit Intel Report for $49, plus Reddit posting and commenting services.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon-180.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RedHiveLabs",
  url: "https://redhivelabs.com",
  description:
    "RedHiveLabs helps businesses find the right subreddits to reach their buyers, with a free Reddit scan, a paid Reddit Intel Report, and done-for-you Reddit posting and commenting services.",
  sameAs: ["https://twitter.com/Redhivelabs"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col overflow-x-hidden"
        style={{ fontFamily: "var(--font-source-serif), serif" }}
      >
        {children}
      </body>
    </html>
  );
}
