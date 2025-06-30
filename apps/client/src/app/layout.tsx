import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";
import AppLayout from "@/features/layout/shells/AppLayout";

const fir_code = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next PERN courses",
  description: "Next PERN App for courses development",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fir_code.className} antialiased bg-neutral-950 min-h-screen min-w-screen`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
