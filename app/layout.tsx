import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/providers/ToastProvider";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: {
    default: "Vidyalaya",
    template: `%s | Vidyalaya`,
  },
  description:
    "Browse different free and paid courses and kickstart your tech career with Vidyalaya",
  keywords: [
    "Udemy",
    "Vidyalaya",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Shadcn UI",
  ],
  authors: [
    {
      name: "Trishan Wagle",
    },
  ],
  creator: "Trishan Wagle",
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
        <body className={dmSans.className}>
          <ToastProvider />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
