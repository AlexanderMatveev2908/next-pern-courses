import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/features/layout/shells/Providers";
import Header from "@/features/layout/components/Header/Header";
import Footer from "@/features/layout/components/Footer/Footer";
import Sidebar from "@/features/layout/components/Sidebar/Sidebar";

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
        <Providers>
          <Header />
          <Sidebar />
          <div className="pad__app pt-[20px] sm:pt-30px pb-[100px] sm:pb-[150px] w-full h-full flex flex-col">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
