import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vidyalaya : Your Digital School",
  description: "Browse different courses and learn more about the tech.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={dmSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
