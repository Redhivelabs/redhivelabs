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

const SITE_URL = "https://wolfofreddit.com";

export const viewport = {
  colorScheme: "dark",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wolf of Reddit — Find the Reddit Communities That Matter",
    template: "%s | Wolf of Reddit",
  },
  applicationName: "Wolf of Reddit",
  description:
    "Wolf of Reddit maps the subreddits where your buyers are already talking. Run a free Wolf Scan, get a full Reddit Intel Report, and unlock done-for-you Reddit posting and commenting.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon-180.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Wolf of Reddit",
    title: "Wolf of Reddit — Find. Engage. Influence.",
    description:
      "Wolf of Reddit maps the subreddits where your buyers are already talking. Run a free Wolf Scan, get a full Reddit Intel Report, and unlock done-for-you Reddit posting and commenting.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Wolf of Reddit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolf of Reddit — Find. Engage. Influence.",
    description:
      "Reddit marketing intelligence. Find the communities where your buyers are already talking.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wolf of Reddit",
  url: SITE_URL,
  logo: SITE_URL + "/brand/wolf-icon.png",
  description:
    "Wolf of Reddit helps businesses find the right subreddits to reach their buyers, with a free Wolf Scan, a paid Reddit Intel Report, and done-for-you Reddit placement packages.",
  sameAs: ["https://twitter.com/WolfofReddits"],
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
